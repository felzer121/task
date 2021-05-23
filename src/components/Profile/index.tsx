import React from 'react';
import './style.scss'

import more from './More.svg'

interface ProfileProps {
    avatarUrl: string,
    fullName: string,
    position: string
}

function Profile({ avatarUrl, fullName, position }: ProfileProps) {
    return (
        <div className="profile">
            <div className="profile__container">
                <img src={ avatarUrl } className="profile__avatarUrl" alt=""/>
                <div>
                    <h3 className="profile__fullName">{ fullName }</h3>
                    <span className="profile__position">{ position }</span>
                </div>
            </div>
            <img src={ more } alt="" />
        </div>
    );
}

export { Profile };