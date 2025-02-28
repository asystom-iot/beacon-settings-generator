import React from 'react';
import { Tabs, TabsProps, Layout, theme, ConfigProvider, Typography, Flex } from 'antd';
import { SectionAdvancedSettings, SectionSchedulingSettings } from './components/';
import './App.css';

const logo = require('./asystom_grafana_icon.png');

const { Header, Content, Footer } = Layout;

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'SCHEDULING SETTINGS',
    children: <SectionSchedulingSettings />,
  },
  {
    key: '2',
    label: 'ADVANCED SETTINGS',
    children: <SectionAdvancedSettings />,
  },
];

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0f937b',
          borderRadius: 4,
          borderRadiusLG: 6,
          borderRadiusSM: 2,
        },
        components: {
          Tabs: {
            inkBarColor: '#0f937b',
            itemSelectedColor: '#0f937b',
          },
          Layout: {
            headerBg: '#08332c',
          },
        },
      }}>
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 999,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Flex align={'center'}>
            <img
              src={logo}
              alt='Logo'
              width={50}
              height={50}
            />
            <Typography.Title
              level={3}
              style={{ margin: '0 0 0 15px' }}>
              <span style={{ fontWeight: 600, color: '#2ad79e' }}>Beacon settings</span>
              <span style={{ fontWeight: 600, color: 'white' }}> - Hex string generator</span>
            </Typography.Title>
          </Flex>
          <div>
            <Typography.Link
              href='http://www.asystom.com'
              target='_blank'>
              Asystom.com
            </Typography.Link>
          </div>
        </Header>
        <Content>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 650,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}>
            <div style={{ padding: '6px 80px', width: '98%', margin: 'auto' }}>
              <Tabs
                defaultActiveKey='1'
                items={items}
              />
            </div>
          </div>
        </Content>
        <Footer>Asystom ©{new Date().getFullYear()}</Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
