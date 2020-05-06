import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import { AuthContext } from "./context/auth";
import Authorisation from "./pages/Authorisation";
import Registration from './pages/Registration';

function App(props) {
    const [authTokens, setAuthTokens] = useState();

    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home Page</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">DashBoard Page</Link>
                        </li>
                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Authorisation} />
                    <Route path="/signup" component={Registration} />
                    <PrivateRoute path="/dashboard" component={DashBoard} />
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;