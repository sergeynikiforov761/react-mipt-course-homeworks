import React from "react";
import css from './CreateBoard.module.css';
import {customHistory} from "../../App";
import InputErrorValidation from "../../images/InputErrorValidationImage";
import {ErrorMessage} from "../Errors/ErrorMessage/ErrorMessage";

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
            errorMessage: ''
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
            .catch(error => console.log(error.message));

        fetch('/dictionaries/board-icons')
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({
                    formGet: {
                        ...this.state.formGet,
                        icon: response
                    }
                });
            })
            .catch(error => console.log(error.message));
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
        })
    };

    onChangeCategoryAndIcon = (event) => {
        if (event) {
            event.preventDefault();
        }

        if (event.target.name === "category") {
            this.setState({
                formPost: {
                    ...this.state.formPost,
                    category: {
                        key: this.helperOnChangeCategoryAndIcon(event),
                        value: event.target.value,
                    }
                }
            })
        }

        if (event.target.name === "icon") {
            this.setState({
                formPost: {
                    ...this.state.formPost,
                    icon: {
                        key: this.helperOnChangeCategoryAndIcon(event),
                        value: event.target.value,
                    }
                }
            })
        }
    };

    helperOnChangeCategoryAndIcon = (event) => {      //Данная функция ищет ищет ключи тех обьектов чье значение совпадает с значением нашего поля"
        if (event.target.name === 'category') {
            for (let i = 0; i < this.state.formGet.category.length; i++) {
                if (this.state.formGet.category[i].value === event.target.value) {
                    return this.state.formGet.category[i].key;
                }
            }
        }

        if (event.target.name === 'icon') {
            for (let i = 0; i < this.state.formGet.icon.length; i++) {
                if (this.state.formGet.icon[i].value === event.target.value) {
                    return this.state.formGet.icon[i].key;
                }
            }
        }
    };

    checkLifeToken = () => {
        if (JSON.parse(localStorage.getItem('TOKEN')).accessTokenExpiresIn > Date.now()) {
            return Promise.resolve();
        } else {
            return fetch('/auth/update-tokens', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({refreshToken: JSON.parse(localStorage.getItem('TOKEN')).refreshToken})
            })
                .then(response => response.json())
                .then(response => {
                    localStorage.removeItem('TOKEN');
                    localStorage.setItem('TOKEN', JSON.stringify(response));
                })
                .catch(error => {
                    localStorage.removeItem('TOKEN');
                    console.log(error.message);
                })
        }
    };

    onSubmit = () => {
        this.checkLifeToken()
            .then(() => {
                return fetch('/board', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('TOKEN')).accessToken,
                    },
                    body: JSON.stringify(this.state.formPost)
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.status !== 200) {
                    this.setState({errorMessage: response.message});
                } else {
                    return customHistory.push('/dashboard');
                }
            })
            .catch(error => {
                console.log("error ", error);
                this.setState({errorMessage: error.message});
            })
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
                            <div className={css.form_group}>
                                <label htmlFor="title">Title:</label>
                                <input type="text" className={css.form_control} name='title'
                                       value={this.state.formPost.title}
                                       onChange={this.onChange}
                                       placeholder="Title"/>
                            </div>
                            <div className={css.form_group}>
                                <label htmlFor="key">Key:</label>
                                <input type="text" className={css.form_control} name='key'
                                       value={this.state.formPost.key} onChange={this.onChange}
                                       placeholder="Key"/>
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