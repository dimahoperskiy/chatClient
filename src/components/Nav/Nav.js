import React from "react"
import style from "./Nav.module.css"
import {NavLink} from "react-router-dom";



const Nav = (props) => {

    return (
        <nav className={style.nav}>
            <div className={style.navigation}>
                <div className={style.item}>
                    <NavLink exact className={style.link} activeClassName={style.active} to='/'>Home</NavLink>
                </div>
                {
                    props.isLoggedIn &&
                    <div className={style.item}>
                        <NavLink className={style.link} activeClassName={style.active} to='/profile'>Profile</NavLink>
                    </div>
                }
                {
                    props.isLoggedIn &&
                    <div className={style.item}>
                        <NavLink className={style.link} activeClassName={style.active} to='/messages'>Messages</NavLink>
                    </div>
                }
                {
                    props.isLoggedIn &&
                    <div className={`${style.item} ${style.users}`}>
                        <NavLink className={style.link} activeClassName={style.active} to='/users'>Users</NavLink>
                    </div>
                }
            </div>
        </nav>
    );
}

export default Nav