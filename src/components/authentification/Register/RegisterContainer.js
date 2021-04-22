import React from "react"
import {connect} from "react-redux";
import Register from "./Register";
import {setCurrentUser} from "../../../redux/reducers/authReducer";
import {setIsWrongLogin, setIsWrongEmail} from "../../../redux/reducers/authReducer";

import axios from "axios";
import {reset} from "redux-form";

const mapStateToProps = (state) => {
    return ({
        // login: state.auth.login,
        // email: state.auth.email,
        // isLoggedIn: state.auth.isLoggedIn
    })
}

const mapDispatchToProps = {
    setCurrentUser,
    setIsWrongLogin,
    setIsWrongEmail
}


class RegisterContainer extends React.Component {
    register = (formData, dispatch, func) => {
        axios.post("http://89.108.65.167:8092/register",
            {login: formData.login, email: formData.email, password: formData.password},
            {withCredentials: true})
            .then((response) => {
                this.props.setCurrentUser(formData.login, formData.email)
                dispatch(reset('register'))
                func()
            })
            .catch((err) => {
                if (err.response.data === "Username exists") {
                    this.props.setIsWrongLogin(err.response.data)
                } else if (err.response.data === "Email exists") {
                    this.props.setIsWrongEmail(err.response.data)
                }
            })

    }

    render() {
        return (
            <Register onSubmit={this.register}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)