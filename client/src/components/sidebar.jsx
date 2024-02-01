import { Button, VStack, Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({onLogout}) => {
  return (
    <VStack spacing={4} h={"100vh"} alignItems="flex-start" borderRight="1px solid #ccc" p={10}>
      <Heading mb={10}>Overflowing <br/>Stack</Heading>
      <Link to="*" p={2} _hover={{ bg: "gray.200", borderRadius: "md" }}>
          Questions
      </Link>
      <Link to="/tags" p={2} _hover={{ bg: "gray.200", borderRadius: "md" }}>
          Tags
      </Link>
      <Link to="/profile" p={2} _hover={{ bg: "gray.200", borderRadius: "md" }}>
          Profile
      </Link>
      <Button onClick={() => onLogout()}>Logout</Button>
  </VStack>
  );
}

export default Sidebar;
