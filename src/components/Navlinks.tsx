import React from 'react';
import { Link } from 'react-router-dom';
import { LGText } from '../styles/styles';
interface InavLink {
    to: string;
    name: string;
}

export const Navlinks: React.FC<InavLink> =({to, name})=> {
    return (
        <Link to={to}>
            <LGText >
            {name}

            </LGText>
        </Link >
    );
}
