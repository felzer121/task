import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from "../store/auth";
import {ProfilePage} from "../pages/ProfilePage";
import {TeamsPage} from "../pages/TeamsPage";
import {Dashboard} from "../pages/Dashboard";
import {Page} from "../components/Page";
import {ProfileSettings} from "../components/ProfileSettings";
import {Auth} from "../pages/Auth";
import {Register} from "../pages/Register";
import {PrivateRoute} from "../components/PrivateRoute";
import {Project} from "../components/Project";

export const RouterManeger = () => {
    const { currentUser }:any = useAuth()


    console.log(currentUser)
    return (
        <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route path='/register' element={<Register/>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} >
                <Route path="/profile/settings" element={
                    <Page title="home">
                        <ProfileSettings/>
                    </Page>} />
                <Route path="/profile/notifications" element={
                    <Page title="home">
                        notifications
                    </Page>} />
            </Route>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                <Route path='/dashboard/:id' element={<Project />}/>
            </Route>
            {/*<Route path="/teams" element={TeamsPage} />*/}
        </Routes>
    );
};