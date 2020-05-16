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
            category: '',
            icon: '',
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
    };

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onChangeSelectCategory = (event) => {
        this.setState({
            category: event.target.value
        });
    };

    onChangeSelectIcon = (event) => {
        this.setState({
            icon: event.target.value,
        });
    }

    render() {
        const {loading} = this.props;
        const {categoryList, iconList} = this.state;
        return <div>
            {!loading && <>
                <div>
                    <div>
                        <TextField name="title" label="Title" variant="filled" value={this.state.title}
                                   onChange={this.onChange}/>
                    </div>
                </div>
                <div>
                    <TextField name="key" label="Key" variant="filled" value={this.state.key}
                               onChange={this.onChange}/>
                </div>
                <div>
                    <Select value={this.state.category} onChange={this.onChangeSelectCategory}>
                        {categoryList.map(category => {
                            return (
                                <MenuItem value={category} key={category.key}>{category.value}</MenuItem>)
                        })}
                    </Select>
                </div>
                <div>
                    <Select value={this.state.icon} onChange={this.onChangeSelectIcon}>
                        {iconList.map(icon => (
                            <MenuItem value={icon} key={icon.key}>
                                <img width={48} height={48} src={icon.value}/>
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <Button className="CreateNewFormConfirmButton" onClick={this.onClick} variant="contained"
                        color="primary">Create</Button>
                <Route render={({history}) => (
                    <Button className="CancelButton" onClick={() => {
                        history.push('/boards')
                    }} variant="contained" color="secondary">
                        Cancel
                    </Button>
                )}/>
            </>}
            <PageWrapper loading={loading}/>
        </div>
    }
}

export const CreateBoardPage = withLoading(CreateBoardPageComponent);