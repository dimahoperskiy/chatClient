import * as React from "react";
import style from "./Users.module.css";
import User from "./User/User";
import Preloader from "../../common/Preloader/Preloader";

const Users = (props) => {

    let pagesList = []
    for (let i = 0; i < props.totalPages; i++) {
        pagesList.push(i)
    }

    return (
        <>
            {props.isFetching ? <Preloader/> : null}
            <div className={style.usersWrapper}>
                <h1>Users</h1>
                {props.users.map(user => <User user={user}
                                               follow={props.follow}
                                               unfollow={props.unfollow}/>)}
                <div className={style.pagination}>
                    {pagesList.map(i => {
                        return (
                            <span onClick={event => props.paginate(i)}
                                  className={`${style.pageLink} ${props.currentPage === i && style.activePage}`}>
                                {i + 1}{'\u00A0'}
                            </span>)
                    })}
                </div>
            </div>
        </>
    )
}

export default Users