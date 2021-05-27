import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setTotalPages,
    setUsers,
    toggleIsFetching,
    unfollow
} from "../../../redux/reducers/usersReducer";
import * as React from "react";
import Users from "./Users";
import api from "../../../api/api";
import {Redirect} from "react-router";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalPages: state.usersPage.totalPages,
        isFetching: state.usersPage.isFetching,
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = {
    follow,
    unfollow,
    setUsers,
    setTotalPages,
    setCurrentPage,
    toggleIsFetching
}


class UsersAPI extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        api.getPageableUsers(this.props.pageSize, this.props.currentPage)
            .then(data => {
                this.props.setUsers(data.content)
                this.props.setTotalPages(data.totalPages)
                this.props.toggleIsFetching(false)
            })
    }

    paginate = (i) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(i)
        api.getPageableUsers(this.props.pageSize, i)
            .then(data => {
                this.props.setUsers(data.content)
                this.props.toggleIsFetching(false)
            })
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to="login"/>
        } else {
            return (
                <Users users={this.props.users}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       totalPages={this.props.totalPages}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       isFetching={this.props.isFetching}
                       isLoggedIn={this.props.isLoggedIn}
                       paginate={this.paginate}/>
            )
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersAPI)

