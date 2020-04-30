import React from "react";
import './App.css';

import TypoGraphy from '@material-ui/core/Typography'

import {Login} from "./Components/Login/Login";
import {Register} from "./Components/Register/Register";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";


function App() {
    const auth = localStorage.getItem('AUTH');

    return (
        <div className='app-wrapper'>


            <div className='app-wrapper-content'>



            <Router>
                {!auth && <Switch>
                    {/*<Route path="/login" component={Login}/>*/}
                    <Route path='/login'
                           render={() => <Login padding='5' margin='1'/>}
                    />
                    <Route path="/dashboards" component={Dashboard}/>

                    <Redirect to="/login"/>
                </Switch>}
                {!!auth && <Switch>
                    <Route path="/register" component={Register}/>
                    <Route exact path="/" component={Login}/>
                    <Redirect to="/"/>
                </Switch>}
            </Router>

            </div>

            <Footer/>
            <Header/>
        </div>
    );
}

export default App;
