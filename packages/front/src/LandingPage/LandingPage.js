import React from 'react';
import './LandingPage.css';
import { Layout, Menu, Breadcrumb, Button, Row, Col, Skeleton, Typography } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;


function LandingPage(props) {
  return (
      <Layout className="layout">
        <Header>
          <div id="components-layout-landing" className="logo">EthThemAll</div>
          <Menu theme="dark" mode="horizontal" style={{ textAlign: 'right' }}>
            <Menu.Item>
              <Button type="primary">Connect Wallet</Button>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <div className="site-layout-content" style={{ padding: '20px 50px' }} >
            <Row>
              <Col span={10}>
                <Skeleton.Image />
              </Col>
              <Col span={14}>
                <Title level={2}>h2. Ant Design</Title>
                <Paragraph>
                  col-14 (Punch line and text)
                </Paragraph>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Title level={2}>How it works</Title>
                <Paragraph>
                  col-24 ()
                </Paragraph>
              </Col>
            </Row>
            <Row>
              <Col span={12}>col-12 (What's NFT)</Col>
              <Col span={12}>col-12 (What's NTNFT)</Col>
            </Row>
            <Row>
              <Col span={24}>
                col-24 (Projects we cover so far)
                ADD BUTTON
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                col-24 (Get STARTED)
                ADD BUTTON Connect wallet
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout> 
  );
}

export default LandingPage;