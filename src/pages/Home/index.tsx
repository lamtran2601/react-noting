import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
  Button, Layout, Row, Space,
} from 'antd';
import { NoteListContainer, NoteHeaderContainer } from 'features/Note';
import UserHeaderContainer from 'features/User/UserHeaderContainer';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const { Sider } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  return (
    <Layout style={{
      height: '100vh',
      width: '100vw',
      overflow: 'auto',
    }}
    >
      <Sider
        width={isMobile ? 220 : 300}
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
        height: '100%',
        width: '100%',
      }}
      >
        <Row
          justify="space-between"
          style={{
            background: '#fff',
            margin: '0px',
            padding: '16px',
          }}
          gutter={[16, 16]}
        >
          <Space wrap>
            <Button icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
            <NoteHeaderContainer />
          </Space>
          <UserHeaderContainer />
        </Row>
        <Row style={{ height: '10px' }} />
        <Row style={{
          background: '#fff',
          flex: 1,
          overflow: 'auto',
        }}
        >
          <Outlet />
        </Row>
      </Layout>
    </Layout>
  );
};

export default Home;
