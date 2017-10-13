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
                return dispatch(loginSuccess(username, password));
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

const loginSuccess = (username, password) => {

    fetch('http://jr.econ14.com/api/login', { 
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        username: username,
        password: password,
            })
    }) 
    .then((response) => response.json()) 
    .then((res) => { 
        if (res.status) {
            MessageBarManager.showAlert({ 
                message: res.status,
                alertType: 'error',
            }) 
        } else {
            // console.warn(JSON.stringify(res));
            // AsyncStorage.setItem('jwt', res.session_id)     
            // AsyncStorage.setItem('Uid',res.credential.username) 
            routes.home();
            MessageBarManager.showAlert({
                message: 'login success',
                alertType: 'success',
            })
        }
    })
    .catch((error) => { console.log(error); })
    .done();
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
    fetch(`http://jr.econ14.com/api/logout`,{
        method: "GET", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }   
    }) 
    .then((response) => response.json()) 
    .then((responseJson) => { return responseJson })
    .then(routes.login())
    .then(MessageBarManager.showAlert({ 
        message: `Logout SuccessFull`,
        alertType: 'success',
    })) 
    .catch((error) => { console.error(error); })
    .done();

    return dispatch => {
        dispatch({
            type: AUTH_LOGOUT
        });
    };
};