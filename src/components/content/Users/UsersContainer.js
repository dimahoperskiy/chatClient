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
import * as axios from "axios";
import Users from "./Users";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalPages: state.usersPage.totalPages,
        isFetching: state.usersPage.isFetching
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
        axios.get(`http://dimahoperskiy.ru:8092/users/?size=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then(response => {
                this.props.setUsers(response.data.content)
                this.props.setTotalPages(response.data.totalPages)
                this.props.toggleIsFetching(false)
            })
    }

    paginate = (i) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(i)
        axios.get(`http://dimahoperskiy.ru:8092/users/?size=${this.props.pageSize}&page=${i}`)
            .then(response => {
                this.props.setUsers(response.data.content)
                this.props.toggleIsFetching(false)
            })
    }

    render() {
        return <Users users={this.props.users}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      totalPages={this.props.totalPages}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      isFetching={this.props.isFetching}
                      paginate={this.paginate}/>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersAPI)

