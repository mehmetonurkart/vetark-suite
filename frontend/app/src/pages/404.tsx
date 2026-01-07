import { Result, Button } from 'antd';
import { history } from '@umijs/max';

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sayfa bulunamadı."
      extra={
        <Button type="primary" onClick={() => history.push('/dashboard')}>
          Dashboard'a dön
        </Button>
      }
    />
  );
}
