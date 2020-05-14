import React from 'react';
import {boards} from "../../service/boards";
import {withLoading} from "../../hocs/withLoading";
import {PageWrapper} from "../PageWrapper";
import Board from "./Board";
import {Button} from "@material-ui/core";
import {Route} from "react-router-dom";
import "./styles/Board.css"

class BoardsPageComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            boards: [],
            isLoading: false
        }
    }

    componentDidMount() {
        const {execute} = this.props;
        execute(boards)()
            .then(boards => {
                this.setState({boards});
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        const {boards} = this.state;
        const {loading} = this.props;

        return <div>
            <div>
                <div className="LogOutButton">
                    {!loading ? <Route render={({history}) => (
                        <Button className="SignUpButton" onClick={() => {
                            localStorage.removeItem('AUTH');
                            this.props.auth(null);
                            history.push('/login');
                        }} variant="contained" color="secondary">
                            Log out
                        </Button>
                    )}/> : null}
                </div>
                {!loading ? <h2>Boards</h2> : null}
                <div className="CreateNewForm">
                    {!loading ? <Route render={({history}) => (
                        <Button onClick={() => {
                            history.push('/create-board')
                        }} variant="contained" color="primary">
                            Create New Board
                        </Button>
                    )}/> : null}
                </div>
            </div>
            <PageWrapper loading={loading}/>
            {boards.map(boards => {
                return (<Board title={boards.title}
                               boardKey={boards.key}
                               category={boards.category}
                               icon={boards.icon}
                               owner={boards.owner}>
                </Board>)
            })}
        </div>
    }
}


export const BoardsPage = withLoading(BoardsPageComponent);