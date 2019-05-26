import React from 'react';
import { getAllTrialBalance } from '../Services/trialBalance.service';
import { Table } from 'antd';

const columns = [
    {
        title: 'Account',
        dataIndex: 'accounttitle',
        key: 'header'
    },
    {
        title: 'Debit',
        dataIndex: 'debit',
        key: 'debit',
    },
    {
        title: 'Credit',
        key: 'credit',
        dataIndex: 'credit',
    },
    {
        title: 'Type',
        key: 'type',
        dataIndex: 'type',
    },
]
class TrialBalance extends React.Component {
    state = {
        accounts: []
    }
    componentDidMount() {
        getAllTrialBalance()
            .then(res => {
                console.log(res)
                let total = res.data.data.total;
                total.accounttitle = 'Total'
                res.data.data.data.push(total);
                this.setState({
                    accounts: res.data.data.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={this.state.accounts} bordered pagination={{ pageSize: 7 }} />
            </div>
        );
    }
};

export default TrialBalance;