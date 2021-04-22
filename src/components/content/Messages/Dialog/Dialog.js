import React from "react"
import style from "./Dialog.module.css"
import {NavLink} from "react-router-dom";
import img from "../../../common/mike.png"



const Dialog = (props) => {

    let setRecipient = () => {
        return props.setRecipient(props.name, props.id)
    }

    return (
        <NavLink onClick={setRecipient} className={style.link} activeClassName={style.active} to={'/messages/' + props.name}>
            <img
                src={img}
                alt="ava" className={style.ava}/>
            <p className={style.name}>{props.name}</p>
        </NavLink>
    );
}

export default Dialog