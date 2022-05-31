import { UserOutlined } from '@ant-design/icons';
import {
  Button, Col, message, Modal, Row, Space,
} from 'antd';
import SignIn from 'components/SignIn';
import { UserContext } from 'contexts';
import { useContext, useState } from 'react';
import supabase from 'services/supabase';

const UserHeaderContainer = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const { user } = useContext(UserContext);

  const handleSignIn = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;
    try {
      await supabase.signIn(email, password);
      setVisibleModal(false);
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  const handleSignUp = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;
    try {
      await supabase.signUp(email, password);
      setVisibleModal(false);
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  return (
    <>
      <Row align="middle">
        <Space>
          <Button type="default" shape="circle" icon={<UserOutlined />} onClick={() => setVisibleModal(true)} />
          {user?.email}
        </Space>
      </Row>
      <Modal
        title="Login or Register"
        visible={visibleModal}
        onCancel={() => setVisibleModal(false)}
        footer={null}
      >
        <Row justify="center">
          <Col span={18}>
            <SignIn onSignIn={handleSignIn} onSignUp={handleSignUp} />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default UserHeaderContainer;
