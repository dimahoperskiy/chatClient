import React from "react";
import {Field, reduxForm} from "redux-form";
import style from "../../Auth.module.css"
import {requiredCreator} from "../../validators";
import FormInputContainer from "../../FormInputContainer";

const loginRequired = requiredCreator("Login")
const passwordRequired = requiredCreator("Password")



const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.formWrapper}>
            <div className={style.inputWrapper}>
                <Field placeholder="Login"
                       name="login"
                       component={FormInputContainer}
                       className={style.input}
                       validate={loginRequired}/>
            </div>
            <div className={style.inputWrapper}>
                <Field placeholder="Password"
                       name="password"
                       component={FormInputContainer}
                       type="password"
                       className={style.input}
                       validate={passwordRequired}/>
            </div>
            <div className={style.rememberMe}>
                <Field name="rememberME" component="input" type="checkbox"/>
                <p className={style.rememberMeText}>Remember me</p>
            </div>
            <div className={style.btnWrapper}>
                <button type="submit" className={style.btn}>Sign In</button>
            </div>
        </form>
    )
}

export default reduxForm({form: "login"})(LoginForm)