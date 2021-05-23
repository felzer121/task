import React from 'react';
import './style.scss'
interface PageProps {
    children: React.ReactChildren | React.ReactChildren[] | Element | React.ReactNode,
    title: string
}

const Page = ({children, title}: PageProps) => {
    document.title = title;
    return (
        <div className="Page">
            { children }
        </div>
    );
};

export {Page};