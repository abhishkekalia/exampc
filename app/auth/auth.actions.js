import {Actions as routes} from 'react-native-router-flux';
import { MessageBarManager } from 'react-native-message-bar';

export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const login = (username, password) => {
    return dispatch => {
        dispatch(loginStart());

        setTimeout(() => {
            if (username.length && password.length) {
                return dispatch(loginSuccess(username));
            }
            return dispatch(loginFail(new Error('UserName  & Password is required',)));
        }, Math.random() * 1000 + 500)
    };
};

const loginStart = () => {
    return {
        type: AUTH_LOGIN_START
    }
};

const loginSuccess = username => {
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload: {
            // token: Math.random().toString(),
            username: username
        }
    }
};

const loginFail = error => {
    return {
        type: AUTH_LOGIN_FAIL,
        payload: error,
        error: true
    }
};

export const logout = () => {
    return dispatch => {
        routes.root();
        dispatch({
            type: AUTH_LOGOUT
        });
    };
};