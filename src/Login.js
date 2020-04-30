import React from "react";

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: ''
        };
    }

    onClick = () => {
        localStorage.setItem('AUTH', "AUTH");
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
                    <span>
                        Password
                    </span>
                    <input name="password" value={this.state.password} onChange={this.onChange}/>
                </div>
                <button onClick={this.onClick}>Click me</button>
            </div>
        );
    }
}