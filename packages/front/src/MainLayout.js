import React, { Fragment, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './mainLayout.css';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { Row, Col } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import Web3 from "web3";
import Web3Modal from "web3modal";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function MainLayout(props) {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const loadWeb3Provider = async () => {
        console.log('Connecting to provider.....');
        const providerOptions = {
        };
        const web3Modal = new Web3Modal({
            network: 'mainnet', // optional
            // network: 'ropsten', // optional
            cacheProvider: true, // optional
            providerOptions
        });
        const provider = await web3Modal.connect();
        // If you want to use web3, uncomment this: web3 = new Web3(provider);
        const provider_ = new Web3(provider);
        console.log(provider);
        const signer = provider_.getSigner();
        const balance = await provider_.getBalance(await signer.getAddress());
        console.log('.... connected');
        console.log(balance);
        //console.log(provider_);
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
                        <SubMenu key="sub1" icon={<DesktopOutlined />} title="Projects">
                            <Menu.Item key="3">
                                <Link to="/project/compound">Compound</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/project/uniswap">Uniswap</Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="about" icon={<PieChartOutlined />} >
                            <Link to="/about">About</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                       <Row>
                            <Col span={6} offset={20}>
                                <Button type="primary" onClick={loadWeb3Provider} >Connect wallet</Button>
                            </Col>
                       </Row>
                        
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>EthThemAll ©2020 Created for EthOnline Hackathon</Footer>
                </Layout>
            </Layout>
        </Fragment>);
}

export default MainLayout;
