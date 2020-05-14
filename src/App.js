import React, {Component} from 'react';
import './styles/App.css';
import Register from "./components/Register";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import "./styles/App.css"
import {BoardsPage} from "./components/board/Boards";
import {CreateBoardPage} from "./components/board/CreateBoardPage";

const withAuth = (Component, auth) => {
    return (props) => {
        return <Component {...props} auth={auth}/>
    };
};

class App extends React.Component {


    constructor(props) {
        super(props);

        const tokens = localStorage.getItem('AUTH');

        this.state = {
            tokens: tokens || null
        };
    }

    auth = (tokens) => {
        this.setState({tokens: tokens})
    }

    render() {
        const {tokens} = this.state;
        return (
            <div className="App">
                <div className="Main">
                    {!tokens && <h2>Mini Jira</h2>}
                    <Router>
                        {!tokens && <Switch>
                            <Route path="/login" component={withAuth(Login, this.auth)}>
                            </Route>
                            <Route path="/register" component={withAuth(Register, this.auth)}>
                            </Route>
                            <Redirect to="/login"/>
                        </Switch>}
                        {!!tokens && <Switch>
                            {/*<Route exact path="/" component={DashBoard}/>*/}
                            <Route path="/boards" component={withAuth(BoardsPage, this.auth)}/>
                            <Route path="/create-board" component={CreateBoardPage}/>
                            <Redirect to="/boards"/>
                        </Switch>}
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;
