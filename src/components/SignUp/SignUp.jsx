import React from "react";
import css from "./SignUp.module.css";
import {customHistory} from "../../App";

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: '',
                email: '',
                password: '',
                repeatPassword: ''
            },
        }
    }

    onChange = (event) => {  //Как стрелочная функция заменяет bind();
        this.setState({
            form: {
                ...this.state.form,     //Еще раз про спред оператор
                [event.target.name]: event.target.value     //Почему ставим квадратные скобки
            }
        });
        console.log('this.state.form: ', this.state.form);
    };

    onSubmit = (event) => {
        if(event) {
            event.preventDefault(); //Что еще интересно можно узнать про методы событий
        }

      fetch('/auth/register', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(this.state.form)
      })
          .then(response => response.json())
          .then(response => {
              console.log(response);
              if(!response.status){
                  localStorage.setItem('TOKEN', response.accessToken);
                  this.props.onChangeFlag(true);
                  customHistory.push('/dashboard');
              } else {
                  console.log('ERROR: ', response);
              }
          })
          .catch(error => console.log('ERROR: ', error.message));
    };

    render() {
        return (
            <div className={css.sign_up}>
                <header className={css.header}>
                    <div>
                        <h1>MiniJira</h1>
                    </div>
                    <div onClick={() => {
                        customHistory.push('/signIn')
                    }}>
                        Sign In
                    </div>
                </header>
                <main className={css.main}>
                    <div className={css.form_block}>
                        <div className={css.title_form}>
                            Sign Up
                        </div>
                        <form className={css.form} onSubmit={this.onSubmit}>    {/*Почему onSubmit пишем здесь а не у кнопки, как он понимает к какой из кнопки относится это событие*/}
                            <div className={css.form_group}>
                                <label htmlFor="firstName">First name:</label>
                                <input type="text" className={css.form_control} name='name' value={this.state.form.name} onChange={this.onChange}
                                       placeholder="First name"/>
                            </div>
                            <div className={css.form_group}>
                                <label htmlFor="email">Email address:</label>
                                <input type="email" className={css.form_control} name='email' value={this.state.form.email} onChange={this.onChange}
                                       placeholder="Email address"/>
                            </div>
                            <div className={css.form_group}>
                                <label htmlFor="password">Password:</label>
                                <input type="password" className={css.form_control} name='password' value={this.state.form.password} onChange={this.onChange}
                                       placeholder="Password"/>
                            </div>
                            <div className={css.form_group}>
                                <label htmlFor="repeatPassword">Repeat password:</label>
                                <input type="password" className={css.form_control} name='repeatPassword' value={this.state.form.repeatPassword} onChange={this.onChange}
                                       placeholder="Repeat password"/>
                            </div>
                            <div className={css.buttons}>
                                <button type="submit" className={css.btn}>Send</button>
                                <button type="submit" className={css.btn}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}