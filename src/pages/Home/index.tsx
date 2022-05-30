import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
  Button, Layout, Row, Space,
} from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { NoteListContainer } from 'features/Note';
import NoteHeaderContainer from 'features/Note/NoteHeader/NoteHeaderContainer';
import UserHeaderContainer from 'features/User/UserHeaderContainer';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import HomeProvider from './HomeProvider';

const { Content, Sider } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  return (
    <HomeProvider>
      <Layout style={{ height: '100vh' }}>
        <Sider
          id="sider-container"
          width={250}
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          collapsedWidth="0"
        >
          <NoteListContainer />
        </Sider>
        <Layout style={{
          margin: '0px 8px',
        }}
        >
          <Header style={{
            background: '#fff',
            padding: '0px 16px',
          }}
          >
            <Row justify="space-between">
              <Space size={40}>
                <Button icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
                <NoteHeaderContainer />
              </Space>
              <UserHeaderContainer />
            </Row>
          </Header>
          <Content
            style={{
              background: '#fff',
              overflow: 'auto',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </HomeProvider>
  );
};

export default Home;
