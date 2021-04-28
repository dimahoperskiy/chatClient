import React from "react"
import {reduxForm, Field} from "redux-form";
import style from "../../Auth.module.css";
import FormInput from "../../FormInput";
import {requiredCreator, isEmail} from "../../validators";
import FormInputContainer from "../../FormInputContainer";

const loginRequired = requiredCreator("Login")
const emailRequired = requiredCreator("Email")
const passwordRequired = requiredCreator("Password")


const RegisterForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.formWrapper}>
            <div className={style.inputWrapper}>
                <Field name='login'
                       component={FormInputContainer}
                       placeholder='Login'
                       className={style.input}
                       validate={loginRequired}/>
            </div>
            <div className={style.inputWrapper}>
                <Field name='email'
                       component={FormInputContainer}
                       placeholder='Email'
                       type="email"
                       validate={[emailRequired, isEmail]}/>
            </div>
            <div className={style.inputWrapper}>
                <Field name='password'
                       component={FormInputContainer}
                       placeholder='Password'
                       type='password'
                       className={style.input}
                       validate={passwordRequired}/>
            </div>
            <div className={style.btnWrapper}>
                <button type='submit' className={style.btn}>Sign up</button>
            </div>
        </form>
    )
}

export default reduxForm({form: 'register'})(RegisterForm)