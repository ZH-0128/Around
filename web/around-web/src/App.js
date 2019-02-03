import React, {Component} from 'react';
import {TopBar} from './components/TopBar.js';
import {Main} from './components/Main.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopBar/>
                <Main />
            </div>
        );
    }
}

export default App;
