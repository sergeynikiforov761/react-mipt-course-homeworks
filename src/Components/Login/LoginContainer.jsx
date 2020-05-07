import React from "react";
import {getloginUserThunkCreator} from "../../redux/auth-reducer";
import Login from "./Login";
import {connect} from "react-redux";


let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    name: state.auth.name

});

let mapDispatchToProps = (dispatch) => ({
    getloginUser: (email, password) => dispatch(getloginUserThunkCreator(email, password))

})

export default connect(mapStateToProps, mapDispatchToProps)(Login);