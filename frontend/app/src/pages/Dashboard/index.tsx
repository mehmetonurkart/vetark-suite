import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Statistic } from 'antd';

export default function DashboardPage() {
  return (
    <PageContainer title="Dashboard">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Bugünkü Randevu" value={0} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Bekleyen Tedavi" value={0} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Toplam Müşteri" value={0} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Toplam Hasta" value={0} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}
