import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return <header className={s.header}>
        <table style={{width:'100%'}}>
            <th>
                <div>
                    My Jira
                </div>
            </th>
            <th  style={{textAlign: 'right'}}>
                <div>
                    {props.isAuth
                        ? <NavLink to="/logout" activeClassName="active">Logout</NavLink>
                        : <NavLink to="/register" activeClassName="active">Register</NavLink>
                        }


                </div>
            </th>
        </table>

    </header>
}

export default Header;