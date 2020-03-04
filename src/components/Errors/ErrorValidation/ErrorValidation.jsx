import React from "react";
import css from './ErrorValidation.module.css'


export function ErrorValidation(props) {
    console.log('props: ', props);

    return (
        <div className={css.main}>
            {props.error}
        </div>
    );
}