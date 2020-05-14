import React from "react";
import Typography from "@material-ui/core/Typography";
import "./styles/Board.css"
import Container from "@material-ui/core/Container";

class BoardsPageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const proxy = "https://react-mipt-course-server.herokuapp.com";
        let image = `${proxy}${this.props.icon.value}`;
        return <div className="MainBoard">
            <Container className="Card">
                <div className="Typography">
                    <Typography variant="h6">
                        {`Title: ${this.props.title}`}
                    </Typography>
                </div>
                <div className="Typography">
                    <Typography variant="h6">
                        {`Key: ${this.props.boardKey}`}
                    </Typography>
                </div>
                <div className="Typography">
                    <Typography variant="h6">
                        Category
                        <Typography className="TypographyLocal" variant="h6">
                            {`Key: ${this.props.category.key}`}
                        </Typography>
                        <Typography variant="h6">
                            {`Value: ${this.props.category.value}`}
                        </Typography>
                    </Typography>
                </div>
                <div className="Typography">
                    <Typography variant="h6">
                        Owner
                        <Typography className="TypographyLocal" variant="h6">
                            {`Id: ${this.props.owner._id}`}
                        </Typography>
                        <Typography className="TypographyLocalBottom" variant="h6">
                            {`Name: ${this.props.owner.name}`}
                        </Typography>
                        <Typography variant="h6">
                            {`Email: ${this.props.owner.email}`}
                        </Typography>
                    </Typography>
                </div>
                <div className="Typography">
                    <img src={image} alt="new">
                    </img>
                </div>
            </Container>
        </div>
    }
}

export default BoardsPageComponent;