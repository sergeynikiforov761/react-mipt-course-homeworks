import React from "react";
import css from "./Dashboard.module.css";
import {customHistory} from "../../App";
import {ErrorMessage} from "../Errors/ErrorMessage/ErrorMessage";
import {Preloader} from "../Preloader/Preloader";

export class Dashboard extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            errorMessage: ''
        }
    }

    onLogout = () => {
        localStorage.removeItem('TOKEN');
        this.props.onChangeFlag(false);
        customHistory.push('/signIn')
    };

    componentDidMount() {
        this.props.isFetching(true);
        fetch('/board')
            .then(response => response.json())
            .then(response => {
                this.setState({items: response});
                this.props.isFetching(false);
            })
            .catch(error => {
                this.setState({errorMessage: error.message});
                this.props.isFetching(false);
            });
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.stateFetch === true ? <Preloader/> : null}
                </div>
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
                        <div className={css.button_and_table}>
                            <div>
                                <table className='table'>
                                    <thead>
                                    <tr className="table-active">
                                        <th scope="col"> </th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Owner</th>
                                        <th scope="col">Key</th>
                                        <th scope="col">Category</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.items.map(item => (
                                        <tr>
                                            <td className={css.td_img}>
                                                <img className={css.img} src={item.icon.value}/>
                                            </td>
                                            <td>{item.title}</td>
                                            <td>{item.owner.name}</td>
                                            <td>{item.key}</td>
                                            <td>{item.category.value}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={css.fieldButtons} onClick={() => {
                                customHistory.push('/createBoard')
                            }}>
                                <button className={css.btn}>
                                    Add field
                                </button>
                            </div>
                            {this.state.errorMessage && <ErrorMessage error={this.state.errorMessage}/>}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}