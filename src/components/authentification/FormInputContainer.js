import React from "react"
import {setIsWrongAuth, setIsWrongEmail, setIsWrongLogin} from "../../redux/reducers/authReducer";
import {connect} from "react-redux";
import FormInput from "./FormInput";


const mapStateToProps = (state) => {
    return {
        isWrongAuth: state.auth.isWrongAuth,
        isWrongLogin: state.auth.isWrongLogin,
        isWrongEmail: state.auth.isWrongEmail
    }
}

const mapDispatchToProps = {
    setIsWrongAuth,
    setIsWrongEmail,
    setIsWrongLogin
}

class FormInputContainer extends React.Component {
    render() {
        return (
            <FormInput input={this.props.input}
                       meta={this.props.meta}
                       isWrongAuth={this.props.isWrongAuth}
                       isWrongLogin={this.props.isWrongLogin}
                       isWrongEmail={this.props.isWrongEmail}
                       setIsWrongAuth={this.props.setIsWrongAuth}
                       setIsWrongLogin={this.props.setIsWrongLogin}
                       setIsWrongEmail={this.props.setIsWrongEmail}
                       {...this.props}/>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormInputContainer)