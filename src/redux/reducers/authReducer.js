const SET_CURRENT_USER = "SET_CURRENT_USER"
const LOG_OUT = "LOG_OUT"
const SET_IS_WRONG_AUTH = "SET_IS_WRONG_AUTH"
const SET_IS_WRONG_LOGIN = "SET_IS_WRONG_LOGIN"
const SET_IS_WRONG_EMAIL = "SET_IS_WRONG_EMAIL"


let initialState = {
    login: "",
    email: "",
    id: -1,
    isLoggedIn: false,
    isWrongAuth: false,
    isWrongLogin: false,
    isWrongEmail: false
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
        default:
            return state
    }
}


export const setCurrentUser = (login, email, id) => ({type: SET_CURRENT_USER, login, email, id})
export const logOut = () => ({type: LOG_OUT})
export const setIsWrongAuth = (isWrongAuth) => ({type: SET_IS_WRONG_AUTH, isWrongAuth})
export const setIsWrongLogin = (isWrongLogin) => ({type: SET_IS_WRONG_LOGIN, isWrongLogin})
export const setIsWrongEmail = (isWrongEmail) => ({type: SET_IS_WRONG_EMAIL, isWrongEmail})



export default authReducer