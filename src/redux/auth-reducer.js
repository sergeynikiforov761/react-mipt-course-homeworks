import {LoginAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    "accessToken": "",
    "accessTokenExpiresIn": "",
    "refreshToken": "",
    "refreshTokenExpiresIn": "",
    "login": "",
    "email": "",
    "password": "",
    "isAuth": false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };

        default:
            return state;
    }

}


export const setAuthUserData = (accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn) => ({
    type: SET_USER_DATA,
    data: {accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn}
})

export const getloginUserThunkCreator = (login, password) => {
    return (dispatch) => {
        LoginAPI.postLogin(login, password)
            .then(response => {
                    if (response.data.accessToken !== "") {
                        let {accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn} = response.data;

                        dispatch(setAuthUserData(accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn));
                    }

                }
            );
    }
}

export default authReducer;