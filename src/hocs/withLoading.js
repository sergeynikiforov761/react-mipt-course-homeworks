import React, {Component} from 'react';

export const withLoading = (Component) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: false
            };
        }

        execute = (callback) => {
            this.setState({loading: true});
            return async (...args) => {
                try {
                    return await callback(...args);
                } finally {
                    this.setState({loading: false});
                }
            }
        };

        render() {
            return <Component {...this.props}
                              loading={this.state.loading}
                              execute={this.execute}/>
        }
    }
};