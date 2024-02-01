import { Button, Container, Heading, InputGroup, Input, VStack, Textarea, Text, Badge, InputRightElement, HStack } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AskQuestion = () => {
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tagName, setTagName] = useState('');
    const user = JSON.parse(localStorage.getItem('userData'))[0]._id;
    console.log(user);
    const navigate = useNavigate();

    const handleSubmit = async() => {
        const body = {
            "title": title,
            "author": user,
            "content": description,
            "tags": tags
        }
        try{
            const response = await axios.post("http://localhost:5000" + "/questions", body);
            if(response.status == 201){
                console.log("Question added successfully");
                navigate("*");
            } else {
                console.log("Question not added");
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div style={{height:"100%", display:"flex", flexDirection:"column", alignItems:"flex-start", padding:"2rem"}}>
            <h2 style={{marginBottom:"2rem"}}>Ask a Question</h2>
            <VStack w={"80%"}>
                <Input onChange={(e) => setTitle(e.target.value)} variant='outline' placeholder='Title'/>
                <Textarea onChange={(e) => setDescription(e.target.value)} minH={"30vh"} placeholder='Description...' />
                <Text alignSelf={"self-start"}>Add tags: </Text>
                <InputGroup>
                <Input onChange={(e) => setTagName(e.target.value)} variant='outline' placeholder='Write tag name and click "Add" to create tag. Like Java, Python...'/>
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setTags([...tags, tagName])}>
                    Add
                    </Button>
                </InputRightElement>
                </InputGroup>
                <HStack alignSelf={"self-start"} mb={20}>
                {
                    tags.map((tag, index) => (
                        <Badge key={index} size={"xs"}>{tag}</Badge>
                    ))
                }
                </HStack>
                <Button onClick={() => handleSubmit()}>Submit</Button>
            </VStack>
        </div>
    );
}

export default AskQuestion;