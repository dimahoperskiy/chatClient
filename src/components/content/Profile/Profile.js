import React from "react"
import Info from "./Info/Info";
import style from "./Profile.module.css"
import Preloader from "../../common/Preloader/Preloader";
import {NavLink, useHistory} from "react-router-dom";

const Profile = (props) => {
    let history = useHistory()
    if (!props.isLoggedIn) {
        history.push("")
    }

    return (
        <div className={style.profileWrapper}>
            {props.isFetching ? <Preloader/> : null}
            <h1>Profile</h1>
            <Info user={props.user}/>
            {props.user.login !== props.me &&
            <NavLink to={"/messages/" + props.user.login} className={style.textMe}>
                Text me!
            </NavLink>}
        </div>
    );
}

export default Profile