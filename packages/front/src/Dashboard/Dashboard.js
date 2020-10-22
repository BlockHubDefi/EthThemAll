import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import defaultConfig from './config.json';
import { Tabs, Row, Col, Divider, Card, Button, Spin, Image, notification } from 'antd';
import Icon, { GifOutlined, SketchOutlined } from '@ant-design/icons';
// import kmd from '../../node_modules/cryptocurrency-icons/svg/color/eth.svg'

import { ReactComponent as AaveIconSvg } from "../icons/aave-icon.svg"
import { ReactComponent as UniIconSvg } from "../icons/uni-icon2.svg"
import { ReactComponent as CompIconSvg } from "../icons/comp-icon.svg"

const AaveIcon = props => <Icon style={{ fontSize: '32px', color: '#ffffff'}} component={AaveIconSvg} {...props} />;
const UniIcon = props => <Icon style={{ fontSize: '32px', color: '#ffffff'}} component={UniIconSvg} {...props} />;
const CompIcon = props => <Icon style={{ fontSize: '32px', color: '#ffffff'}} component={CompIconSvg} {...props} />;


const axios = require('axios').default;
const instance = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 30000
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

function Dashboard(props) {
  ethAddr = props.ethAddr;
  const [config, setConfig] = useState(defaultConfig);
  const [badgeMinted, setBadgeMinted] = useState(false);
  const [showSpin, setShowSpin] = useState(false);


  const projectList = (conf) => {
    return (
      conf.NFTS_PER_PROJECT.map((project) => {
        return (
          <TabPane
            tab={
              <span>
                { project.ProjectName === 'Aave' ?  <AaveIcon /> : '' }
                { project.ProjectName === 'Compound' ?  <CompIcon /> : '' }
                { project.ProjectName === 'Uniswap' ?  <UniIcon fill="#fff"/> : '' }
                {project.ProjectName}
              </span>
            }
            key={project.ProjectName}
          >
            <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
              {project.NFTS.map((nft) => {
                //console.log(nft.Minted);
                return (
                  <Col className={['gutter-row', 'project', project.ProjectName.toLowerCase()].join(' ') } span={6} key={nft.Action}>
                    <Card title={nft.Title} hoverable
                      actions={[
                        <>
                          {
                            nft.Minted === "false"
                              ? <Button type="primary" onClick={() => clickMint(nft)}>MINT</Button>
                              : <Button type="ghost">Already Minted !</Button>
                          }
                        </>
                      ]}>
                      {
                        nft.Minted === "false"
                          ? <Image src={`https://ipfs.io/ipfs/${nft.IpfsLockedBadgeHash}`} />
                          : <Image src={nft.IpfsBadgeUri} />
                      }
                    </Card>
                  </Col>)
              })}
            </Row>
          </TabPane>
        );
      })
    )
  };

  const clickMint = (nft) => {
    //console.log(`Minting ${nft.Action} !`);
    
    if (ethAddr.indexOf('0x00') !== 0) {
      setShowSpin(true);

      instance.post(nft.Action, {
        userAddress: ethAddr.toLocaleLowerCase()
      })
        .then(function (response) {
          //console.log(`${nft.Action}: ${response.data}`);
          if (response.data != null && response.data.isEligible === true) {
            openNotification('Success', 'Badge Minted !');
            setBadgeMinted(true);
          }
          else
            openNotification('Sorry bro', 'You are not eligibile for this badge');

            setShowSpin(false);
        })
        .catch(function (error) {
          console.log(error);
          setShowSpin(false);
        });
    }
    else {
      openNotification('Error', 'Please connect your wallet first');
    }

    
  };

  useEffect(() => {
    setBadgeMinted(false);

    //setConfig(defaultConfig);
    // retrieve user NFTs
    if (ethAddr.indexOf('0x00') !== 0) {
      setShowSpin(true);
      instance.post('/retrieveUserNTNFTBadges', {
        userAddress: ethAddr
      })
        .then(function (response) {
          // console.log(`/retrieveUserNTNFTBadges:`);
          // console.log(response.data);

          if (response.data && response.data.userNTNFTs) {
            let configCopy = defaultConfig;

            response.data.userNTNFTs.forEach(nft => {
              //console.log('NFT already minted - TemplateID:' + nft.templateId);
              // Set minted for them
              configCopy.NFTS_PER_PROJECT.forEach(project => {
                project.NFTS.forEach(n => {
                  if (n.TemplateId == nft.templateId) {
                    //console.log('Found already minted template ! : ' + n.TemplateId)
                    n.Minted = true;
                    n.IpfsBadgeUri = `https://ipfs.io/ipfs/${nft.templateData[2]}`;
                  }
                }); 
              });
            });

            setConfig({ ...configCopy });
          }
        })
        .catch(function (error) {
          console.log(error);
          setShowSpin(false);
        });

        setShowSpin(false);
    }
    else {
      //openNotification('Error', 'Please connect your wallet first');
    }
  }, [props.ethAddr, badgeMinted]);

  return (
    <div>
      {showSpin ? <Spin /> : ''}
      <Tabs defaultActiveKey="1">
        {projectList(config)}
      </Tabs>
    </div>
  );
}

export default Dashboard;
