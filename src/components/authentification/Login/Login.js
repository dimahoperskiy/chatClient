import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import {NavLink, useHistory} from "react-router-dom";
import style from "../Auth.module.css"


const Login = (props) => {
    let history = useHistory()

    let func = () => {
        history.push('profile')
    }

    return (
        <div className={style.wrapper}>
            <h1>Sign In</h1>
            <LoginForm onSubmit={(e, d) => props.onSubmit(e, d, func)}/>
            <div className={style.notRegistered}>
                <p className={style.notRegisteredText}>Not registered yet?</p>
                <NavLink to='/register' className={style.link}>Sign Up!</NavLink>
            </div>
        </div>
    )
}

export default Login