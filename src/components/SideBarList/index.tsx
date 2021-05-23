import React from 'react';
import './style.scss'

export type SideBarListItem = {
    title: string,
    count?: number,
    icon?: string,
    users?: string[]
};

interface SideBarListProps {
    list: SideBarListItem[],
    title: string
}

function SideBarList({ list, title }: SideBarListProps) {
    return (
        <div className="SideBarList">
            <h2 className="SideBarList__title">{ title }</h2>
            { list.map((item) =>
                <div className="SideBarList__item" key={item.title}>
                    { item?.icon && <img src={item.icon} className="SideBarList__icon" alt={item.title} /> }
                    { item.title} {item?.count && <span className="SideBarList__number">{item.count}</span>}
                    { item?.users && <div className="SideBarList__teams">{item.users.map(item => <img key={item} src={item} className="SideBarList__teamsImg" alt={item} />)}</div>}
                </div>) }
        </div>
    );
}

export { SideBarList };
