import React from "react";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {connect} from "react-redux";
import style from "./Message.module.css"
import TextArea from "./TextArea";





const EditForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={style.editForm}>
            <div>
                <Field placeholder="Edit your message"
                       className={style.textarea}
                       name="text"
                       defaultValue={props.message}
                       component={TextArea}/>
            </div>

            <div className={style.formButtons}>
                <div>
                    <button type="submit">✔</button>
                    {/*<button type="submit" className={style.btn  + " " + (props.messageText ? style.btnActive : "")}/>*/}
                </div>
                <div>
                    <button onClick={props.close}>❌</button>
                    {/*<button type="submit" className={style.btn  + " " + (props.messageText ? style.btnActive : "")}/>*/}
                </div>
            </div>

        </form>
    )
}

const EditReduxForm = reduxForm({form: "edit"})(EditForm)

const selector = formValueSelector("edit")

const mapStateToProps = (state) => {
    return {
        messageText: selector(state, "text")
    }
}

export default connect(mapStateToProps, null)(EditReduxForm)