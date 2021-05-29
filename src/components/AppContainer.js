import React from "react";
import App from "./App";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {reset} from "redux-form";
import {setMessages, updateMessages} from "../redux/reducers/messagesReducer";
import {setCurrentUser, setIsLoadingApp} from "../redux/reducers/authReducer";
import {connect} from "react-redux";
import api from "../api/api";
import Preloader from "./common/Preloader/Preloader";

const mapStateToProps = (state) => {
    return ({
        userId: state.auth.id,
        recipient: state.messagesPage.recipient,
        login: state.auth.login,
        isLoggedIn: state.auth.isLoggedIn,
        messages: state.messagesPage.messages,
        isLoadingApp: state.auth.isLoadingApp
    })
}

const mapDispatchToProps = {
    updateMessages,
    setMessages,
    setCurrentUser,
    setIsLoadingApp
}


class AppContainer extends React.Component {
    componentDidMount() {
        api.getProfile()
            .then(data => {
                this.props.setCurrentUser(data.login, data.email, data.id)
                this.props.setIsLoadingApp(false)
            })
            .catch(() => {
                this.props.setIsLoadingApp(false)
            })
        if (!this.stompClient && this.props.userId !== -1 && this.props.userId !== undefined) {
            this.connect()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.stompClient && this.props.userId !== -1 && this.props.userId !== undefined) {
            this.connect()
        }
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.recipient === nextProps.recipient;
    }

    connect = () => {
        let sock = new SockJS("http://localhost:8093/ws");
        this.stompClient = Stomp.over(sock)
        this.stompClient.debug = null
        this.stompClient.connect({}, this.onConnected, this.onError);
    };


    onConnected = () => {
        this.stompClient.subscribe(
            "/user/" + this.props.userId + "/queue/messages",
            this.onNotificationReceived
        );
    };

    onError = (err) => {
        console.log(err);
    };

    onNotificationReceived = (msg) => {
        // получили уведомление
        const notification = JSON.parse(msg.body);
        if (notification.deleted) { // об удалении
            let newMessages = this.props.messages.filter(el => el.id !== notification.id)
            this.props.setMessages(newMessages)
        } else if (notification.updated) { // об обновлении
            api.getMessage(notification.id)
                .then((message) => {
                    let content = message.content
                    let newMessages = this.props.messages.map(el => {
                        if (el.id === notification.id) el.content = content
                        return el
                    })
                    this.props.setMessages(newMessages);
                })
        } else { // о новом сообщении
            api.getMessage(notification.id)
                .then((message) => {
                    if (message.senderName === this.props.recipient || message.senderName === this.props.login) {
                        this.props.updateMessages(message);
                    }
                })
        }
    };

    sendMessage = (formData, dispatch) => {
        api.getUser(this.props.recipient)
            .then(data => {
                let msg = formData.text
                if (msg.trim() !== "") {
                    const message = {
                        senderId: this.props.userId,
                        recipientId: data.id,
                        senderName: this.props.login,
                        recipientName: this.props.recipient,
                        content: msg,
                        timestamp: new Date(),
                    }
                    this.stompClient.send("/app/chat", {}, JSON.stringify(message));

                }
            })
        dispatch(reset("messages"))
    }

    deleteMessage = (id, recipient) => {
        this.stompClient.send("/app/chat/delete", {}, JSON.stringify({
            id,
            recipient
        }))
        let newMessages = this.props.messages.filter(el => el.id !== id)
        this.props.setMessages(newMessages)
    }

    editMessage = (id, recipient, content) => {
        this.stompClient.send("/app/chat/edit", {}, JSON.stringify({
            id,
            recipient,
            content
        }))
        let newMessages = this.props.messages.map(el => {
            if (el.id === id) el.content = content
            return el
        })
        this.props.setMessages(newMessages);

    }

    render() {
        return (
            <>
                {this.props.isLoadingApp ? <Preloader/> :
                    <App sendMessage={this.sendMessage}
                         deleteMessage={this.deleteMessage}
                         editMessage={this.editMessage}/>
                }
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)

// export const stompClient = AppContainer.stompClient