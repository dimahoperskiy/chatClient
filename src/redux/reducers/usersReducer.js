const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
    users: [],
    pageSize: 5,
    currentPage: 0,
    totalPages: 1,
    isFetching: false
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            // axios.put("http://localhost:8092/users", {id: action.userId, follow: true})
            return ({
                ...state,
                // users: axios.get("http://localhost:8092/users").then(response => response)
                users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, follow: true}
                    } else return el
                })
            })
        case UNFOLLOW:
            // axios.put("http://localhost:8092/users", {id: action.userId, follow: false})
            return ({
                ...state,
                // users: axios.get("http://localhost:8092/users").then(response => response)
                users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, follow: false}
                    } else return el
                })
            })
        case SET_USERS:
            return {...state, users: action.users}
        case SET_TOTAL_PAGES:
            return {...state, totalPages: action.totalPages}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }

}

export const follow = (userId) => ({type: FOLLOW, userId: userId})
export const unfollow = (userId) => ({type: UNFOLLOW, userId: userId})
export const setUsers = (users) => ({type: SET_USERS, users: users})
export const setTotalPages = (totalPages) => ({type: SET_TOTAL_PAGES, totalPages: totalPages})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})

export default usersReducer