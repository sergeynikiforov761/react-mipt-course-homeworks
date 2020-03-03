import React from "react";
import css from "./SignIn.module.css";
import {customHistory} from "../../App";

export class SignIn extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: '',
                password: ''
            }
        }
    }

    onChange = (event) => {
      this.setState({
          form: {
              ...this.state.form,
              [event.target.name]: event.target.value
          }
      })
    };

    onSubmit = (event) => {
        if(event) {
            event.preventDefault();
        }

        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
        })
            .then(response => response.json())
            .then(response => {
                if(!response.status){
                    localStorage.setItem('TOKEN', response.accessToken);
                    this.props.onChangeFlag(true);
                    customHistory.push('/dashboard');
                } else {
                    console.log('ERROR: ', response);
                }
            })
            .catch(error => console.log('ERROR: ', error.message));
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
                                <input type="email" className={css.form_control} name='email' value={this.state.email} onChange={this.onChange}
                                       aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <div className={css.form_group}>
                                <label htmlFor="inputPassword1">Password:</label>
                                <input type="password" className={css.form_control} name='password' value={this.state.password} onChange={this.onChange}
                                       placeholder="Password"/>
                            </div>
                            <div className={css.buttons}>
                                <button type="submit" className={css.btn}>Send</button>
                                <button type="submit" className={css.btn}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}