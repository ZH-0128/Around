import React from 'react';
// import {Register} from './Register.js';
import {Login} from './Login.js';
import '../styles/Main.css';

export class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Login />
            </div>
        );
    }
}