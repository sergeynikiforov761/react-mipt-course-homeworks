import React from "react";
import css from './ErrorMessage.module.css';
import Img1 from "../../../images/Img1";

export function ErrorMessage(props) {
    return (
        <div className={css.main}>
            {props.error}
        </div>
    );
}