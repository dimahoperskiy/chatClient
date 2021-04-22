import React from "react"
import RegisterForm from "./RegisterForm/RegisterForm";
import {useHistory} from "react-router-dom";
import style from "../Auth.module.css"


const Register = (props) => {
    let history = useHistory()

    let func = () => {
        history.push('profile')
    }

    return (
        <div className={style.wrapper}>
            <h1>Sign Up</h1>
            <RegisterForm onSubmit={(e, d) => props.onSubmit(e, d, func)}/>
        </div>
    )
}

export default Register