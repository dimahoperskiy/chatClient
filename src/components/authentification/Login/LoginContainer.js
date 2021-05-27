import React from "react";
import Login from "./Login";
import {loginThunk} from "../../../redux/reducers/authReducer";
import {connect} from "react-redux";

const mapStateToProps = () => {}

let mapDispatchToProps = {
    loginThunk
}

class LoginContainer extends React.Component {
    render() {
        return <Login onSubmit={this.props.loginThunk}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)