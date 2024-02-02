import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, HStack, VStack, Badge, Textarea, Text, useToast } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ViewQuestion = () => {
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const [yourAnswer, setYourAnswer] = useState("");
    const user = JSON.parse(localStorage.getItem("userData"))[0];
    const { id } = useParams();
    const toast = useToast();

    useEffect(() => {
        const getQuestion = async() => {
            try{
                const response = await axios.get("http://localhost:5000" + "/questions/" + id);
                if(response.status == 200){
                    setQuestion(response.data);
                } else {
                    console.log("Question not fetched");
                }
            } catch (err) {
                console.log(err);
            }
        }
        const getAnswers = async() => {
            try{
                const response = await axios.get("http://localhost:5000" + "/answers/" + id);
                if(response.status == 200){
                    setAnswers(response.data);
                } else {
                    console.log("Answers not fetched");
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        getQuestion();
        getAnswers();
    }, [])

    const upVote = async(obj, type) => {
        try{
            const response = await axios.put("http://localhost:5000" + `/${type}/` + obj._id, {upVotes: user._id});
            if(response.status == 200){
                console.log("Upvoted");
                if(type === "questions")
                    setQuestion({...question, upVotes: [...question.upVotes, user._id] });
                else{
                    setAnswers(prevAnswers => {
                        return prevAnswers.map(ans => {
                            if (ans._id === obj._id) {
                            return { ...ans, upVotes: [...ans.upVotes, user._id]} }
                            return ans;
                        });
                    });
                }
                    
            } else {
                console.log("Not upvoted");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const downVote = async(obj, type) => {
        try{
            const response = await axios.put("http://localhost:5000" + `/${type}/` + obj._id, {downVotes: user._id});
            if(response.status == 200){
                console.log("Downvoted");
                if(type === "questions")
                    setQuestion({...question, downVotes: [...question.downVotes, user._id]});
                else{
                    setAnswers(prevAnswers => {
                        return prevAnswers.map(ans => {
                            if (ans._id === obj._id) {
                            return { ...ans, downVotes: [...ans.downVotes, user._id] };
                            }
                            return ans;
                        });
                    });
                }
            } else {
                console.log("Not downvoted");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const submitAnswer = async() =>{
        try{
            const body = {
                content: yourAnswer,
                author: user,
                question: id,
                upvotes: [],
                downVotes: []
            }
            const response = await axios.post("http://localhost:5000" + "/answers", body);
            if(response.status == 201){
                toast({
                    title: 'Answer posted successfully!',
                    status: 'success',
                    duration: 2000,
                    position:'top-right',
                    isClosable: true,
                });
                setAnswers([...answers, body])
            } else {
                console.log("Answer not posted");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"flex-start", padding:"3rem"}}>
            <h2>{question.title}</h2>
            <hr style={{border:"1px solid lightgray", width:"80%", margin:"1rem 0 1rem 0"}}/>
            <div style={{display:"flex", justifyContent:"space-between", width:"80%"}}>
                <VStack>
                    <Button background={"transparent"} border={"1px solid black"} borderRadius={"50%"} p={1} _hover={{background:"green", color:"white", border:0}} onClick={() => upVote(question, "questions")}><FaArrowUp/></Button>
                    <text style={{fontSize:"2rem"}}><b>{question.upVotes && question.downVotes && question.upVotes.length - question.downVotes.length}</b></text>
                    <Button background={"transparent"} border={"1px solid black"} borderRadius={"50%"} p={1} _hover={{background:"red", color:"white", border:0}} onClick={() => downVote(question, "questions")}><FaArrowDown/></Button>
                </VStack>
                <p style={{width:"100%", paddingLeft:"2rem"}}>{question.content}</p>
            </div>
            <HStack mt={4}>
                {
                    question.tags && question.tags.map(tag =>{
                        return (
                            <Badge p={1} mr={2} size="sm" colorScheme="purple">{tag}</Badge>
                        )
                    })
                }
            </HStack>
            <hr style={{border:"1px dashed lightgray", width:"80%", margin:"1rem 0 1rem 0"}}/>
            <text style={{fontSize:"1.5rem"}}><b>{answers.length} answers</b></text>
            {
                answers.map(ans => {
                    return (
                        <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", width:"80%", marginTop:"20px"}}>
                            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                                <VStack>
                                    <Button background={"transparent"} border={"1px solid black"} borderRadius={"50%"} p={1} _hover={{background:"green", color:"white", border:0}} onClick={() => upVote(ans, "answers")}><FaArrowUp/></Button>
                                    <text style={{fontSize:"2rem"}}><b>{ans.upVotes && ans.downVotes? ans.upVotes.length - ans.downVotes.length:0}</b></text>
                                    <Button background={"transparent"} border={"1px solid black"} borderRadius={"50%"} p={1} _hover={{background:"red", color:"white", border:0}} onClick={() => downVote(ans, "answers")}><FaArrowDown/></Button>
                                </VStack>
                                <p style={{width:"100%", paddingLeft:"2rem"}}>{ans.content}</p>
                            </div>
                            <HStack mt={4}>
                                <text style={{fontSize:"1rem"}}>Answered by: <b>{ans.author.username}</b></text>
                            </HStack>
                        </div>
                    )
                })
            }
            <hr style={{border:"1px solid lightgray", width:"80%", margin:"1rem 0 1rem 0"}}/>
            <Text>Your answer</Text>
            <Textarea mt={2} w={"80%"} onChange={(e) => setYourAnswer(e.target.value)}></Textarea>
            <Button mt={2} onClick={() => submitAnswer()}>Post Answer</Button>
        </div>
    );
}

export default ViewQuestion;