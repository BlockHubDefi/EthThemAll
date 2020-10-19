import React from 'react';
import './Dashboard.css';

import { Tabs, Row, Col, Divider } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const style = { background: '#0092ff', padding: '8px 0' };

function Dashboard(props) {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              Compound
            </span>
          }
          key="1"
        >
          <Divider orientation="left">Borrow</Divider>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>col-6</div>
            </Col>
          </Row>
          <Divider orientation="left">Supply</Divider>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>col-6</div>
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              AAVE
            </span>
          }
          key="2"
        >
          Tab 2
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              UniSwap
            </span>
          }
          key="3"
        >
          Tab 3
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Dashboard;
