import React from "react";


import {connect} from "react-redux";
import Dashboard from "./Dashboard";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {withRouter} from "react-router-dom";


class DashboardContainer extends React.Component{

    render() {
        return (
            <Dashboard {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    name: state.auth.name

});

let mapDispatchToProps = (dispatch) => ({
})

let AuthRedirectComponent = withAuthRedirect(DashboardContainer)

withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);