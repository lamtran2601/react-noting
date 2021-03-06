import {
  Button, Form, Input, Row, Space,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';

interface SignInProps {
  onSignIn: (values: { email: string, password: string }) => void;
  onSignUp: (values: { email: string, password: string }) => void;
}

const SignIn = (props: SignInProps) => {
  const [form] = useForm();
  const { onSignIn, onSignUp } = props;

  const handleSignIn = () => {
    form.validateFields().then((values) => {
      onSignIn(values);
    });
  };

  const handleSignUp = () => {
    form.validateFields().then((values) => {
      onSignUp(values);
    });
  };

  return (
    <Form
      form={form}
      name="signin"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item style={{ justifyContent: 'center' }}>
        <Row justify="center">
          <Space>
            <Button type="primary" onClick={handleSignIn}>
              Login
            </Button>
            <Button type="default" onClick={handleSignUp}>
              Register
            </Button>
          </Space>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default SignIn;
