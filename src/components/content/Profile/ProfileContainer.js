import React from "react"
import {connect} from "react-redux"
import Profile from "./Profile";
import {setUser, toggleIsFetching} from "../../../redux/reducers/profileReducer";
import {withRouter} from "react-router-dom";
import api from "../../../api/api";
import {Redirect} from "react-router";


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
            api.getUser(userId)
                .then(data => {
                    this.props.setUser(data)
                    this.props.toggleIsFetching(false)
                })
        } else {
            api.getProfile()
                .then(data => {
                    this.props.setUser(data)
                    this.props.toggleIsFetching(false)
                })
        }
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to="login"/>
        } else {
            return (
                <Profile
                    user={this.props.user}
                    isFetching={this.props.isFetching}
                    me={this.props.me}
                    isLoggedIn={this.props.isLoggedIn}/>
            )
        }
    }
}

let ProfileContainer = withRouter(ProfileAPI)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)