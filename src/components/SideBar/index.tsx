import React from 'react';
import projectIcon1 from './Icon1.svg';
import projectIcon2 from './Icon2.svg';
import projectIcon3 from './Icon3.svg';
import projectIcon4 from './Icon4.svg';
import logo from './Logo.svg'
import userIcon from './Userpic.png'
import teamImg1 from './team1.png';
import teamImg2 from './team2.png';
import teamImg3 from './team3.png';
import teamImg4 from './team4.png';
import teamImg5 from './team5.png';
import teamImg6 from './team6.png';
import teamImg7 from './team7.png';
import teamImg8 from './team8.png';
import search from './Search.svg'
import './style.scss'
import { SideBarList, SideBarListItem } from "../SideBarList";
import { Profile } from "../Profile";

const menuList: SideBarListItem[] = [{title: "Home"}, {title: "My TasksPage"}, {title: "Notifications", count: 3}];

const projectList: SideBarListItem[] = [
    { icon: projectIcon1, title: "Dashboard UI Kit" },
    { icon: projectIcon2, title: "CRM System" },
    { icon: projectIcon3, title: "Website Redesign" },
    { icon: projectIcon4, title: "Communication Tool" }
];

const projectTeams: SideBarListItem[] = [
    { title: "Designers", users: [teamImg1, teamImg2, teamImg3] },
    { title: "Backend", users: [teamImg4, teamImg5] },
    { title: "Frontend", users: [teamImg6, teamImg7, teamImg8] }
];

function SideBar() {
    return (
        <div className="SideBar">
            <div className="SideBar__logo">
                <a href="#" className="SideBar__logoLink">
                    <img src={logo} alt=""/>
                    <span className="SideBar__logoHeader">PROJECTUS</span>
                </a>
                <img src={search} alt=""/>
            </div>
            <Profile avatarUrl={ userIcon } fullName="Emilee Simchenko" position="Product Owner" />
            <SideBarList list={menuList} title={"Menu"} />
            <SideBarList list={projectList} title={"Projects"} />
            <SideBarList list={projectTeams} title={"Teams"} />
        </div>
    );
}

export { SideBar };