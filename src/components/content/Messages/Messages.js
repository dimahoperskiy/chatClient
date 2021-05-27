import React from "react"
import style from "./Messages.module.css"
import MessagesForm from "./MessagesForm/MessagesForm";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import {useRef, useEffect} from "react"

const Messages = (props) => {
    const refer = useRef(null)
    const scroll = () => {
        if (refer.current !== null) {
            refer.current.scrollIntoView();
        }

    }
    useEffect(() => {
        scroll()
    })

    let dialogs = props.dialogs.map(el => <Dialog name={el.login} id={el.id} userId={props.userId} setRecipient={props.setRecipient}/>)
    // let cnt = 1
    let messages = props.messages.map(msg => {
        return <Message content={msg.content}
                        login={props.login}
                        msgId={msg.id}
                        userId={props.userId}
                        senderId={msg.senderId}
                        senderName={msg.senderName}
                        recipient={props.recipient}
                        deleteMessage={props.deleteMessage}
                        editMessage={props.editMessage}/>
    })
    return (
        <div className={style.messagesWrapper}>
            <h1>Messages</h1>
            <div className={style.messages}>
                <div className={style.dialogsItems}>
                    {dialogs}
                </div>

                {props.isDialogActive ?
                    <div className={style.messagesItems}>
                        <div className={style.innerWrapper}>
                            <div className={style.messagesContent}>
                                {messages}
                                <div ref={refer}/>
                            </div>
                            <div>
                                <p className={style.recipient}>{props.recipient}</p>
                            </div>
                        </div>
                        <div className={style.insertMessage}>
                            <MessagesForm onSubmit={props.sendMessage}/>
                        </div>
                    </div> :

                    <div className={style.messagesItemsChoose}>
                        <h2>Choose a dialog</h2>
                    </div>
                }

            </div>
        </div>
    );
}

export default Messages