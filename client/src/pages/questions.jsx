import { Button, Badge, Card, Heading, CardBody, CardHeader, Box, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Questions = () => {
    const navigate =  useNavigate();
    const [questions, setQuestions] = useState([]);
    const questionsPerPage = 3;

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        const getQuestions = async() => {
            try{
                const response = await axios.get("http://localhost:5000" + "/questions");
                if(response.status == 200){
                    setQuestions(response.data);
                } else {
                    console.log("Questions not fetched");
                }
            } catch (err) {
                console.log(err);
            }
        }
        getQuestions();
    }, [])

    return (
        <div style={{height:"100%", display:"flex", flexDirection:"column", alignItems:"flex-start", padding:"2rem"}}>
            <Button ml="auto" p={2} onClick={() => navigate("/ask")}>Ask a question</Button>
            <Box w={"80%"} >
            {
                currentQuestions.map(q => {
                    return (
                        <Card mb={2} boxShadow="md"
                        transition="box-shadow 0.2s, border-color 0.2s"
                        _hover={{
                            boxShadow: "xl",
                            border:"1px solid",
                            borderColor: "black.500",
                        }}
                        cursor='pointer'
                        onClick={() => navigate("/question/" + q._id)}
                        >
                        <CardHeader>
                            <HStack justifyContent={"space-between"}>
                            <small><b>{q.upVotes.length - q.downVotes.length}</b> votes</small>
                            <small>asked by <b>{q.author.username}</b></small>
                            </HStack>
                        </CardHeader>
                        <CardBody>
                        <Heading size='sm'>{q.title}</Heading>
                        <text>{q.content.substring(0,100)}...</text>
                        <HStack mt={2}>
                        {
                            q.tags.map(tag => {
                                return (
                                    <Badge p={1} mr={2} size="sm" colorScheme="purple">{tag}</Badge>
                                )
                            })
                        }
                        </HStack>
                        </CardBody>
                        </Card>
                    )
                
                })
            }
            <Box mt="4">
                <Button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                mr="2"
                >
                Previous
                </Button>
                <Button 
                onClick={nextPage} 
                disabled={indexOfLastQuestion >= questions.length}
                >
                Next
                </Button>
            </Box>
        </Box>
        </div>
    );
}

export default Questions;