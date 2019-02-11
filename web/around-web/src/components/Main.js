import React from 'react';
import {Login} from './Login.js';
import '../styles/Main.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Register} from "./Register";
import {Home} from "./home";

export class Main extends React.Component {

    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home"/> :
            <Login handleSuccessfulLogin={this.props.handleSuccessfulLogin}/>;
    };

    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/>;
    };

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" component={this.getLogin}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/home" render={this.getHome}/>
                    <Route component={this.getLogin}/>
                </Switch>
            </div>
        );
    }
}