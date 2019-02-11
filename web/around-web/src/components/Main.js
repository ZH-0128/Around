import React from 'react';
// import {Register} from './Register.js';
import {Login} from './Login.js';
import '../styles/Main.css';
import { Switch, Route } from 'react-router-dom';
import {Register} from "./Register";
import {Home} from "./home";

export class Main extends React.Component {

    getLogin = () => {
        return this.props.isLoggedIn ? <Home/> : <Login handleSuccessfulLogin={this.props.handleSuccessfulLogin}/>;
    };

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/home" component={Home}/>
                    <Route component={Login}/>
                </Switch>
            </div>
        );
    }
}