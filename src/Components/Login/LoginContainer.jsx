import React from "react";
import {getloginUserThunkCreator} from "../../redux/auth-reducer";
import Login from "./Login";
import {connect} from "react-redux";


class LoginContainer extends React.Component {

    componentDidMount() {
        this.props.getloginUserThunkCreator();
        //
        // LoginAPI.postLogin()
        //     .then(response => {
        //             if (response.data.accessToken !== "") {
        //                 let {accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn} = response.data;
        //
        //                 this.props.setAuthUserData(accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn)
        //             }
        //
        //         }
        //     );

    }

    render() {
        return (
            <Login/>
        )
    }

}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login

});

let mapDispatchToProps = (dispatch) => {
    return {
        getloginUserThunkCreator


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);