import { Layout } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { NoteListContainer } from 'features/Note';
import NoteHeaderContainer from 'features/Note/NoteHeader/NoteHeaderContainer';
import { Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

const Home = () => (
  <Layout style={{ height: '100vh' }}>
    <Sider width={250} theme="light" breakpoint="lg" collapsedWidth="0">
      <div style={{ padding: '16px 0px' }}>
        <NoteListContainer />
      </div>
    </Sider>
    <Layout style={{
      margin: '24px 42px',
    }}
    >
      <Header style={{
        background: '#fff',
      }}
      >
        <NoteHeaderContainer />
      </Header>
      <Content
        style={{
          padding: '16px 42px',
          background: '#fff',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);
export default Home;
