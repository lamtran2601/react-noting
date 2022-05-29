import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';

const Loading = () => (
  <Row>
    <Col span={24} offset={12}>
      <LoadingOutlined style={{ fontSize: 20 }} />
    </Col>
  </Row>
);
export default Loading;
