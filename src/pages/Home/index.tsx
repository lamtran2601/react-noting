import { Layout } from 'antd';
import { NoteListContainer } from 'features/Note';
import { Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

const Home = () => (
  <Layout style={{ height: '100vh' }}>
    <Sider width={250} theme="light" breakpoint="lg" collapsedWidth="0">
      <div style={{ padding: 16 }}>
        <NoteListContainer />
      </div>
    </Sider>
    <Layout style={{ height: '100vh' }}>
      <Content
        style={{
          margin: 42,
          padding: '24px 42px',
          background: '#fff',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);
export default Home;
