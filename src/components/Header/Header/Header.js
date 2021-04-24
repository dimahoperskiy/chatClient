import React from "react"
import style from "./Header.module.css"
import {NavLink} from "react-router-dom";
import img from "./me.jpg"

const Header = (props) => {
    return (
        <header className={style.header}>
            <div className={style.imgWrapper}>
                <img
                    src={img}
                    alt="logo" className={style.logo}/>
            </div>
            <div className={style.login}>
                {props.isLoggedIn
                    ?
                    <>
                        <NavLink to='/profile' className={style.link}>@{props.login}</NavLink>
                        <NavLink to='/login' onClick={props.logout} className={style.link}>Logout</NavLink>
                    </>
                    :
                    <NavLink to='/login' className={style.link}>Sign In</NavLink>
                }

            </div>
        </header>
    );
}

export default Header