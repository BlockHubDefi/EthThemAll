import React from 'react';
import './LandingPage.css';
import { Layout, Menu, Breadcrumb, Button, Row, Col, Skeleton, Typography, Image, Card } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;


function LandingPage(props) {
  return (
      <Layout className="layout">
        <Header>
          <div id="components-layout-landing" className="logo">
          <Image src="https://ipfs.io/ipfs/QmW9SHLoW1aDcPb6Zyht6QvSqF7AAVUNK9ksYNxvFcyTm1"></Image>
          </div>
          <Menu theme="dark" mode="horizontal" style={{ textAlign: 'right' }}>
            <Menu.Item>
              <Button type="primary"><a href="/dashboard">Go To Dashboard</a></Button>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <div className="site-layout-content" style={{ padding: '20px 50px' }} >
            <Row>
              <Col span={12}>
              <Image
                src="/img/hero.jpg"
              />
              </Col>
              <Col span={12} 
                style={{ 
                  display: "flex",
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <div style={{ padding: '0 40px'}}>
                  <Title level={2}>EthThemAll</Title>
                  <Paragraph>
                  In the vast forest of Ethereum we all delve and wander onto different farms, citadels and even slums... so why not have an NFT-based proof of our undying devotion to the ecosystem?
                  </Paragraph>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}
                style={{ 
                  display: "flex",
                  alignItems: 'center'
                }}
              >
                <div style={{textAlign: 'center'}}>
                  <Title level={2}>How it works</Title>
                  <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum fusce ut placerat orci nulla pellentesque. Ac turpis egestas sed tempus urna et pharetra pharetra. Sed blandit libero volutpat sed cras ornare arcu dui. Luctus venenatis lectus magna fringilla urna porttitor rhoncus. Donec ac odio tempor orci. Lacus viverra vitae congue eu. Ut enim blandit volutpat maecenas volutpat blandit. Maecenas pharetra convallis posuere morbi. Est placerat in egestas erat imperdiet sed. Sed sed risus pretium quam vulputate. Curabitur vitae nunc sed velit dignissim sodales. Leo in vitae turpis massa sed elementum tempus. Arcu non sodales neque sodales ut etiam. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.
                  </Paragraph>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <div style={{textAlign: 'center'}}>
                  <Title level={2}>What's NFT</Title>
                  <Paragraph style={{ padding: '20px 40px'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum fusce ut placerat orci nulla pellentesque. Ac turpis egestas sed tempus urna et pharetra pharetra. Sed blandit libero volutpat sed cras ornare arcu dui. Luctus venenatis lectus magna fringilla urna porttitor rhoncus. Donec ac odio tempor orci. Lacus viverra vitae congue eu. Ut enim blandit volutpat maecenas volutpat blandit. Maecenas pharetra convallis posuere morbi. Est placerat in egestas erat imperdiet sed. Sed sed risus pretium quam vulputate. Curabitur vitae nunc sed velit dignissim sodales. Leo in vitae turpis massa sed elementum tempus. Arcu non sodales neque sodales ut etiam. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.
                  </Paragraph>
                </div>
              </Col>
              <Col span={12}>
                <div style={{textAlign: 'center'}}>
                  <Title level={2}>What's NTNFT</Title>
                  <Paragraph style={{ padding: '20px 40px'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum fusce ut placerat orci nulla pellentesque. Ac turpis egestas sed tempus urna et pharetra pharetra. Sed blandit libero volutpat sed cras ornare arcu dui. Luctus venenatis lectus magna fringilla urna porttitor rhoncus. Donec ac odio tempor orci. Lacus viverra vitae congue eu. Ut enim blandit volutpat maecenas volutpat blandit. Maecenas pharetra convallis posuere morbi. Est placerat in egestas erat imperdiet sed. Sed sed risus pretium quam vulputate. Curabitur vitae nunc sed velit dignissim sodales. Leo in vitae turpis massa sed elementum tempus. Arcu non sodales neque sodales ut etiam. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.
                  </Paragraph>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}
                style={{ 
                  display: "flex",
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div style={{textAlign: 'center'}}>
                  <Title>Projects we support so far</Title>
                  <div>
                    <Row id="projects-row" gutter={16}>
                      <Col span={4}>
                        <Card>
                          <Skeleton.Image/>
                        </Card>
                      </Col>
                      <Col span={4}>
                        <Card>
                          <Skeleton.Image/>
                        </Card>
                      </Col>
                      <Col span={4}>
                        <Card>
                          <Skeleton.Image/>
                        </Card>
                      </Col>
                      <Col span={4}>
                        <Card>
                          <Skeleton.Image/>
                        </Card>
                      </Col>
                      <Col span={4}>
                        <Card>
                          <Skeleton.Image/>
                        </Card>
                      </Col>
                      <Col span={4}>
                        <Card>
                          <Skeleton.Image/>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}
                  style={{ 
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                <div style={{textAlign: 'center'}}>
                  <Title level={2}>What are you waiting for?</Title>
                  <Button type="primary" shape="round" size="large">Unlock Wallet</Button>
                </div>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>EthThemAll ©2020</Footer>
      </Layout> 
  );
}

export default LandingPage;