import React from "react";
import css from "./SignIn.module.css";
import {customHistory} from "../../App";
import InputErrorValidation from "../../images/InputErrorValidationImage";
import {ErrorMessage} from "../Errors/ErrorMessage/ErrorMessage";

export class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: '',
                password: ''
            },
            responseStatus: '',
            errorMessage: '',
            errorValidation: {
                email: '',
                password: ''
            }
        };
    }

    onChange = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        });
    };


    onSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        if (this.props.isEmpty(this.state.form.password) && this.props.isEmpty(this.state.form.email)) {
            fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            })
                .then(response => {
                    this.setState({
                        responseStatus: response.status
                    });
                    return response.json();
                })
                .then(response => {
                    if (this.state.responseStatus === 200) {
                        localStorage.setItem('TOKEN', JSON.stringify(response));
                        this.props.onChangeFlag(true);
                        customHistory.push('/dashboard');
                    } else {
                        this.setState({
                            errorMessage: response.message
                        });

                    }
                })
                .catch(error => {
                    this.setState({
                        errorMessage: error.message
                    });
                });
        }

        const email = !this.props.isEmpty(this.state.form.email) ? 'Enter your email!' : '';
        const password = !this.props.isEmpty(this.state.form.password) ? 'Enter your password!' : '';

        this.setState({
            errorValidation: {
                email: email,
                password: password
            }
        });
    };


    render() {
        return (
            <div className={css.sign_in}>
                <header className={css.header}>
                    <div>
                        <h1>MiniJira</h1>
                    </div>
                    <div onClick={() => {
                        customHistory.push('/signUp')
                    }}>
                        Sign Up
                    </div>
                </header>
                <main className={css.main}>
                    <div className={css.form_block}>
                        <div className={css.title_form}>
                            Sign In
                        </div>
                        <form className={css.form} onSubmit={this.onSubmit}>
                            <div className={css.form_group}>
                                <label htmlFor="inputEmail1">Email address:</label>
                                <input type="text" className={css.form_control} name='email' value={this.state.email}
                                       onChange={this.onChange}
                                       aria-describedby="emailHelp" placeholder="Enter email"/>
                                {this.state.errorValidation.email &&
                                <InputErrorValidation error={this.state.errorValidation.email}/>}
                            </div>
                            <div className={css.form_group}>
                                <label htmlFor="inputPassword1">Password:</label>
                                <input type="password" className={css.form_control} name='password'
                                       value={this.state.password} onChange={this.onChange}
                                       placeholder="Password"/>
                                {this.state.errorValidation.email &&
                                <InputErrorValidation error={this.state.errorValidation.password}/>}
                            </div>
                            <div className={css.buttons}>
                                <button type="submit" className={css.btn}>Send</button>
                                <button type="submit" className={css.btn}>Cancel</button>
                            </div>
                            {this.state.errorMessage && <ErrorMessage error={this.state.errorMessage}/>}
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}