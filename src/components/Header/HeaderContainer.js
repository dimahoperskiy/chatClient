import React from "react"
import {connect} from "react-redux";
import Header from "./Header/Header";
import {setCurrentUser, logOut} from "../../redux/reducers/authReducer";
import { clearUserInfo} from "../../redux/reducers/profileReducer";
import {updateMessages} from "../../redux/reducers/messagesReducer";
import api from "../../api/api";

const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        isLoggedIn: state.auth.isLoggedIn
    }
}

let mapDispatchToProps = {
    setCurrentUser,
    logOut,
    clearUserInfo,
    updateMessages,
}


class HeaderContainer extends React.Component {
    logout = () => {
        api.logout()
            .then(() => {
                this.props.clearUserInfo()
                this.props.logOut()
            })
    }

    render() {
        return (
            <Header login={this.props.login} isLoggedIn={this.props.isLoggedIn} logout={this.logout}/>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)