import React from "react"
import Messages from "./Messages";
import {
    setRecipient,
    updateMessages,
    setDialogs,
    setIsConnected,
    setMessages,
    setIsDialogActive
} from "../../../redux/reducers/messagesReducer";
import {setCurrentUser} from "../../../redux/reducers/authReducer";
import {connect} from "react-redux";
import axios from "axios";
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => {
    return ({
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
        userId: state.auth.id,
        login: state.auth.login,
        recipient: state.messagesPage.recipient,
        isConnected: state.messagesPage.isConnected,
        isDialogActive: state.messagesPage.isDialogActive
    })
}

const mapDispatchToProps = {
    setRecipient,
    updateMessages,
    setDialogs,
    setIsConnected,
    setMessages,
    setCurrentUser,
    setIsDialogActive
}

class MessagesContainer extends React.Component {
    componentDidMount() {
        if (this.props.match.params.recipient === undefined) {
            this.props.setIsDialogActive(false)
            this.props.setMessages([])
        } else {
            this.props.setIsDialogActive(true)
        }

        axios.get("http://dimahoperskiy.ru:8092/users/profile", {withCredentials: true})
            .then(response1 => {
                this.props.setCurrentUser(response1.data.login, response1.data.email, response1.data.id)
                axios.get("http://dimahoperskiy.ru:8092/users/")
                    .then(response2 => {
                        let resp = response2.data.content.filter(el => {
                            if (el.login === this.props.match.params.recipient) {
                                let id = el.id
                                axios.get("http://dimahoperskiy.ru:8092/messages/" + id + "/" + this.props.userId)
                                    .then(response3 => {
                                        this.props.setMessages(response3.data)
                                    })
                            }
                            return el.login !== this.props.login
                        })
                        this.props.setDialogs(resp)
                        // this.props.toggleIsFetching(false)
                    })
            })

        this.props.setRecipient(this.props.match.params.recipient)

    }

    setRecipient = (name, id) => {
        this.props.setIsDialogActive(true)
        axios.get("http://dimahoperskiy.ru:8092/messages/" + id + "/" + this.props.userId)
            .then(response => {
                this.props.setMessages(response.data)
            })
        this.props.setRecipient(name)
    }




    render() {
        return <Messages dialogs={this.props.dialogs}
                         messages={this.props.messages}
                         login={this.props.login}
                         recipient={this.props.recipient}
                         userId={this.props.userId}
                         setRecipient={this.setRecipient}
                         isDialogActive={this.props.isDialogActive}
                         deleteMessage={this.props.deleteMessage}
                         sendMessage={this.props.sendMessage}
                         editMessage={this.props.editMessage}/>
    }
}

let MessagesContainerRouter = withRouter(MessagesContainer)

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainerRouter)

// export default MessagesContainer