import { Stack, Input, Button, Heading, InputGroup, InputRightElement, Center, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { FaStackOverflow } from "react-icons/fa"

const Login = ({onLogin}) => {
    const [show, setShow] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const toast = useToast();
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

    const handleLogin = async () => {
        try {
            const response = await axios.post(localServer + "/auth", {
                email: email,
                password: password
            });
            if (response.status == 200) {
                const userData = response.data;
                onLogin(userData);
                toast({
                    title: 'Login successful!',
                    status: 'success',
                    duration: 2000,
                    position:'top-right',
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: 'Login failed! Check input.',
                status: 'error',
                duration: 2000,
                position:'top-right',
                isClosable: true,
            });
            console.error('Error:', error);
        }
    };

    return (
        <Center h="100vh" w={"100vw"}>
            <Stack alignItems={"center"} spacing={4} minW={320}>
            <Heading display={"flex"} alignItems={"center"}><span>Overflowing Stack</span><FaStackOverflow style={{marginLeft:"1rem"}}/></Heading>
            <Stack spacing={3} alignItems={"center"}>
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
                <Button w={"fit-content"} onClick={() => handleLogin()}>Login</Button>
                <Text>New user? <a href="/signup">Signup</a></Text>
            </Stack>
            </Stack>
        </Center>
    );
}

export default Login;