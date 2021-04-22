import React from "react";
import Login from "./Login";
import axios from "axios";
import {setCurrentUser} from "../../../redux/reducers/authReducer";
import {setIsWrongAuth} from "../../../redux/reducers/authReducer";
import {connect} from "react-redux";
import {reset} from "redux-form";

const mapStateToProps = (state) => {
    return {
        // login: state.auth.login,
        // email: state.auth.email,
        // isLoggedIn: state.auth.isLoggedIn
    }
}

let mapDispatchToProps = {
    setCurrentUser,
    setIsWrongAuth
}


class LoginContainer extends React.Component {
    login = (formData, dispatch, func) => {
        axios.post("http://89.108.65.167:8092/login",
            {login: formData.login, password: formData.password},
            {withCredentials: true})
            .then(response => {
                this.props.setCurrentUser(response.data.login, response.data.email, response.data.id)
                dispatch(reset('login'))
                func()
                // this.props.toggleIsFetching(false)
            })
            .catch(err => {
                this.props.setIsWrongAuth(err.response.data)
            })


    }

    render() {
        return <Login onSubmit={this.login}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)