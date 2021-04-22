const SET_USER = 'SET-USER'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const CLEAR_USER_INFO = 'CLEAR_USER_INFO'


let initialState = {
    user: {},
    isFetching: false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case CLEAR_USER_INFO:
            return {
                ...state, user: {}
            }
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

export const setUser = (user) => ({type: 'SET-USER', user})
export const clearUserInfo = () => ({type: CLEAR_USER_INFO})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})

export default profileReducer