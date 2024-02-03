import React, { useState } from "react";
import { Center, Stack, Heading, Input, InputGroup, InputRightElement, Button, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStackOverflow } from "react-icons/fa"

const Signup = () => {
    const [show, setShow] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const azureServerlessFunction = "https://overflowing-stack.azurewebsites.net/api";
    const azureServerlessFunctionLocal = "http://localhost:7071/api";
    const localServer = "http://localhost:5000";

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsValid(validateEmail(event.target.value));
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSignup = async() =>{
        try{
            const response = await axios.post(localServer + "/users", { username, email, password });
            if(response.status === 201 || response.status === 204){
                toast({
                    title: 'User created!',
                    status: 'success',
                    duration: 2000,
                    position:'top-right',
                    isClosable: true,
                });
                navigate("/login");
            }else{
                throw new Error("Something went wrong!");
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
    <Center h="100vh" w={"100vw"}>
            <Stack alignItems={"center"} spacing={4} minW={320}>
            <Heading display={"flex"} alignItems={"center"}><span>Overflowing Stack</span><FaStackOverflow style={{marginLeft:"1rem"}}/></Heading>
            <Stack spacing={3} alignItems={"center"}>
                <Input 
                    placeholder='Enter username' 
                    size='md' 
                    onChange={(e) => setUsername(e.target.value)}
                    isRequired={true} />
                <Input 
                    placeholder='Enter email' 
                    size='md' 
                    type="email" 
                    value={email}
                    onChange={handleEmailChange}
                    isRequired={true} 
                    isInvalid={email !== '' && !isValid}/>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        maxLength={8}
                        isRequired={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button w={"fit-content"} onClick={() => handleSignup()}>Signup</Button>
                <Text>Existing user? <a href="/login">Login</a></Text>
            </Stack>
            </Stack>
        </Center>
    );
}

export default Signup;