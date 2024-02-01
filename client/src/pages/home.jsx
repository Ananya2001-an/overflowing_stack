import React from "react";
import Sidebar from "../components/sidebar";
import { HStack } from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom";
import Profile from "./profile";
import Questions from "./questions";
import AskQuestion from "./askQuestion";
import ViewQuestion from "./viewQuestion";

const Home = ({onLogout}) => {
    return (
    <HStack minW={"100vw"}>
        <Sidebar onLogout={onLogout}/>
        <div className="content" style={{ flex: 1, width: '100%', height:'100vh' }}>
            <Routes>
            <Route path="*" element={<Questions />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/ask" element={<AskQuestion />} />
            <Route path="/question/:id" element={<ViewQuestion />} />
          </Routes>
        </div>
    </HStack>
    );
}

export default Home;