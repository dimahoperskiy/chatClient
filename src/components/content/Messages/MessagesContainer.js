import React from "react"
import Messages from "./Messages";
import {
    setRecipient,
    updateMessages,
    setDialogs,
    setIsConnected,
    setMessages,
    setIsDialogActive,
    messagesInitialThunk,
    setRecipientThunk
} from "../../../redux/reducers/messagesReducer";
import {setCurrentUser} from "../../../redux/reducers/authReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Redirect} from "react-router";
import Preloader from "../../common/Preloader/Preloader";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return ({
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
        userId: state.auth.id,
        login: state.auth.login,
        recipient: state.messagesPage.recipient,
        isConnected: state.messagesPage.isConnected,
        isDialogActive: state.messagesPage.isDialogActive,
        isLoggedIn: state.auth.isLoggedIn,
        isLoading: state.messagesPage.isLoading,
        isUserNotFound: state.messagesPage.isUserNotFound
    })
}

const mapDispatchToProps = {
    setRecipient,
    updateMessages,
    setDialogs,
    setIsConnected,
    setMessages,
    setCurrentUser,
    setIsDialogActive,
    messagesInitialThunk,
    setRecipientThunk
}

class MessagesContainer extends React.Component {
    componentDidMount() {
        this.props.messagesInitialThunk(this.props.match.params.recipient, this.props.userId, this.props.login)
    }

    render() {
        if (this.props.isLoading) {
            return <Preloader/>
        } else if (this.props.isUserNotFound) {
            return <Redirect to="/404"/>
        } else if (!this.props.isLoggedIn) {
            return <Redirect to="/login"/>
        } else {
            return <Messages dialogs={this.props.dialogs}
                             messages={this.props.messages}
                             login={this.props.login}
                             recipient={this.props.recipient}
                             userId={this.props.userId}
                             setRecipient={this.props.setRecipientThunk}
                             isDialogActive={this.props.isDialogActive}
                             deleteMessage={this.props.deleteMessage}
                             sendMessage={this.props.sendMessage}
                             editMessage={this.props.editMessage}/>
        }
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MessagesContainer)