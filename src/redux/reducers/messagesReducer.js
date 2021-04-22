const SET_RECIPIENT = "SET_RECIPIENT"
const UPDATE_MESSAGES = "UPDATE_MESSAGES"
const SET_DIALOGS = "SET_DIALOGS"
const SET_IS_CONNECTED = "SET_IS_CONNECTED"
const SET_MESSAGES = "SET_MESSAGES"
const SET_IS_DIALOG_ACTIVE = "SET_IS_DIALOG_ACTIVE"

let initialState = {
    dialogs: [],
    recipient: '',
    messages: [],
    stomp: '',
    isConnected: false,
    isDialogActive: false
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
        default:
            return state
    }
}


export const setRecipient = (recipient) => ({type: SET_RECIPIENT, recipient})
export const updateMessages = (message) => ({type: UPDATE_MESSAGES, message})
export const setMessages = (messages) => ({type: SET_MESSAGES, messages})
export const setDialogs = (dialogs) => ({type: SET_DIALOGS, dialogs})
export const setIsConnected = (isConnected) => ({type: SET_IS_CONNECTED, isConnected})
export const setIsDialogActive = (isDialogActive) => ({type: SET_IS_DIALOG_ACTIVE, isDialogActive})


export default messagesReducer
