import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from "../store/auth";
import {ProfilePage} from "../pages/ProfilePage";
import {TeamsPage} from "../pages/TeamsPage";
import {Dashboard} from "../pages/Dashboard";

export const RouterManeger = () => {
    const { currentUser }:any = useAuth()


    console.log(currentUser)
    return (
        <Routes>
            <Route path="/" element={ProfilePage} />
            {/*<Route path="/dashboard" element={Dashboard} />*/}
            {/*<Route path="/teams" element={TeamsPage} />*/}
        </Routes>
    );
};