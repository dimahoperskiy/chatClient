import React from "react";
import style from "./Auth.module.css"
import {useEffect} from "react";


const FormInput = ({input, meta, ...props}) => {
    let hasError = meta.touched && meta.error

    useEffect(() => {
      if (meta.active) {
          props.setIsWrongAuth(false)
          props.setIsWrongEmail(false)
          props.setIsWrongLogin(false)
        }
    })

    return (
        <>
            <input {...input} {...props} className={style.input + " " + (hasError ? style.errorActive : "")}/>
            {hasError && <span className={style.errorSpan}>{meta.error}</span>}

            {input.name === "password" && props.isWrongAuth && !meta.active &&
            <span className={style.errorSpan}>Wrong username or password</span>}

            {input.name === "login" && props.isWrongLogin && !meta.active &&
            <span className={style.errorSpan}>This username already exists</span>}

            {input.name === "email" && props.isWrongEmail && !meta.active &&
            <span className={style.errorSpan}>This email already exists</span>}
        </>
    )
}

export default FormInput