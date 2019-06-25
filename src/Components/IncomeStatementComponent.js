import React, { Component } from 'react';
import { getIncomeStatement } from '../Services/incomeStatement.service';

class IncomeStatement extends Component {
    componentDidMount() {
        getIncomeStatement()
            .then(res => {
                console.log(res);
                this.setState({
                    accounts: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>IncomeStatement</div>
        );
    };
};

export default IncomeStatement;