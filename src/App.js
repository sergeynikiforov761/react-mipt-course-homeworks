import React from "react";
import './App.css';


import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import RegisterContainer from "./Components/Register/RegisterContainer";
import LoginContainer from "./Components/Login/LoginContainer";
import store from "./redux/redux-store";



class App extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            tokens: store.getState().auth.isAuth || null
        }
    }



    render() {
        const {tokens} = false//store.getState().isAuth;
        return (

            <Router>

                <div className='app-wrapper'>

                    <Header/>

                    {!tokens && <Switch>
                        <Route path='/login' component={LoginContainer}/>
                        <Route path="/register" component={RegisterContainer}/>
                        <Redirect to="/login"/>
                    </Switch>}

                    {!!tokens && <Switch>

                        <Route path="/" component={Dashboard}/>
                        <Redirect to="/"/>

                    </Switch>}


                    <Footer/>

                </div>
            </Router>
        )

    }
}

export default App;
