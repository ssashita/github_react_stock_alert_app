import React, { Component } from "react"
import { connect } from "react-redux"
import ProviderContext from "../components/ProviderContext"

const AppContext = ProviderContext.context;

const mapStateToProps = (state, ownProps) => {
    
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps, null, { context: AppContext })((props) => {
    
})