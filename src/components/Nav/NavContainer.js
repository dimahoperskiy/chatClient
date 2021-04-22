import React from 'react'
import {connect} from "react-redux";
import Nav from "./Nav";

const mapStateToProps = (state) => {
    return ({
        isLoggedIn: state.auth.isLoggedIn
    })
}

const NavContainer = connect(mapStateToProps, null)(Nav)

export default NavContainer