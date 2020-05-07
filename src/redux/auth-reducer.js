import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    accessToken: "",
    accessTokenExpiresIn: "",
    refreshToken: "",
    refreshTokenExpiresIn: "",
    login: "",
    email: "",
    password: "",
    isAuth: false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};

export const getAuthUserData = () => (dispatch) => {
    // authAPI.me()
    //     .then(respone ={
    //     dispatch(setAuthUserData(accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn, true))
    //     })


}

export const setAuthUserData = (accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn, isAuth) => ({
    type: SET_USER_DATA,
    data: {accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn, isAuth}
})

export const getloginUserThunkCreator = (email, password) => (dispatch) => {

    authAPI.login(email, password)
        .then(response => {

                if (response.status == 200) {  //не удалось победить. хз на что ориентироваться :(
                    let {accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn} = response.data;
                    dispatch(setAuthUserData(accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn, true));

                } else {

                    let message = response.message.length > 0 ? response.message : "Some error";
                    dispatch(stopSubmit("login", {_error: message}));
                }
            }
        );

}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.status == 200) {
                dispatch(setAuthUserData(null, null, null, null, false));
            }
        })
}


export default authReducer;