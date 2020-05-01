import React from "react";
import {Register} from "./Register";

class RegisterContainer extends React.Component {

    componentDidMount() {

    }

    render() {
return <Register {...this.props} />
    }

}

export default RegisterContainer;