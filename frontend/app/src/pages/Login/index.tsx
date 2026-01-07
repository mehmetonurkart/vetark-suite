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
          const u = String(values.username || '').trim();
          const p = String(values.password || '').trim();

          const users: Record<string, { password: string; name: string; role: 'admin'|'vet'|'assistant' }> = {
            admin: { password: 'admin', name: 'Admin', role: 'admin' },
            vet: { password: 'vet', name: 'Veteriner', role: 'vet' },
            asistan: { password: 'asistan', name: 'Asistan', role: 'assistant' },
          };

          const found = users[u];
          if (found && found.password === p) {
            localStorage.setItem('vetark_user', JSON.stringify({ name: found.name, role: found.role }));
            message.success(`Giriş başarılı (${found.role})`);
            window.location.href = '/dashboard';
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
        Demo: <b>admin/admin</b> • <b>vet/vet</b> • <b>asistan/asistan</b>
        </div>
      </div>
    </div>
  );
}
