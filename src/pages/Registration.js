import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../img/logo.jpg";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Registration(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [email, setEmail] = useState("");
    const { setAuthTokens } = useAuth();
    const referer =  '/';

    function postRegistration() {
            if (password !== checkPassword) {
                alert("Passwords don't match");
            } else {
                axios.post("auth/registration", {
                    userName,
                    email,
                    password
                }).then(result => {
                    if (result.status === 200) {
                        setAuthTokens(result.data);
                        setLoggedIn(true);
                    } else {
                        setIsError(true);
                    }
                }).catch(e => {
                    setIsError(true);
                });
            }
    }

    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }

    return (
        <Card>
            <Logo src={logoImg} />
            <Form>
                <Input
                    type="username"
                    value={userName}
                    onChange={e => {
                        setUserName(e.target.value);
                    }}
                    placeholder="username"
                />
                <Input
                    type="email"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    placeholder="email"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                />
                <Input
                    type="password"
                    value={checkPassword}
                    onChange={e => {
                        setCheckPassword(e.target.value);
                    }}
                    placeholder="password again"
                />
                <Button onClick={postRegistration}>Sign Up</Button>
            </Form>
            <Link to="/login">Already have an account?</Link>
            { isError &&<Error>Incorrect data entered</Error> }
        </Card>
    );
}

export default Registration;