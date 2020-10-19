import React from 'react';
import './Dashboard.css';

import { Tabs, Row, Col, Divider, Card, Button, Skeleton, Image } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const compound_ph = "/img/compound-ph.png";
const aave_ph = "/img/aave-ph.png";

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
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col className="gutter-row" span={6}>
              <Card title="ETH" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
              <Card title="WBTC" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                    <Button type="primary">Mint</Button>
                  ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="DAI" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="USDC" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="USDT" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="0x" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="UNI" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="BAT" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="COMP" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="AUGUR" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Borrowed 3+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Borrowed 6+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Borrowed ALL" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
          </Row>
          <Divider orientation="left">Supply</Divider>
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col className="gutter-row" span={6}>
              <Card title="ETH" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
              <Card title="WBTC" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                    <Button type="primary">Mint</Button>
                  ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="DAI" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="USDC" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="USDT" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="0x" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="UNI" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="BAT" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="COMP" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="AUGUR" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Supplied 3+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Supplied 6+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Supplied ALL" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={compound_ph}/>
              </Card>
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
          <Divider orientation="left">Borrow</Divider>
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col className="gutter-row" span={6}>
              <Card title="ETH" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
              <Card title="WBTC" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                    <Button type="primary">Mint</Button>
                  ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="DAI" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="USDC" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="USDT" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="TUSD" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="SUSD" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="BUSD" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="LEND" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="YFI" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="REN" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="ENJ" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="KNC" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="LINK" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="MANA" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="MKR" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="0x" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="SNX" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="BAT" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            
            <Col className="gutter-row" span={6}>
            <Card title="Borrowed 3+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Borrowed 6+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Borrowed 9+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Borrowed 12+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Borrowed 15+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Borrowed ALL" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
          </Row>
          <Divider orientation="left">Supply</Divider>
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col className="gutter-row" span={6}>
              <Card title="ETH" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
              <Card title="WBTC" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                    <Button type="primary">Mint</Button>
                  ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="DAI" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="USDC" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="USDT" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="TUSD" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="SUSD" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="BUSD" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="LEND" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="YFI" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="REN" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="ENJ" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="KNC" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="LINK" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="MANA" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="MKR" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="0x" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="SNX" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="BAT" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            
            <Col className="gutter-row" span={6}>
            <Card title="Supply 3+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Supply 6+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Supply 9+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Supply 12+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Supply 15+" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
            <Col className="gutter-row" span={6}>
            <Card title="Supply ALL" hoverable extra={<img src="../../node_modules/cryptocurrency-icons/svg/color/kmd.svg"></img>} actions={[
                  <Button type="primary">Mint</Button>
                ]}>
                <Image src={aave_ph}/>
              </Card>
            </Col>
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
        >
          Tab 3
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Dashboard;
