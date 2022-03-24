import React from 'react';
import {Header} from "../../components/Header";
import {MenuItemType} from "../../components/Menu/types";
import {SideBar} from "../../components/SideBar";
import {Route, Switch} from "react-router-dom";
import {Page} from "../../components/Page";
import {ProfileSettings} from "../../components/ProfileSettings";
import './style.scss'

const PROFILE_MENU: MenuItemType[] = [
  { title: 'Profile', url: '/profile/settings' },
  { title: 'Notifications', url: '/profile/notifications' },
  { title: 'Account', url: '/profile/account' },
  { title: 'Apps', url: '/profile/apps' }
]

export const ProfilePage = () => {
  return (
    <div className='App'>
      <SideBar />
      <div className='App__page profile-page'>
        <Header projectName={'ProfilePage Settings'} type={'profile'} menu={PROFILE_MENU} id={'0'}/>
        <Switch>
          <Route exact path="/profile/settings">
            <Page title="home">
              <ProfileSettings />
            </Page>
          </Route>
          <Route exact path="/profile/notifications">
            <Page title="home">
              notifications
            </Page>
          </Route>
        </Switch>
      </div>
    </div>
  );
};
