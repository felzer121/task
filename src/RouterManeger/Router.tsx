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
import {TasksPage} from "../pages/TasksPage";
import {KanbanPage} from "../pages/KanbanPage";
import {CalendarPage} from "../pages/CalendarPage";
import {FilesPage} from "../pages/FilesPage";
import {TeamsList} from "../components/TeamsList";
import {Home} from "../pages/Home";

export const RouterManeger = () => {
  return (
    <Routes>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}>
        <Route path="/profile/settings" element={
          <Page title="home">
            <ProfileSettings/>
          </Page>}/>
        <Route path="/profile/notifications" element={
          <Page title="home">
            notifications
          </Page>}/>
      </Route>
      <Route path="/dashboard/:id/" element={<PrivateRoute><Dashboard/></PrivateRoute>}>
        <Route index element={<Page title="home">
          <TasksPage/>
        </Page>}/>
        <Route path="kanban" element={<Page title="tasks">
          <KanbanPage/>
        </Page>}/>
        <Route path="calendar/" element={<Page title="tasks">{<CalendarPage/>}</Page>}/>
        <Route path="files/" element={<Page title="tasks">{<FilesPage/>}</Page>}/>
        <Route
          path=":id"
          element={<Navigate to="task-page" replace />}
        />
      </Route>
      <Route path="/teams" element={<PrivateRoute><TeamsPage/></PrivateRoute>}>
        <Route path=":id" element={<TeamsList />}/>
      </Route>
      <Route
        path="*"
        element={<Navigate to="/auth" replace />}
      />
    </Routes>
  );
};