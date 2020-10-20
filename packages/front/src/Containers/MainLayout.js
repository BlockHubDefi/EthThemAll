import React, { Fragment, useState } from 'react';
import 'antd/dist/antd.css';
import './mainLayout.css';
import { Layout, Menu, Breadcrumb, Button, Input, notification } from 'antd';
import { Row, Col } from 'antd';
import {
    PieChartOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;
//const { SubMenu } = Menu;

function MainLayout(props) {
    const [collapsed, setCollapsed] = useState(false);
    const [web3connected, setWeb3connected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('0x0000');

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const openNotification = (title, text) => {
        notification.open({
          message: title,
          description: text
        });
      };

    const onSearch = value => {
        try {
            const address = ethers.utils.getAddress(value);
            setWalletAddress(address);
            openNotification('Success', `Address successfully changed to ${address}`);
        } catch (e) {
            //console.error('invalid ethereum address', e.message);
            openNotification('Error', `Address is invalid`);
        }
    };

    const loadWeb3Provider = async () => {
        try {
            if (web3connected) return;

            const providerOptions = {
            };
            const web3Modal = new Web3Modal({
                // network: 'mainnet', // optional
                network: 'https://localhost:7545', // optional
                cacheProvider: true, // optional
                providerOptions
            });
            const provider = await web3Modal.connect();
            const provider_ = new ethers.providers.Web3Provider(provider);

            // Subscribe to accounts change
            provider.on("accountsChanged", (accounts) => {
                setWalletAddress(accounts[0]);
            });

            const signer = provider_.getSigner();
            const addr = await signer.getAddress();
            //const balance = await provider_.getBalance(addr);
            setWeb3connected(true);
            setWalletAddress(addr);
            openNotification('Success', `Web3 connection success.`);
            //setWalletAddress('0x3ee505ba316879d246a8fd2b3d7ee63b51b44fab');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />} >
                            <Link to="/dashboard">Dashboard</Link>
                        </Menu.Item>
                        {/* <SubMenu key="sub1" icon={<DesktopOutlined />} title="Projects">
                            <Menu.Item key="3">
                                <Link to="/project/compound">Compound</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/project/uniswap">Uniswap</Link>
                            </Menu.Item>
                        </SubMenu> */}
                        {/* <Menu.Item key="about" icon={<PieChartOutlined />} >
                            <Link to="/about">About</Link>
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify="end">
                            <Col span={8}>
                                <Search placeholder="force eth addr for test" onSearch={onSearch} style={{ width: 300 }} />
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={loadWeb3Provider} >{web3connected ? walletAddress.substr(0, 6) + '...' + walletAddress.substr(walletAddress.length - 4, 4) : 'Connect wallet'}</Button>
                            </Col>
                        </Row>

                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {React.cloneElement(props.children, { ethAddr: walletAddress })}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>EthThemAll ©2020 Created for EthOnline Hackathon</Footer>
                </Layout>
            </Layout>
        </Fragment>);
}

export default MainLayout;
