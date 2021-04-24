import React from "react";
import App from "./App";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import {reset} from "redux-form";
import {setMessages, updateMessages} from "../redux/reducers/messagesReducer";
import {setCurrentUser} from "../redux/reducers/authReducer";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return ({
        userId: state.auth.id,
        recipient: state.messagesPage.recipient,
        login: state.auth.login,
        isLoggedIn: state.auth.isLoggedIn,
        messages: state.messagesPage.messages
    })
}

const mapDispatchToProps = {
    updateMessages,
    setMessages,
    setCurrentUser
}


class AppContainer extends React.Component {
    componentDidMount() {
        axios.get("http://dimahoperskiy.ru:8092/users/profile", {withCredentials: true})
            .then(response => {
                this.props.setCurrentUser(response.data.login, response.data.email, response.data.id)
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
        let sock = new SockJS("http://dimahoperskiy.ru:8092/ws");
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
        debugger
        // получили уведомление
        const notification = JSON.parse(msg.body);
        if (notification.deleted) { // об удалении
            let newMessages = this.props.messages.filter(el => el.id !== notification.id)
            this.props.setMessages(newMessages)
        } else if (notification.updated) { // об обновлении
            axios.get("http://dimahoperskiy.ru:8092/messages/" + notification.id)
                .then((message) => {
                    let content = message.data.content
                    let newMessages = this.props.messages.map(el => {
                        if (el.id === notification.id) el.content = content
                        return el
                    })
                    this.props.setMessages(newMessages);
                })
        } else { // о новом сообщении
            debugger
            axios.get("http://dimahoperskiy.ru:8092/messages/" + notification.id)
                .then((message) => {
                    debugger
                    this.props.updateMessages(message.data);
                    debugger
                })
        }
    };

    sendMessage = (formData, dispatch) => {
        axios.get("http://dimahoperskiy.ru:8092/users/" + this.props.recipient)
            .then(response => {
                debugger
                let msg = formData.text
                if (msg.trim() !== "") {
                    const message = {
                        senderId: this.props.userId,
                        recipientId: response.data.id,
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
        return <App sendMessage={this.sendMessage}
                    deleteMessage={this.deleteMessage}
                    editMessage={this.editMessage}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)

// export const stompClient = AppContainer.stompClient