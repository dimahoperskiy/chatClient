import api from "../../api/api";
import {reset} from "redux-form";

const SET_CURRENT_USER = "SET_CURRENT_USER"
const LOG_OUT = "LOG_OUT"
const SET_IS_WRONG_AUTH = "SET_IS_WRONG_AUTH"
const SET_IS_WRONG_LOGIN = "SET_IS_WRONG_LOGIN"
const SET_IS_WRONG_EMAIL = "SET_IS_WRONG_EMAIL"
const SET_IS_LOADING_APP = "SET_IS_LOADING_APP"


let initialState = {
    login: "",
    email: "",
    id: -1,
    isLoggedIn: false,
    isWrongAuth: false,
    isWrongLogin: false,
    isWrongEmail: false,
    isLoadingApp: true
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state, login: action.login, email: action.email, id: action.id, isLoggedIn: true
            }
        case LOG_OUT:
            return {
                ...state, login: "", email: "", isLoggedIn: false
            }
        case SET_IS_WRONG_AUTH:
            return {
                ...state, isWrongAuth: action.isWrongAuth
            }
        case SET_IS_WRONG_LOGIN:
            return {
                ...state, isWrongLogin: action.isWrongLogin
            }
        case SET_IS_WRONG_EMAIL:
            return {
                ...state, isWrongEmail: action.isWrongEmail
            }
        case SET_IS_LOADING_APP:
            return {
                ...state, isLoadingApp: action.isLoadingApp
            }
        default:
            return state
    }
}

export const loginThunk = (formData, d, func) => {
    return (dispatch) => {
        api.login(formData)
            .then(data => {
                dispatch(setCurrentUser(data.login, data.email, data.id))
                d(reset('login'))
                func()
                return 1
            })
            .catch(err => {
                dispatch(setIsWrongAuth(err.response.data))
                return 0
            })
    }
}

export const registerThunk = (formData, d, func) => {
    return (dispatch) => {
        api.register(formData)
            .then(() => {
                dispatch(setCurrentUser(formData.login, formData.email))
                d(reset('register'))
                func()
            })
            .catch((err) => {
                if (err.response.data === "Username exists") {
                    dispatch(setIsWrongLogin(err.response.data))
                } else if (err.response.data === "Email exists") {
                    dispatch(setIsWrongEmail(err.response.data))
                }
            })
    }
}


export const setCurrentUser = (login, email, id) => ({type: SET_CURRENT_USER, login, email, id})
export const logOut = () => ({type: LOG_OUT})
export const setIsWrongAuth = (isWrongAuth) => ({type: SET_IS_WRONG_AUTH, isWrongAuth})
export const setIsWrongLogin = (isWrongLogin) => ({type: SET_IS_WRONG_LOGIN, isWrongLogin})
export const setIsWrongEmail = (isWrongEmail) => ({type: SET_IS_WRONG_EMAIL, isWrongEmail})
export const setIsLoadingApp = (isLoadingApp) => ({type: SET_IS_LOADING_APP, isLoadingApp})

export default authReducer