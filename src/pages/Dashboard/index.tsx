import React from "react";
import { Route, Routes } from "react-router-dom";
import { SideBar } from "../../components/SideBar";
import { Project } from "../../components/Project";



export const Dashboard = () => {
  return (
    <div className='App'>
      <SideBar />
      <div className='App__page'>
        <Routes>
            <Route path='/dashboard/:id'>
                <Project />
            </Route>
        </Routes>
      </div>
    </div>
  );
};