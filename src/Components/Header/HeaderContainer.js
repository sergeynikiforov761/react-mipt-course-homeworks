import React from "react";


import {connect} from "react-redux";
import Header from "./Header";
import {getAuthUserData} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData();
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    name: state.auth.name

});



export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);