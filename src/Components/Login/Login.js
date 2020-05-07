import React from 'react';
import {Field, Form, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";
import {Input} from "../common/FormsControls/FormsContorls";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import style from "./../common/FormsControls/FormsControls.module.css"

const LoginForm = (props) => {

    return (
        <Form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={"email"} component={Input}
                       validate={[required]}/>
            </div>

            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} type="password"
                       validate={[required]}/>
            </div>

            <div>
                <button>Login</button>
            </div>

            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>
            }
        </Form>
    )
}

let LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {

    const onSubmit = ({email, password}) => {
        props.getloginUser(email, password);
    };

    if (props.isAuth) {
        return <Redirect to={"/dashboard"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.isAuth
})

export default connect(mapStateToProps, {Login})(Login);
