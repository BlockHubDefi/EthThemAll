import React, { Fragment, useState } from 'react';
import 'antd/dist/antd.css';
import './mainLayout.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function MainLayout(props) {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
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
                    <Header className="site-layout-background" style={{ padding: 0 }} />
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
