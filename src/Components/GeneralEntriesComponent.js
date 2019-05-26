import React, { Component } from 'react';
import { Button, Modal, Form, Input, Row, Col, Select, Table } from 'antd';
import { addGeneralEntry, getAllGeneralEnteries } from '../Services/generalEnteries.service';
const { Option } = Select

const columns = [
    {
        title: 'Header',
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

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="General Entry"
                    okText="Add"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Row gutter={24}>
                            <Col span={24}><h3>Debit</h3></Col>
                            <Col span={8}>
                                <Form.Item label="Header">
                                    {getFieldDecorator('debitHeader', {
                                        rules: [{ required: true, message: 'Please input the header of entry!' }],
                                    })(<Input />)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Value">
                                    {getFieldDecorator('debitValue', {
                                        rules: [{ required: true, message: 'Please input the header of entry!' }],
                                    })(<Input type="number" />)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Type" className="collection-create-form_last-form-item">
                                    {getFieldDecorator('debitType', {
                                        rules: [{ required: true, message: 'Please input the header of entry!' }],
                                        initialValue: 'asset',
                                    })(
                                        <Select>
                                            <Option value="asset">Asset</Option>
                                            <Option value="liability">Liability</Option>
                                            <Option value="owner-equity">Owner Equity</Option>
                                            <Option value="expense">Expense</Option>
                                            <Option value="revenue">Revenue</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24}><h3>Credit</h3></Col>
                            <Col span={8}>
                                <Form.Item label="Header">
                                    {getFieldDecorator('creditHeader', {
                                        rules: [{ required: true, message: 'Please input the header of entry!' }],
                                    })(<Input />)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Value">
                                    {getFieldDecorator('creditValue', {
                                        rules: [{ required: true, message: 'Please input the header of entry!' }],
                                    })(<Input type="number" />)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Type" className="collection-create-form_last-form-item">
                                    {getFieldDecorator('creditType', {
                                        rules: [{ required: true, message: 'Please input the header of entry!' }],
                                        initialValue: 'asset',
                                    })(
                                        <Select>
                                            <Option value="asset">Asset</Option>
                                            <Option value="liability">Liability</Option>
                                            <Option value="owner-equity">Owner Equity</Option>
                                            <Option value="expense">Expense</Option>
                                            <Option value="revenue">Revenue</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            );
        }
    },
);

class GeneralEntries extends Component {
    state = {
        enteries: [],
        visible: false
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        // const { setGeneralEnteries } = this.props;
        // console.log(setGeneralEnteries);
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let enteriesArray = [];
            let debitObject = {
                header: values.debitHeader,
                debit: values.debitValue,
                type: values.debitType
            }
            let creditObject = {
                header: values.creditHeader,
                credit: values.creditValue,
                type: values.creditType
            }
            enteriesArray.push(debitObject);
            enteriesArray.push(creditObject);
            addGeneralEntry(enteriesArray)
                .then(res => {
                    console.log(res);
                    let prevState = this.state.enteries;
                    prevState.push(res.data.data.debitEntry);
                    prevState.push(res.data.data.creditEntry);
                    this.setState({
                        enteries : [...prevState]
                    })
                })
                .catch(err => {
                    console.log(err);
                });
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    componentDidMount() {
        getAllGeneralEnteries()
            .then(res => {
                console.log(res.data.data);
                this.setState({
                    enteries: res.data.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Add Entry
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Table columns={columns} dataSource={this.state.enteries} bordered pagination={{ pageSize: 7 }} />
            </div>
        );
    }
}

export default GeneralEntries