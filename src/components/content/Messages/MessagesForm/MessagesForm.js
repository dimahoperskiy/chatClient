import React from "react";
import {Field, formValueSelector, reduxForm} from "redux-form";
import style from "./MessagesForm.module.css"
import {connect} from "react-redux";

const MessagesForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.form}>
            <div className={style.textareaWrapper}>
                <Field placeholder="Enter your message" name="text" component="textarea" className={style.textarea}/>
            </div>

            <div className={style.btnWrapper}>
                <button type="submit" className={style.btn  + " " + (props.messageText ? style.btnActive : "")}/>
            </div>


        </form>
    )
}

const MessagesReduxForm = reduxForm({form: "messages"})(MessagesForm)

const selector = formValueSelector("messages")

const mapStateToProps = (state) => {
    return {
        messageText: selector(state, "text")
    }
}

export default connect(mapStateToProps, null)(MessagesReduxForm)