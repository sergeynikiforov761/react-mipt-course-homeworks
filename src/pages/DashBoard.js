import React from "react";
import { Button } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function DashBoard(props) {
    const { setAuthTokens } = useAuth();

    function logOut() {
        setAuthTokens();
    }

    return (
        <div>
            <div>DashBoard Page</div>
            <Button onClick={logOut}>Log out</Button>
        </div>
    );
}

export default DashBoard;