import {applyMiddleware, combineReducers, createStore} from "redux";
import  thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reducer";
import { reducer as formReducer } from 'redux-form'


let reducers = combineReducers({
    auth: authReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;