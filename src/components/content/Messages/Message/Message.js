import React from "react";
import style from "./Message.module.css"
import Popup from "reactjs-popup";
import EditForm from "./EditForm";
import img from "../../../common/mike.png"

const Message = (props) => {
    let deleteMessage = func => () => {
        props.deleteMessage(props.msgId, props.recipient)
        func()
    }

    let editMessage = func => (values) => {
        props.editMessage(props.msgId, props.recipient, values.text)
        func()
    }

    return (
        <div className={style.message}>
            <div className={style.messageContent}>
                <img
                    src={img}
                    alt="ava" className={style.ava}/>
                <div className={style.content}>
                    <h4>{props.senderName}</h4>
                    <p className={style.messageText}>{props.content}</p>
                </div>
            </div>
            {props.senderName === props.login &&
                <div className={style.spanContent}>
                    <Popup trigger={<span className={style.edit}>✏️</span>}
                           position="left center"
                           closeOnDocumentClick>
                        {close => (
                            <div className={style.popup}>
                                <p className={style.editLabel}>Edit message</p>
                                <EditForm onSubmit={editMessage(close)} close={close} message={props.content}/>
                            </div>
                        )}
                    </Popup>
                    <Popup trigger={<span className={style.delete}>❌</span>}
                           position="left center"
                           closeOnDocumentClick>
                        {close => (
                            <div className={style.popup}>
                                <p>Delete message?</p>
                                <div className={style.spans}>
                                    <span onClick={deleteMessage(close)}>✔️</span>
                                    <span onClick={close}>❌</span>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            }
        </div>

    );

}


export default Message