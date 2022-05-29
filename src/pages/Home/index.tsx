import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Space } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { NoteListContainer } from 'features/Note';
import NoteHeaderContainer from 'features/Note/NoteHeader/NoteHeaderContainer';
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
        width={250}
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        collapsedWidth="0"
        style={{
          padding: '16px 0px',
          overflow: 'auto',
        }}
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
          <Space size={40}>
            <Button icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
            <NoteHeaderContainer />
          </Space>
        </Header>
        <Content
          style={{
            padding: '16px 42px',
            background: '#fff',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
