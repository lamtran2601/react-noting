import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import NoteListContainer from "./components/NoteListContainer";
const { Content, Sider } = Layout;

const Home = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={250} theme="light" breakpoint="lg" collapsedWidth="0">
        <div style={{ padding: 16 }}>
          <NoteListContainer />
        </div>
      </Sider>
      <Layout style={{ height: "100vh" }}>
        <Content
          style={{
            margin: 42,
            padding: "24px 42px",
            background: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
