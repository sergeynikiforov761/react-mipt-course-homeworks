import React from "react";
import css from './Preloader.module.css';

export function Preloader(props) {
    return (
        <div className={css.main}>
                <span>Загрузка...</span>
        </div>


    );
}