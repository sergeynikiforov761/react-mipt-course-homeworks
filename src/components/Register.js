import React from "react";
import {Button, TextField} from '@material-ui/core';
import {Route} from "react-router-dom"
import "../styles/Action.css"
import {register} from "../service/register.js"

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            errorLoginText: '',
            email: '',
            emailPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            password: '',
            repeatPassword: ''
        };
    }

    onChange = (event) => {
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onClick = () => {
        let data = {
            name: this.state.login,
            email: this.state.email,
            password: this.state.password
        }
        register(data).then(
            result => {
                localStorage.setItem('AUTH', JSON.stringify(result));
                this.props.auth(result);
            }).catch(err => {
            console.log(err);
        });
    };

    registerButtonDisable = () => {
        return this.disabledEmail()
            || this.disabledLogin()
            || this.disabledPassword()
            || this.disabledRepeatPassword();

    }

    disabledLogin = () => {
        return this.state.login.length === 0;
    }

    disabledPassword = () => {
        return this.state.password.length === 0
            || this.state.repeatPassword !== this.state.password;
    }

    errorPasswordText = () => {
        if (this.state.password.length === 0) {
            return "Пароль не может быть пустым"
        } else {
            if (this.state.repeatPassword !== this.state.password) {
                return "Пароли не совпадают"
            }
            return ""
        }
    }

    disabledRepeatPassword = () => {
        return this.state.repeatPassword.length === 0
            || this.state.repeatPassword !== this.state.password;
    }

    errorRepeatPasswordText = () => {
        if (this.state.repeatPassword.length === 0) {
            return "Пароль не может быть пустым"
        } else {
            if (this.state.repeatPassword !== this.state.password) {
                return "Пароли не совпадают"
            }
            return ""
        }
    }

    disabledEmail = () => {
        return !this.state.emailPattern.test(this.state.email);
    }

    render() {
        return <div>
            <div>
                <TextField error={this.disabledLogin()}
                           helperText={this.disabledLogin() ? "Логин не может быть пустым" : ""}
                           name="login" label="Логин" variant="filled" value={this.state.login}
                           onChange={this.onChange}/>
            </div>
            <div>
                <TextField error={this.disabledEmail()}
                           helperText={this.disabledEmail() ? "Некорректный формат почты" : ""}
                           name="email" label="Почта" variant="filled" value={this.state.email}
                           onChange={this.onChange}/>
            </div>
            <div>
                <TextField error={this.disabledPassword()}
                           helperText={this.errorPasswordText()}
                           name="password" label="Пароль" variant="filled" value={this.state.password}
                           type="password"
                           onChange={this.onChange}/>
            </div>
            <div>
                <TextField error={this.disabledRepeatPassword()}
                           helperText={this.errorRepeatPasswordText()}
                           name="repeatPassword" label="Повторите пароль" variant="filled"
                           value={this.state.repeatPassword}
                           type="password"
                           onChange={this.onChange}/>
            </div>
            <div>
                <Button className="LoginButton" onClick={this.onClick} variant="contained" color="primary"
                        disabled={this.registerButtonDisable()}>Create account</Button>
                <Route render={({history}) => (
                    <Button className="SignUpButton" onClick={() => {
                        history.push('/login')
                    }} variant="outlined" color="primary">
                        Sign in
                    </Button>
                )}/>
            </div>
        </div>
    }
}

export default Register;