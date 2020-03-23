import React from "react";
import css from "./Dashboard.module.css";
import {customHistory} from "../../App";
import {ErrorMessage} from "../Errors/ErrorMessage/ErrorMessage";
import {Preloader} from "../Preloader/Preloader";
import {boardGetRequest} from "../../service/board";
import {Footer} from "../Footer/Footer";

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            errorMessage: '',
            page: 0,
            amount: 5
        }
    }

    onLogout = () => {
        localStorage.removeItem('TOKEN');
        this.props.onChangeFlag(false);
        customHistory.push('/signIn')
    };

    componentDidMount() {
        this.props.isFetching(true);
        boardGetRequest()
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
                {(this.props.stateFetch === true) ?
                    <Preloader/> :
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
                            <div className={css.buttons_and_table}>
                                <table className={'table' + ' ' + css.table}>
                                    <thead>
                                    <tr className="table-active">
                                        <th></th>
                                        <th>Title</th>
                                        <th>Owner</th>
                                        <th>Key</th>
                                        <th>Category</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.items.slice(this.state.page * this.state.amount, (this.state.page + 1) * this.state.amount).map(item => {
                                        return <tr>
                                            <td className={css.td_img}>
                                                <img className={css.img} src={item.icon.value}/>
                                            </td>
                                            <td>{item.title}</td>
                                            <td>{item.owner.name}</td>
                                            <td>{item.key}</td>
                                            <td>{item.category.value}</td>
                                        </tr>

                                    })}
                                    </tbody>
                                </table>

                                <div className={css.buttons}>
                                    <div className={css.add_field}>
                                        <button className={css.btn} onClick={() => {
                                            customHistory.push('/createBoard')
                                        }}>
                                            Add field
                                        </button>
                                    </div>
                                    <div className={css.previous_next}>
                                        <button className={css.btn + ' ' + css.btn_prev_next + ' ' + css.btn_prev}
                                                onClick={() => {
                                                    this.setState({page: Math.max(this.state.page - 1, 0)})
                                                }}>
                                            <div className={css.svg_prev_next}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    x="0"
                                                    y="0"
                                                    enableBackground="new 0 0 477.175 477.175"
                                                    version="1.1"
                                                    viewBox="0 0 477.175 477.175"
                                                    xmlSpace="preserve"
                                                >
                                                    <path
                                                        d="M145.188 238.575l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1l-215.4-215.5z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                Previous
                                            </div>
                                        </button>
                                        <button className={css.btn + ' ' + css.btn_prev_next + ' ' + css.btn_next}
                                                onClick={() => {
                                                    this.setState({page: Math.min(this.state.page + 1, Math.floor(this.state.items.length / 5))})
                                                }}>
                                            <div>
                                                Next
                                            </div>
                                            <div className={css.svg_prev_next}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    x="0"
                                                    y="0"
                                                    enableBackground="new 0 0 477.175 477.175"
                                                    version="1.1"
                                                    viewBox="0 0 477.175 477.175"
                                                    xmlSpace="preserve"
                                                >
                                                    <path
                                                        d="M360.731 229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8.1-19z"></path>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                {this.state.errorMessage && <ErrorMessage error={this.state.errorMessage}/>}
                            </div>
                        </main>
                        <Footer/>
                    </div>
                }
            </div>
        );
    }
}