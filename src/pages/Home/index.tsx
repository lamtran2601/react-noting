import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
  Button, Layout, Row, Space,
} from 'antd';
import { NoteListContainer, NoteHeaderContainer } from 'features/Note';
import UserHeaderContainer from 'features/User/UserHeaderContainer';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        width={280}
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
        overflow: 'auto',
      }}
      >
        <Space direction="vertical">
          <Row
            justify="space-between"
            style={{
              background: '#fff',
              margin: '0px',
              padding: '16px',
            }}
            gutter={[16, 16]}
          >
            <Space size={40}>
              <Button icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
              <NoteHeaderContainer />
            </Space>
            <UserHeaderContainer />
          </Row>
          <Row>
            <Content
              style={{
                background: '#fff',
              }}
            >
              <Outlet />
            </Content>
          </Row>
        </Space>
      </Layout>
    </Layout>
  );
};

export default Home;
