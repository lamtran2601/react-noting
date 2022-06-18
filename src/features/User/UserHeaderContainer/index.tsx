import { useContext, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import {
  Button, Col, Dropdown, Menu, message, Modal, Row, Space,
} from 'antd';

import MenuItem from 'antd/lib/menu/MenuItem';
import { UserContext } from 'contexts';
import SignIn from 'components/SignIn';
import userService from '../userService';

const UserHeaderContainer = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const { user } = useContext(UserContext);

  const handleSignIn = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;
    try {
      await userService.signInByEmail(email, password);
      setVisibleModal(false);
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  const handleSignUp = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;
    try {
      await userService.signUpByEmail(email, password);
      setVisibleModal(false);
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  const isLoggedIn = !!user?.id;

  return (
    <>
      <Row align="middle">
        {!isLoggedIn && <Button type="default" shape="circle" icon={<UserOutlined />} onClick={() => setVisibleModal(true)} />}
        {isLoggedIn && (
        <Dropdown
          overlay={(
            <Menu>
              <MenuItem key="1" onClick={userService.signOut}>Sign out</MenuItem>
            </Menu>
              )}
        >
          <Space>
            {user?.email}
            <UserOutlined />
          </Space>
        </Dropdown>
        )}
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
