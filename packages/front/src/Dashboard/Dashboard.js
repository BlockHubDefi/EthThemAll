import React from 'react';
import './Dashboard.css';
import config from './config.json';

import { Tabs, Row, Col, Divider, Card, Button, Skeleton, Image } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import kmd from '../../node_modules/cryptocurrency-icons/svg/color/eth.svg'

const { TabPane } = Tabs;

const compound_ph = "/img/compound-ph.png";
const aave_ph = "/img/aave-ph.png";

const style = { background: '#0092ff', padding: '8px 0' };
const aaveList = config.NFTS_PER_PROJECT.AAVE_NFTS.map((nft) => {
  return (
    <Col className="gutter-row" span={6}>
      <Card title={nft.Title} hoverable extra={<Image src={nft.Icon}></Image>} actions={[
        <Button type="primary">Mint</Button>
      ]}>
        <Image src={aave_ph} />
      </Card>
    </Col>
  );
})

const uniswapListList = config.NFTS_PER_PROJECT.UNISWAP_NFTS.map((nft) => {
  return (
    <Col className="gutter-row" span={6}>
      <Card title={nft.Title} hoverable extra={<Image src={nft.Icon}></Image>} actions={[
        <Button type="primary">Mint</Button>
      ]}>
        <Image src={aave_ph} />
      </Card>
    </Col>
  );
})

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
          TODO
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
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            {aaveList}
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              UniSwap
            </span>
          }
          key="3"
        > <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            {uniswapListList}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Dashboard;
