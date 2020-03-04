import React from "react";
import css from "./SignUp.module.css";
import {customHistory} from "../../App";
import {ErrorMessage} from "../Errors/ErrorMessage/ErrorMessage";
import {ErrorValidation} from "../Errors/ErrorValidation/ErrorValidation";

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: '',
                email: '',
                password: '',
                repeatPassword: ''
            },
            responseStatus: '',
            errorValidation: {
                name: '',
                email: '',
                password: '',
            },
            errorMessage: ''
        }
    }

    isEmpty = (str) => {
        if(str.trim() === '') {
            return false;
        }

        return true;
    };

    onChange = (event) => {  //Как стрелочная функция заменяет bind();
        this.setState({
            form: {
                ...this.state.form,     //Еще раз про спред оператор
                [event.target.name]: event.target.value     //Почему ставим квадратные скобки
            }
        });
    };

    ErrorValidationComponent = (Component) => {
        return <Component {...this.state.errorValidation}/>
    };

    onSubmit = (event) => {
        if (event) {
            event.preventDefault(); //Что еще интересно можно узнать про методы событий
        }

        if (this.state.form.password === this.state.form.repeatPassword && this.isEmpty(this.state.form.password) && this.isEmpty(this.state.form.name) && this.isEmpty(this.state.form.email)) {
            fetch('/auth/register', {
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
                        localStorage.setItem('TOKEN', response.accessToken);
                        this.props.onChangeFlag(true);
                        customHistory.push('/dashboard');
                    } else {
                        this.setState({
                            errorMessage: response
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        errorMessage: error.message
                    })
                });
        }

        if (this.state.form.password !== this.state.form.repeatPassword) {
            this.setState({errorMessage: 'Passwords do not match!'});
        }

        if (!this.isEmpty(this.state.form.password)) {
            this.setState({
                errorValidation: {
                    ...this.state.errorValidation,
                    password: 'Enter your password!'
                }
            })
        }

        if (!this.isEmpty(this.state.form.email)) {
            this.setState({
                errorValidation: {
                    ...this.state.errorValidation,
                    email: 'Enter your email!'
                }
            })
        }

        if (!this.isEmpty(this.state.form.name)) {
            this.setState({
                errorValidation: {
                    ...this.state.errorValidation,
                    name: 'Enter your name!'
                }
            })
        }
    };

    render() {
        return (
            <div className={css.sign_up}>
                <header className={css.header}>
                    <div>
                        <h1>MiniJira</h1>
                    </div>
                    <div onClick={() => {
                        customHistory.push('/signIn')
                    }}>
                        Sign In
                    </div>
                </header>
                <main className={css.main}>
                    <div className={css.form_block}>
                        <div className={css.title_form}>
                            Sign Up
                        </div>
                        <form className={css.form}
                              onSubmit={this.onSubmit}>    {/*Почему onSubmit пишем здесь а не у кнопки, как он понимает к какой из кнопки относится это событие*/}
                            <div className={css.form_group}>
                                <label htmlFor="firstName">First name:</label>
                                <input type="text" className={css.form_control} name='name' value={this.state.form.name}
                                       onChange={this.onChange}
                                       placeholder="First name"/>
                                {this.state.errorValidation.name !== '' && this.ErrorValidationComponent(ErrorValidation)}
                            </div>
                            <div className={css.form_group}>
                                <label htmlFor="email">Email address:</label>
                                <input type="email" className={css.form_control} name='email'
                                       value={this.state.form.email} onChange={this.onChange}
                                       placeholder="Email address"/>
                                {this.state.errorValidation.email !== '' && this.ErrorValidationComponent(ErrorValidation)}
                            </div>
                            <div className={css.form_group}>
                                <label htmlFor="password">Password:</label>
                                <input type="password" className={css.form_control} name='password'
                                       value={this.state.form.password} onChange={this.onChange}
                                       placeholder="Password"/>
                                {this.state.errorValidation.password !== '' && this.ErrorValidationComponent(ErrorValidation)}
                            </div>
                            <div className={css.form_group}>
                                <label htmlFor="repeatPassword">Repeat password:</label>
                                <input type="password" className={css.form_control} name='repeatPassword'
                                       value={this.state.form.repeatPassword} onChange={this.onChange}
                                       placeholder="Repeat password"/>
                            </div>
                            <div className={css.buttons}>
                                <button type="submit" className={css.btn}>Send</button>
                                <button type="submit" className={css.btn}>Cancel</button>
                            </div>
                            {this.state.errorMessage !== '' && <ErrorMessage error={this.state.errorMessage}/>}
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}
