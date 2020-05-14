import React, {Component} from "react";
import {Button, TextField} from "@material-ui/core";
import {withLoading} from "../../hocs/withLoading";
import {createBoard, getCategories, getIcons} from "../../service/boards";
import {Route} from "react-router-dom";
import {PageWrapper} from "../PageWrapper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


class CreateBoardPageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            key: '',
            categoryValue: '',
            categoryKey: '',
            iconValue: '',
            iconKey: '',
            categoryList: [],
            iconList: []
        }
    }

    componentDidMount() {
        const {execute} = this.props;
        execute(getCategories)()
            .then(result => {
                this.setState({categoryList: result});
            })
            .catch(err => {
                console.log(err);
            });
        execute(getIcons)()
            .then(result => {
                this.setState({iconList: result});
            })
            .catch(err => {
                console.log(err);
            });
    }

    onClick = () => {
        let body = this.state;
        createBoard(body).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onChangeSelectCategory = (event) => {
        this.setState({
            categoryValue: event.target.value.value,
            categoryKey: event.target.value.key
        });
    }

    onChangeSelectIcon = (event) => {
        this.setState({
            iconValue: event.target.value.value,
            iconKey: event.target.value.key
        },  []);
        console.log(this.state);
    }

    render() {
        const {loading} = this.props;
        const {categoryList, iconList, iconValue} = this.state;
        const proxy = "https://react-mipt-course-server.herokuapp.com";
        return <div>
            {!loading ? <div>
                <div>
                    <TextField name="title" label="Title" variant="filled" value={this.state.title}
                               onChange={this.onChange}/>
                </div>
            </div> : null}
            {!loading ? <div>
                <TextField name="key" label="Key" variant="filled" value={this.state.key}
                           onChange={this.onChange}/>
            </div> : null}
            {!loading ?
                <Select value={this.state.categoryValue} onChange={this.onChangeSelectCategory}>
                    {categoryList.map(categoryList => {
                        return (
                            <MenuItem value={categoryList} key={categoryList.key}>{categoryList.value}</MenuItem>)
                    })}
                </Select> : null}
            {!loading ?
                <Select value={this.state.iconKey} onChange={this.onChangeSelectIcon}>
                    {iconList.map(iconList => {
                        return (
                            <MenuItem value={iconList} key={iconList.key}>{iconList.key}</MenuItem>)
                    })}
                </Select> : null}
            {iconValue !== '' ? <img src={`${proxy}${this.state.iconValue}`} alt="new"> </img> : null}
            {!loading ? <div>
                <Button className="CreateNewFormConfirmButton" onClick={this.onClick} variant="contained"
                        color="primary">Create</Button>
                <Route render={({history}) => (
                    <Button className="CancelButton" onClick={() => {
                        history.push('/boards')
                    }} variant="contained" color="secondary">
                        Cancel
                    </Button>
                )}/>
            </div> : null}
            <PageWrapper loading={loading}/>
        </div>
    }
}

export const CreateBoardPage = withLoading(CreateBoardPageComponent)