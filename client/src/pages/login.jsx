import { Stack, Input, Button, Heading, InputGroup, InputRightElement, Center, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const Login = ({onLogin}) => {
    const [show, setShow] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsValid(validateEmail(event.target.value));
    };

    const validateEmail = (email) => {
        // Regular expression for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000" + "/auth", {
                email: email,
                password: password
            });
            // Check if login was successful
            if (response.status == 200) {
                // Perform actions for successful login
                console.log('Login successful!');
                const userData = response.data;
                onLogin(userData);
            } else {
                // Handle login failure
                console.log('Login failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Center h="100vh">
            <Stack spacing={4} w={320}>
            <Heading>Overflowing Stack</Heading>
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