import React from "react"
import style from "./Info.module.css"
import img from "../../../common/mike.png"

const Info = (props) => {
    return (
        <div className={style.info}>
            <img src={img} alt="ava"/>
            <div className={style.userInfo}>
                <div><h3>{props.user.login}</h3></div>
                <div>{props.user.email}</div>
                <div>Registered on {props.user.createdAt}</div>
            </div>
        </div>
    );
}

export default Info