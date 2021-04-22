import React from "react";
import style from './User.module.css'
import {NavLink} from "react-router-dom";
import img from "../../../common/mike.png"

const User = (props) => {
    return (
        <div className={style.user}>
            <div>
                <NavLink to={'/profile/' + props.user.login}>
                    <img
                        src={img}
                        alt="ava" className={style.avaImg}/>
                </NavLink>
            </div>
            <div className={style.userInfo}>
                <div className={style.locName}>
                    <div className={style.name}><b>{props.user.login}</b></div>
                    <div>{props.user.email}</div>
                    <div>Registered on {props.user.createdAt}</div>
                </div>
                <div className={style.status}>{props.user.status || "No status yet..."}</div>
            </div>
        </div>
    )
}

export default User