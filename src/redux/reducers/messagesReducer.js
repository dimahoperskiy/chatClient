import api from "../../api/api";
import {setCurrentUser} from "./authReducer";

const SET_RECIPIENT = "SET_RECIPIENT"
const UPDATE_MESSAGES = "UPDATE_MESSAGES"
const SET_DIALOGS = "SET_DIALOGS"
const SET_IS_CONNECTED = "SET_IS_CONNECTED"
const SET_MESSAGES = "SET_MESSAGES"
const SET_IS_DIALOG_ACTIVE = "SET_IS_DIALOG_ACTIVE"
const SET_IS_USER_NOT_FOUND = "SET_IS_USER_NOT_FOUND"
const SET_IS_LOADING = "SET_IS_LOADING"



let initialState = {
    dialogs: [],
    recipient: '',
    messages: [],
    stomp: '',
    isConnected: false,
    isDialogActive: false,
    isUserNotFound: true,
    isLoading: true
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RECIPIENT:
            return {
                ...state, recipient: action.recipient
            }
        case SET_DIALOGS:
            return {
                ...state, dialogs: action.dialogs
            }
        case UPDATE_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        case SET_MESSAGES:
            return {
                ...state,
                messages: [...action.messages]
            }
        case SET_IS_CONNECTED:
            return {
                ...state, isConnected: action.isConnected
            }
        case SET_IS_DIALOG_ACTIVE:
            return {
                ...state, isDialogActive: action.isDialogActive
            }
        case SET_IS_USER_NOT_FOUND:
            return {
                ...state, isUserNotFound: action.isUserNotFound
            }
        case SET_IS_LOADING:
            return {
                ...state, isLoading: action.isLoading
            }
        default:
            return state
    }
}


export const messagesInitialThunk = (recipient, userId, login) => {
    return (dispatch) => {
        if (recipient === undefined) {
            dispatch(setIsDialogActive(false))
            dispatch(setMessages([]))
        } else {
            dispatch(setIsDialogActive(true))
        }
        api.getProfile()
            .then(data1 => {
                dispatch(setCurrentUser(data1.login, data1.email, data1.id))
                api.getAllUsers()
                    .then(data2 => {
                        let resp = data2.content.filter(el => {
                            if (el.login === recipient) {
                                let id = el.id
                                api.getChatMessages(id, userId)
                                    .then(data3 => {
                                        dispatch(setMessages(data3))
                                    })
                            }
                            return el.login !== login
                        })
                        if (recipient !== undefined) {
                            resp.map(el => {
                                if (recipient === el.login && recipient !== login) {
                                    dispatch(setIsUserNotFound(false))
                                }
                            })
                        } else {
                            dispatch(setIsUserNotFound(false))
                        }
                        dispatch(setDialogs(resp))
                        dispatch(setIsLoading(false))
                    })
            })
        dispatch(setRecipient(recipient))
    }
}

export const setRecipientThunk = (name, id, userId) => {
    return (dispatch) => {
        dispatch(setIsDialogActive(true))
        api.getChatMessages(id, userId)
            .then(data => {
                dispatch(setMessages(data))
            })
        dispatch(setRecipient(name))
    }
}

export const setRecipient = (recipient) => ({type: SET_RECIPIENT, recipient})
export const updateMessages = (message) => ({type: UPDATE_MESSAGES, message})
export const setMessages = (messages) => ({type: SET_MESSAGES, messages})
export const setDialogs = (dialogs) => ({type: SET_DIALOGS, dialogs})
export const setIsConnected = (isConnected) => ({type: SET_IS_CONNECTED, isConnected})
export const setIsDialogActive = (isDialogActive) => ({type: SET_IS_DIALOG_ACTIVE, isDialogActive})
export const setIsUserNotFound = (isUserNotFound) => ({type: SET_IS_USER_NOT_FOUND, isUserNotFound})
export const setIsLoading= (isLoading) => ({type: SET_IS_LOADING, isLoading})

export default messagesReducer
