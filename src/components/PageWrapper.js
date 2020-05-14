import React from "react";
import Loader from "./Loader";

export const PageWrapper = ({loading}) => {
    return <div>
        {loading && <Loader/>}
    </div>
}