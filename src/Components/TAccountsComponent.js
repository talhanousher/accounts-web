import React from 'react';
import { getAllTAccounts } from '../Services/tAccounts.service';
import { Table } from 'antd';

const columns = [
    {
        title: 'Account',
        dataIndex: 'header',
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
    }
];
class TAccounts extends React.Component {
    state = {
        accounts: []
    };
    componentDidMount() {
        getAllTAccounts()
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
            <div>
                <Table columns={columns} dataSource={this.state.accounts} bordered pagination={{ pageSize: 7 }} />
            </div>
        );
    }
}

export default TAccounts;