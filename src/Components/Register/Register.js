import React from "react";
import {Field, Form, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsContorls";
import {required,minLenghtCreator,validateEmail,match} from "../../utils/validators/validators";

const minLengthCreator3 = minLenghtCreator(3);
const minLengthCreator8 = minLenghtCreator(8);

const RegisterForm = (props) => {
    return(
        <Form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} component = {Input}
                       validate ={[required,minLengthCreator3]} />
            </div>
            <div>
                <Field placeholder={"Email"} name={"email"} component = {Input}
                       validate ={[required,validateEmail]} />
            </div>

            <div>
                <Field placeholder={"Password"} name={"password"}  component = {Input} type="password"
                       validate ={[required,minLengthCreator8]}/>
            </div>
            <div>
                <Field placeholder={"Confirm Password"} name={"confirmPassword"}  component = {Input} type="password"
                       validate ={[required,minLengthCreator8,match("password")]}/>
            </div>

            <div>
                <button>Register</button>
            </div>

        </Form>
    )
}


let LoginReduxForm = reduxForm({form: 'register' })(RegisterForm)

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
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

                <LoginReduxForm />
            </div>
        );
    }
}
