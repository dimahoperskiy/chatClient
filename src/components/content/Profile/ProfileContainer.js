import React from "react"
import {connect} from "react-redux"
import Profile from "./Profile";
import axios from "axios";
import {setUser, toggleIsFetching} from "../../../redux/reducers/profileReducer";
import {withRouter} from "react-router-dom";


let mapStateToProps = (state) => {
    return ({
        user: state.profilePage.user,
        me: state.auth.login,
        isFetching: state.profilePage.isFetching,
        isLoggedIn: state.auth.isLoggedIn
    })
}

let mapDispatchToProps = {
    setUser,
    toggleIsFetching
}

class ProfileAPI extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        let userId = this.props.match.params.userId

        if (userId) {
            axios.get("https://dimahoperskiy.ru:8443/users/" + userId)
                .then(response => {
                    this.props.setUser(response.data)
                    this.props.toggleIsFetching(false)
                })
        } else {
            axios.get("https://dimahoperskiy.ru:8443/users/profile", {withCredentials: true})
                .then(response => {
                    this.props.setUser(response.data)
                    this.props.toggleIsFetching(false)
                })
        }
    }

    render() {
        return (<Profile
            user={this.props.user}
            isFetching={this.props.isFetching}
            me={this.props.me}/>)
    }
}

let ProfileContainer = withRouter(ProfileAPI)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)