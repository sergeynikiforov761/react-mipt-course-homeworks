import React from "react";
import css from './CreateBoard.module.css';
import {customHistory} from "../../App";
import {ErrorMessage} from "../Errors/ErrorMessage/ErrorMessage";
import {isEmpty} from "../../utils/isEmptyFeild";
import {ErrorValidation} from "../Errors/ErrorValidation/ErrorValidation";

export class CreateBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formGet: {
                category: [],
                icon: []
            },
            formPost: {
                title: '',
                key: '',
                category: {
                    key: '',
                    value: ''
                },
                icon: {
                    key: '',
                    value: ''
                }
            },
            errorValidation: {
                title: '',
                key: '',
            },
            errorMessage: '',
        }
    }


    componentDidMount() {
        fetch('/dictionaries/categories')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    formGet: {
                        ...this.state.formGet,
                        category: response
                    }
                });
            })
            .catch(error => {
                this.setState({errorMessage: error.message});
            });

        fetch('/dictionaries/board-icons')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    formGet: {
                        ...this.state.formGet,
                        icon: response
                    }
                });
                this.props.isFetching(false);
            })
            .catch(error => {
                this.setState({errorMessage: error.message});
                this.props.isFetching(false);
            });
    }

    onChange = (event) => {
        if (event) {
            event.preventDefault();
        }

        this.setState({
            formPost: {
                ...this.state.formPost,
                [event.target.name]: event.target.value
            }
        });
    };

    onChangeCategoryAndIcon = (event) => {
        if (event) {
            event.preventDefault();
        }

        if (event.target.name === "category") {
            this.setState({
                formPost: {
                    ...this.state.formPost,
                    category: this.state.formGet.category.find(
                        item => item.value === event.target.value
                    )
                }
            });
        }

        if (event.target.name === "icon") {
            this.setState({
                formPost: {
                    ...this.state.formPost,
                    icon: this.state.formGet.icon.find(
                        item => item.value === event.target.value
                    )
                }
            });
        }
    };

    checkLifeToken = (getToken) => {
        if (getToken.accessTokenExpiresIn > Date.now()) {
            return Promise.resolve();
        } else {
            return fetch('/auth/update-tokens', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({refreshToken: getToken.refreshToken})
            })
                .then(response => response.json())
                .then(response => {
                    localStorage.removeItem('TOKEN');
                    localStorage.setItem('TOKEN', JSON.stringify(response));
                })
                .catch(error => {
                    localStorage.removeItem('TOKEN');
                    this.setState({errorMessage: error.message});
                });
        }
    };

    onSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        let key = '';
        if (!isEmpty(this.state.formPost.key)) {
            key = 'Enter your key!';
        } else if (this.state.formPost.key !== this.state.formPost.key.toUpperCase()) {
            key = 'All letters must be uppercase';
        }
        const title = !isEmpty(this.state.formPost.title) ? 'Enter your title!' : '';

        this.setState({
            errorValidation: {
                title: title,
                key: key
            }
        });

        if (isEmpty(this.state.formPost.title) && isEmpty(this.state.formPost.key)) {
            let getToken = JSON.parse(localStorage.getItem('TOKEN'));
            this.checkLifeToken(getToken)
                .then(() => {
                    return fetch('/board', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            Authorization: 'Bearer ' + getToken.accessToken,
                        },
                        body: JSON.stringify(this.state.formPost)
                    })
                })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else return Promise.reject();
                })
                .then(() => {
                    customHistory.push('/dashboard');
                })
                .catch(error => {
                    this.setState({
                        errorMessage: error.message
                    });
                });
        }
    };

    render() {
        return (
            <div className={css.create_board}>
                <header className={css.header}>
                    <div>
                        <h1>MiniJira</h1>
                    </div>
                    <div onClick={() => {
                        customHistory.push('/dashboard')
                    }}>
                        Back
                    </div>
                </header>
                <main className={css.main}>
                    <div className={css.form_block}>
                        <form className={css.form}
                              onSubmit={this.onSubmit}>    {/*Почему onSubmit пишем здесь а не у кнопки, как он понимает к какой из кнопки относится это событие*/}
                            <div className={css.form_group}>    {/*Первое поле*/}
                                <label htmlFor="title">Title:</label>
                                <input type="text" className={css.form_control} name='title'
                                       value={this.state.formPost.title}
                                       onChange={this.onChange}
                                       placeholder="Title"/>
                                {this.state.errorValidation.title &&
                                <ErrorValidation error={this.state.errorValidation.title}/>}
                            </div>
                            <div className={css.form_group}>       {/*Второе поле*/}
                                <label htmlFor="key">Key:</label>
                                <input type="text" className={css.form_control} name='key'
                                       value={this.state.formPost.key} onChange={this.onChange}
                                       placeholder="Key"/>
                                {this.state.errorValidation.key &&
                                <ErrorValidation error={this.state.errorValidation.key}/>}
                            </div>
                            <div className={css.form_group}>   {/*Третье поле*/}
                                <label htmlFor="category">Categories:</label>
                                <select className={css.form_control} value={this.state.formPost.category.value}
                                        onChange={this.onChangeCategoryAndIcon} name="category">
                                    {this.state.formGet.category.map(item => {
                                        return <option>{item.value}</option>
                                    })}
                                </select>
                            </div>
                            <div className={css.form_group}>   {/*Четвертое поле*/}
                                <label htmlFor="icon">Icons:</label>
                                <select className={css.form_control} value={this.state.formPost.icon.value}
                                        onChange={this.onChangeCategoryAndIcon} name="icon">
                                    {this.state.formGet.icon.map(item => {
                                        return <option>{item.value}</option>
                                    })}
                                </select>
                            </div>
                            <div className={css.buttons}>
                                <button type="submit" className={css.btn}>Add</button>
                                <button type="submit" className={css.btn}>Cancel</button>
                            </div>
                            {this.state.errorMessage && <ErrorMessage error={this.state.errorMessage}/>}
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}