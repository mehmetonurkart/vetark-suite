import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { history } from '@umijs/max';
import { useEffect } from 'react';

export default function LoginPage() {
  // yatay scroll'u kesin kesmek için
  useEffect(() => {
    const prev = document.body.style.overflowX;
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = prev;
    };
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        overflowX: 'hidden',
      }}
    >
      <div style={{ width: 392, maxWidth: '100%' }}>
        <LoginForm
          title="VetArk"
          subTitle="Veteriner Klinik Yönetim Paneli"
          submitter={{
            searchConfig: {
              submitText: 'Giriş Yap',
            },
          }}
          onFinish={async (values) => {
            if (values.username === 'admin' && values.password === 'admin') {
              localStorage.setItem(
                'vetark_user',
                JSON.stringify({ name: 'Admin', role: 'admin' }),
              );
              message.success('Giriş başarılı');
              history.push('/dashboard');
              return true;
            }
            message.error('Hatalı kullanıcı adı veya şifre');
            return false;
          }}
        >
          <ProFormText
            name="username"
            placeholder="Kullanıcı adı"
            fieldProps={{ size: 'large' }}
            rules={[{ required: true, message: 'Kullanıcı adı gerekli' }]}
          />
          <ProFormText.Password
            name="password"
            placeholder="Şifre"
            fieldProps={{ size: 'large' }}
            rules={[{ required: true, message: 'Şifre gerekli' }]}
          />
        </LoginForm>

        <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
          Demo: <b>admin / admin</b>
        </div>
      </div>
    </div>
  );
}
