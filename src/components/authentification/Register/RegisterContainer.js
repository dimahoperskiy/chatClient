import React from "react"
import {connect} from "react-redux";
import Register from "./Register";
import {registerThunk} from "../../../redux/reducers/authReducer";

const mapStateToProps = () => {}

const mapDispatchToProps = {
    registerThunk
}

class RegisterContainer extends React.Component {
    render() {
        return (
            <Register onSubmit={this.props.registerThunk}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)