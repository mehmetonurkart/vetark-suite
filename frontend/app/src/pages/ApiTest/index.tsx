import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Space, Typography, message } from 'antd';
import { useState } from 'react';

const { Paragraph } = Typography;

const API = (path: string) => {
  const base = (window as any).__VETARK_API_BASE_URL__;
  if (!base) {
    throw new Error('API BASE YOK → env.js yüklenmedi');
  }
  return `${String(base).replace(/\/$/, '')}${path}`;
};

export default function ApiTest() {
  const [health, setHealth] = useState<any>(null);
  const [db, setDb] = useState<any>(null);

  const call = async (path: string, set: any) => {
    try {
      const res = await fetch(API(path));
      const json = await res.json();
      set(json);
      message.success(`${path} OK`);
    } catch (e: any) {
      message.error(`${path} HATA: ${e?.message || e}`);
    }
  };

  return (
    <PageContainer title="API Test">
      <Space direction="vertical" style={{ width: '100%' }} size={16}>
        <Card>
          <Space>
            <Button type="primary" onClick={() => call('/health', setHealth)}>
              /health çağır
            </Button>
            <Button onClick={() => call('/db-health', setDb)}>/db-health çağır</Button>
          </Space>
        </Card>

        <Card title="/health response">
          <Paragraph>
            <pre style={{ margin: 0 }}>{JSON.stringify(health, null, 2)}</pre>
          </Paragraph>
        </Card>

        <Card title="/db-health response">
          <Paragraph>
            <pre style={{ margin: 0 }}>{JSON.stringify(db, null, 2)}</pre>
          </Paragraph>
        </Card>
      </Space>
    </PageContainer>
  );
}
