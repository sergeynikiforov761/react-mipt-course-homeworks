import React from "react";
import './App.css';


import {BrowserRouter as Router, Route, Switch, Redirect, withRouter} from "react-router-dom";


import Footer from "./Components/Footer/Footer";
import RegisterContainer from "./Components/Register/RegisterContainer";
import LoginContainer from "./Components/Login/LoginContainer";
import store from "./redux/redux-store";
import DashboardContainer from "./Components/Dashboard/DashboardContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {connect} from "react-redux";
import {getAuthUserData} from "./redux/auth-reducer";
import {compose} from "redux";



class App extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            isAuth: store.getState().auth.isAuth || null
        }
    }



    render() {
        const {isAuth} = this.state;
        return (

            <Router>

                <div className='app-wrapper'>

                    <HeaderContainer/>

                    {!isAuth && <Switch>
                        <Route path='/login' component={LoginContainer}/>
                        <Route path="/register" component={RegisterContainer}/>
                        <Route path="/dashboard/:boardId?" component={DashboardContainer}/>
                        <Redirect to="/login"/>
                    </Switch>}

                    {!!isAuth && <Switch>



                    </Switch>}


                    <Footer/>

                </div>
            </Router>
        )

    }
}

export default compose(
    withRouter,
    connect(null, getAuthUserData()))(App);
