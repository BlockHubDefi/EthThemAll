import React from 'react';
import './Dashboard.css';
import config from './config.json';
import { Tabs, Row, Col, Divider, Card, Button, Skeleton, Image, notification } from 'antd';
import { GifOutlined, SketchOutlined } from '@ant-design/icons';
// import kmd from '../../node_modules/cryptocurrency-icons/svg/color/eth.svg'
const axios = require('axios').default;
const instance = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

const { TabPane } = Tabs;

// const compound_ph = "/img/compound-ph.png";
// const aave_ph = "/img/aave-ph.png";

let ethAddr = '';

const openNotification = (title, text) => {
  notification.open({
    message: title,
    description: text
  });
};

const clickMint = (e,nft) => {
  console.log(e.target);
  e.target.loading=true;
  console.log(`Minting ${nft.Action} !`);
  if (ethAddr.indexOf('0x00') !== 0) {
    instance.post(nft.Action, {
      userAddress: ethAddr
    })
      .then(function (response) {
        console.log(`${nft.Action}: ${response.data}`);
        if (response.data === true)
          openNotification('Success', 'Badge Minted !');
        else
          openNotification('Sorry bro', 'You are not eligibile for this badge');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  else {
    openNotification('Error', 'Please connect your wallet first');
  }
};

const projectList = config.NFTS_PER_PROJECT.map((project) => {
  return (
    <TabPane
      tab={
        <span>
          <SketchOutlined />
          {project.ProjectName}
        </span>
      }
      key={project.ProjectName}
    >
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        {project.NFTS.map((nft) => {
          return (
            <Col className="gutter-row" span={6} key={nft.Action}>
              <Card title={nft.Title} hoverable extra={<Image src={nft.Icon}></Image>} actions={[
                <Button type="primary" onClick={e => clickMint(e,nft)}>Mint</Button>
              ]}>
                <Image src={nft.DefaultBadgeImg} />
              </Card>
            </Col>)
        })}
      </Row>
    </TabPane>
  );
})

function Dashboard(props) {
  ethAddr = props.ethAddr;
  return (
    <div>
      <Tabs defaultActiveKey="1">
        {projectList}
      </Tabs>
    </div>
  );
}

export default Dashboard;
