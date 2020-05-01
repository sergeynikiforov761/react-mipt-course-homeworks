import React from 'react';
import {Field, Form, reduxForm} from "redux-form";
import {required, maxLenghtCreator} from "../../utils/validators/validators";
import {Input} from "../common/FormsControls/FormsContorls";

const maxLenghtCreator10 = maxLenghtCreator(10);
const LoginForm = (props) => {

    return (
        <Form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} component = {Input}
                validate ={[required, maxLenghtCreator10]} />
            </div>

            <div>
                <Field placeholder={"Password"} name={"password"}  component = {Input}
                       validate ={[required]}/>
            </div>

            <div>
                <button>Login</button>
            </div>

        </Form>
    )
}

let LoginReduxForm = reduxForm({form: 'login' })(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData);
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Login;
