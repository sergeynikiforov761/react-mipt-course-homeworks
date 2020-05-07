import React from 'react';
import d from './Dashboard.module.css'


class Dashboard extends React.Component {

    // componentDidMount() {
    //     let boardId = this.props.match.params.boardId;
    //if (!boardId)boardId=1;
    // }

    render() {
//TODO: video 57
        // if(!props.dashboard){
        //     return <Preloader />
        //
        // }

        return <div className={d.content}>
            Hi {this.props.name}?
        </div>
    }
}

export default Dashboard;