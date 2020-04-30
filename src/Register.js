import React from "react";
import {validateAll} from 'indicative/validator';

export class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {}
        };
    }

    onClick = () => {

        const messages = {
            required: "This {{ field }} is required!",
            'email.email': "Invalid email",
            'password.confirmation': "Passwords doesn't match"
        }
        console.log('[obabichev] submit form');
        const data = this.state;
        const rules = {
            login: 'required|string',
            email: 'required|email',
            password: 'required|string|min:8|confirmed'
        }
        validateAll(data, rules, messages)
            .then(() => {
                console.log("all right")
            })
            .catch(errors => {
                console.log(errors);
                const formatter = {}
                errors.forEach(error => formatter[error.field] = error.message)
                this.setState({errors: formatter})
                // console.log(this.state.errors.login)
            })

    };

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        return (

            <div>
                <div>
                    <span>
                        Login
                    </span>
                    <input name="login" value={this.state.login} onChange={this.onChange}/>
                </div>
                <div>
                    {this.state.errors.login &&
                    <span className='error' style={{ color: 'red' }}>{this.state.errors.login}</span>}
                </div>
                <div>
                    <span>
                        Email
                    </span>
                    <input name="email" value={this.state.email} onChange={this.onChange}/>
                </div>
                <div>
                    {this.state.errors.email &&
                    <span className='error' style={{ color: 'red' }}>{this.state.errors.email}</span>}
                </div>
                <div>
                    <span>
                        Password
                    </span>
                    <input name="password" value={this.state.password} onChange={this.onChange}/>
                </div>
                <div>
                    {this.state.errors.password &&
                    <span className='error' style={{ color: 'red' }}>{this.state.errors.password}</span>}
                </div>
                <div>
                    <span>
                        Repeat password
                    </span>
                    <input name="password_confirmation" value={this.state.repeatPassword} onChange={this.onChange}/>
                </div>
                <button onClick={this.onClick}>Click me</button>
            </div>
        );
    }
}