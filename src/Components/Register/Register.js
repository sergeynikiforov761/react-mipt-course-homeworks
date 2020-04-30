import React from "react";

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            repeatPassword: ''
        };
    }

    onClick = () => {
        console.log('[amilov] submit form');
    };

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        return (
            <div>
                <h1>Registration</h1>
                <div>
                    <span>
                        Name
                    </span>
                    <input name="name" value={this.state.name} onChange={this.onChange}/>
                </div>
                <div>
                    <span>
                        Email
                    </span>
                    <input name="email" value={this.state.email} onChange={this.onChange}/>
                </div>
                <div>
                    <span>
                        Password
                    </span>
                    <input name="password" value={this.state.password} onChange={this.onChange}/>
                </div>
                <div>
                    <span>
                        Repeat password
                    </span>
                    <input name="repeatPassword" value={this.state.repeatPassword} onChange={this.onChange}/>
                </div>
                <button onClick={this.onClick}>Click me</button>
            </div>
        );
    }
}
