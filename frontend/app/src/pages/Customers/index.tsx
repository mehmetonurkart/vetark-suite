import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Modal, Form, Input, message, Space, Tag, Typography } from 'antd';
import { useMemo, useState } from 'react';
import {
  PlusCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  SmileOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';

type CustomerRow = {
  id: number;
  name: string;
  phone: string;
  petName: string;
  createdAt: string;
};

const initialData: CustomerRow[] = [
  { id: 64, name: 'Bülent Özklınç', phone: '05414844812', petName: 'Mazlum', createdAt: '29-10-2025' },
  { id: 70, name: 'Selo Biri', phone: '05414844812', petName: 'Efe', createdAt: '21-12-2025' },
  { id: 71, name: 'Müjde Özklınç', phone: '05414844812', petName: 'Moçi', createdAt: '21-12-2025' },
];

export default function CustomersPage() {
  const [dataSource, setDataSource] = useState<CustomerRow[]>(initialData);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  // Küçük tema renkleri (görsele yakın)
  const styles = useMemo(
    () => ({
      topHero: {
        background: 'linear-gradient(90deg, #224353 0%, #16b199 100%)',
        borderRadius: 18,
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        color: '#fff',
        boxShadow: '0 10px 24px rgba(0,0,0,0.10)',
      } as const,
      heroIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        background: 'rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      } as const,
      panelWrap: {
        marginTop: 18,
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 14px 32px rgba(0,0,0,0.08)',
        overflow: 'hidden',
      } as const,
      panelHeader: {
        background: 'linear-gradient(90deg, #224353 0%, #16b199 100%)',
        padding: '14px 18px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      } as const,
      panelBody: {
        padding: 18,
      } as const,
      hint: {
        background: '#f6fbff',
        border: '1px solid #d6ecff',
        borderRadius: 12,
        padding: '10px 12px',
        marginBottom: 14,
        color: '#1f3b57',
        fontSize: 13,
      } as const,
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        gap: 12,
      } as const,
      newBtn: {
        background: '#17b19a',
        borderColor: '#17b19a',
        borderRadius: 999,
        paddingInline: 18,
        height: 40,
        boxShadow: '0 10px 20px rgba(23,177,154,0.25)',
      } as const,
      searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color: '#2b2b2b',
        fontSize: 13,
      } as const,
      tableCard: {
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid #eef2f6',
      } as const,
    }),
    [],
  );

  const columns = [
    {
      title: 'Kayıt ID',
      dataIndex: 'id',
      key: 'id',
      width: 90,
      search: false,
      align: 'center' as const,
    },
    {
      title: 'Ad Soyad',
      dataIndex: 'name',
      key: 'name',
      search: true,
      render: (_: any, row: CustomerRow) => (
        <Space>
          <UserOutlined style={{ color: '#1f6aa5' }} />
          <Typography.Text strong>{row.name}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Telefon',
      dataIndex: 'phone',
      key: 'phone',
      search: true,
      render: (_: any, row: CustomerRow) => (
        <Space>
          <PhoneOutlined style={{ color: '#2fbf71' }} />
          <Typography.Text>{row.phone}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Evcil Hayvan Adı',
      dataIndex: 'petName',
      key: 'petName',
      search: false,
      render: (_: any, row: CustomerRow) => (
        <Space>
          <SmileOutlined  style={{ color: '#f2a100' }} />
          <Typography.Text>{row.petName}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Kayıt Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 130,
      search: false,
      align: 'center' as const,
      render: (_: any, row: CustomerRow) => <Tag color="geekblue">{row.createdAt}</Tag>,
    },
    {
      title: 'Detay',
      key: 'detail',
      width: 120,
      search: false,
      align: 'center' as const,
      render: (_: any, row: CustomerRow) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          style={{
            background: '#12b0b7',
            borderColor: '#12b0b7',
            color: '#fff',
            borderRadius: 999,
            paddingInline: 14,
            height: 28,
          }}
          onClick={() => message.info(`Detay seçildi: ${row.name}`)}
        >
          Seç
        </Button>
      ),
    },
    {
      title: 'İşlem',
      key: 'action',
      width: 190,
      search: false,
      align: 'center' as const,
      render: (_: any, row: CustomerRow) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            style={{
              background: '#f0a500',
              borderColor: '#f0a500',
              color: '#fff',
              borderRadius: 999,
              paddingInline: 14,
              height: 28,
            }}
            onClick={() => message.info(`Düzenle (demo): ${row.id}`)}
          >
            Düzenle
          </Button>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            style={{
              borderRadius: 999,
              paddingInline: 14,
              height: 28,
            }}
            onClick={() => {
              setDataSource((prev) => prev.filter((x) => x.id !== row.id));
              message.success('Silindi (demo)');
            }}
          >
            Sil
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title={null}
      breadcrumbRender={() => null}
      style={{ background: 'transparent' }}
      content={null}
    >
      {/* ÜST HERO */}
      <div style={styles.topHero}>
        <div style={styles.heroIcon}>
          <UserOutlined style={{ fontSize: 22, color: '#fff' }} />
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.1 }}>Müşteriler</div>
          <div style={{ opacity: 0.9, fontSize: 13, marginTop: 2 }}>
            Tüm kayıtlı müşteri ve evcil hayvan bilgilerini yönetin
          </div>
        </div>
      </div>

      {/* PANEL */}
      <div style={styles.panelWrap}>
        <div style={styles.panelHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SmileOutlined  />
            <div style={{ fontWeight: 700 }}>Müşteri ve Evcil Hayvan Bilgileri</div>
          </div>

          <div style={{ opacity: 0.9, fontSize: 12 }}>
            {/* sağ üst küçük ikonlar (görseldeki gibi) */}
            <span style={{ marginRight: 10, cursor: 'pointer' }}>˄</span>
            <span style={{ cursor: 'pointer' }}>×</span>
          </div>
        </div>

        <div style={styles.panelBody}>
          <div style={styles.hint}>
            ℹ️ Müşteri ve evcil hayvan bilgilerini aşağıdaki tablodan takip edebilirsiniz.
          </div>

          {/* ÜST ARAÇ ÇUBUĞU (Yeni Kayıt + sağda Ara) */}
          <div style={styles.toolbar}>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              style={styles.newBtn}
              onClick={() => setOpen(true)}
            >
              Yeni Kayıt
            </Button>

            <div style={styles.searchBox}>
              <span>Ara:</span>
              {/* ProTable kendi search’ü var; burada sadece görsel */}
              <Input
                prefix={<SearchOutlined />}
                placeholder=""
                style={{ width: 220, borderRadius: 10 }}
                onChange={(e) => {
                  const q = e.target.value.trim().toLowerCase();
                  if (!q) return setDataSource(initialData);
                  setDataSource(
                    initialData.filter(
                      (x) =>
                        x.name.toLowerCase().includes(q) ||
                        x.phone.toLowerCase().includes(q) ||
                        x.petName.toLowerCase().includes(q),
                    ),
                  );
                }}
              />
            </div>
          </div>

          {/* TABLO */}
          <div style={styles.tableCard}>
            <ProTable<CustomerRow>
              rowKey="id"
              columns={columns as any}
              dataSource={dataSource}
              options={false}
              search={false} // ProTable search'ü kapat, görseldeki gibi sağda custom "Ara" var
              pagination={{ pageSize: 5, showSizeChanger: false }}
              headerTitle={false}
              toolBarRender={false}
              rowClassName={(_, index) => (index % 2 === 0 ? 'va-row-even' : 'va-row-odd')}
            />
          </div>

          {/* tabloya özel küçük css */}
          <style>
            {`
              /* Başlık satırı koyu + yuvarlak hissi */
              .ant-pro-table .ant-table-thead > tr > th{
                background:#2f4152 !important;
                color:#fff !important;
                font-weight:700 !important;
                border-bottom: none !important;
              }
              .ant-pro-table .ant-table-thead > tr > th:first-child{
                border-top-left-radius: 12px;
              }
              .ant-pro-table .ant-table-thead > tr > th:last-child{
                border-top-right-radius: 12px;
              }
              /* Zebra */
              .va-row-even td{ background:#f4f4f4 !important; }
              .va-row-odd td{ background:#ffffff !important; }
              /* Hücre araları */
              .ant-pro-table .ant-table-tbody > tr > td{
                border-bottom: 1px solid #edf1f6 !important;
              }
              /* ProTable dış padding'i azalt */
              .ant-pro-table .ant-pro-table-list-toolbar{
                padding: 0 !important;
              }
            `}
          </style>
        </div>
      </div>

      {/* MODAL (demo) */}
      <Modal
        title="Yeni Kayıt"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Kaydet"
        onOk={() => {
          form.validateFields().then((values) => {
            setDataSource((prev) => [
              ...prev,
              {
                id: Date.now(),
                name: values.name,
                phone: values.phone,
                petName: values.petName || '—',
                createdAt: values.createdAt || '—',
              },
            ]);
            form.resetFields();
            setOpen(false);
            message.success('Kayıt eklendi (demo)');
          });
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Ad Soyad" rules={[{ required: true, message: 'Zorunlu alan' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Telefon" rules={[{ required: true, message: 'Zorunlu alan' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="petName" label="Evcil Hayvan Adı">
            <Input />
          </Form.Item>
          <Form.Item name="createdAt" label="Kayıt Tarihi">
            <Input placeholder="örn: 21-12-2025" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
