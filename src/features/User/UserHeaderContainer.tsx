import { UserOutlined } from '@ant-design/icons';
import { User } from '@supabase/supabase-js';
import {
  Button, Col, message, Modal, Row, Space,
} from 'antd';
import SignIn from 'components/SignIn';
import { useEffect, useState } from 'react';
import supabase from 'services/supabase';

const UserHeaderContainer = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.getUser().then((res) => {
      setCurrentUser(res);
    });
  }, []);

  const handleSignIn = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;
    try {
      const { user } = await supabase.signIn(email, password);
      if (user) {
        setCurrentUser(user);
        setVisibleModal(false);
      }
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  const handleSignUp = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;
    try {
      const { user } = await supabase.signUp(email, password);
      if (user) {
        setCurrentUser(user);
        setVisibleModal(false);
      }
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  return (
    <>
      <Row align="middle">
        <Space>
          <Button type="default" shape="circle" icon={<UserOutlined />} onClick={() => setVisibleModal(true)} />
          {currentUser?.email}
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
