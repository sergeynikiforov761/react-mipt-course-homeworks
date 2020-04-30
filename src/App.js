import React from "react";
import './App.css';

import {Login} from "./Components/Login/Login";
import {Register} from "./Components/Register/Register";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";


function App() {

    const auth = "";
    return (


        <Router>

            <div className='app-wrapper'>


                    <Header />


                    {!auth && <Switch>
                        <Route path='/login'
                               render={() => <Login padding='5' margin='1'/>}/>
                        <Route path="/register" component={Register}/>

                        <Redirect to="/login"/>
                    </Switch>}

                    {!!auth && <Switch>

                        <Route path="/" component={Dashboard}/>
                        <Redirect to="/"/>

                    </Switch>}


                    <Footer/>

            </div>
        </Router>


    );
}

export default App;
