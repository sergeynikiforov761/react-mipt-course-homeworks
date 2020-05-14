import React from "react";
import {Button, TextField} from "@material-ui/core";
import {Route} from "react-router-dom";
import "../styles/Action.css"
import {login} from "../service/login";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            password: ''
        };
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onClick = () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        login(data).then(
            result => {
                localStorage.setItem('AUTH', JSON.stringify(result));
                this.props.auth(result);
            }).catch(err => {
            console.log(err);
        });
    };

    loginButtonDisable = () => {
        return this.disabledEmail()
            || this.disabledPassword();

    }

    disabledEmail = () => {
        return !this.state.emailPattern.test(this.state.email);
    }

    disabledPassword = () => {
        return this.state.password.length === 0;
    }

    render() {
        return <div>
            <div>
                <div>
                    <TextField error={this.disabledEmail()}
                               helperText={this.disabledEmail() ? "Некорректный формат почты" : ""}
                               name="email" label="Почта" variant="filled" value={this.state.email}
                               onChange={this.onChange}/>
                </div>
            </div>
            <div>
                <TextField error={this.disabledPassword()}
                           helperText={this.disabledPassword()? "Пароль не может быть пустым" : ""}
                           name="password" label="Пароль" variant="filled" value={this.state.password}
                           type="password"
                           onChange={this.onChange}/>
            </div>
            <div>
                <Button className="LoginButton" onClick={this.onClick} variant="contained" color="primary"
                        disabled={this.loginButtonDisable()}>Sign in</Button>
                <Route render={({history}) => (
                    <Button className="SignUpButton" onClick={() => {
                        history.push('/register')
                    }} variant="outlined" color="primary">
                        Sign up
                    </Button>
                )}/>
            </div>
        </div>
    }
}

export default Login;