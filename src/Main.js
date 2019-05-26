import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './App.css';
const GeneralEntries = React.lazy(() => import('./Components/generalEntriesComponent'));
const TAccounts = React.lazy(() => import('./Components/TAccountsComponent'));
const TrialBalance = React.lazy(() => import('./Components/TrialBalanceComponent'));
const { Header, Sider, Content } = Layout;

class Main extends React.Component {
    state = {
        collapsed: false,
        title: 'Accounts'
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        if (this.state.collapsed) {
            this.setState({
                title: 'Accounts'
            })
        } else {
            this.setState({
                title: 'A'
            })
        }
    };

    render() {
        let defaultSelected = '';
        if(window.location.pathname === '/general/entries'){
            defaultSelected = '1';
        }else{
            if(window.location.pathname === '/t/accounts'){
                defaultSelected = '2';
            }else{
                if(window.location.pathname === '/trial/balance'){
                    defaultSelected = '3';
                }
            }
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" style={{
                        height: '85px',
                        color: 'white',
                        width: '70%',
                           margin: '0 auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontFamily: 'sans-serif',
                        letterSpacing: '5px'
                    }} >{this.state.title}</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultSelected]}>
                        <Menu.Item key="1">
                            <Link to="/general/entries">
                                <Icon type="schedule" />
                                <span>General Entries</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/t/accounts">
                                <Icon type="account-book" />
                                <span>T Accounts</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/trial/balance">
                                <Icon type="table" />
                                <span>Trial Balance</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff'
                        }}>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Route path="/general/entries" component={GeneralEntries} />
                            <Route path="/t/accounts" component={TAccounts} />
                            <Route path="/trial/balance" component={TrialBalance} />
                        </React.Suspense>
                    </Content>
                </Layout>
            </Layout >
        );
    }
}

export default Main;