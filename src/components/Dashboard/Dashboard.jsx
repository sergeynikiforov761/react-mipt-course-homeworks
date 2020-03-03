import React from "react";
import css from "./Dashboard.module.css";
import {customHistory} from "../../App";

export class Dashboard extends React.Component{
    constructor(props) {
        super(props);
    }

    onLogout = () => {
        localStorage.removeItem('TOKEN');
        this.props.onChangeFlag(false);
        customHistory.push('/signIn')
    };

    render() {
        return (
            <div className={css.dashboard}>
                <header className={css.header}>
                    <div>
                        <h1>MiniJira</h1>
                    </div>
                    <div onClick={this.onLogout}>
                        Log Out
                    </div>
                </header>
                <main className={css.main}>
                    <div className={css.buttons}>

                    </div>
                    <div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Имя</th>
                                <th scope="col">Фамилия</th>
                                <th scope="col">Username</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        );
    }
}