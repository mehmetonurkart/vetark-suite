import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},

  layout: {
    title: 'VetArk',
  },

  routes: [
    { path: '/', redirect: '/dashboard' },

    { path: '/login', layout: false, component: './Login' },
    
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: './Dashboard',
      icon: 'DashboardOutlined',
    },

    {
      name: 'Klinik',
      path: '/clinic',
      icon: 'HeartOutlined',
      routes: [
        { name: 'Müşteriler', path: '/clinic/customers', component: './Customers', icon: 'TeamOutlined' },
        { name: 'Hastalar', path: '/clinic/pets', component: './Pets', icon: 'MedicineBoxOutlined' },
        { name: 'Randevular', path: '/clinic/appointments', component: './Appointments', icon: 'CalendarOutlined' },
        { name: 'Tedaviler', path: '/clinic/treatments', component: './Treatments', icon: 'ExperimentOutlined' },
      ],
    },

    {
      name: 'Sistem',
      path: '/system',
      icon: 'SettingOutlined',
      routes: [
        { name: 'Kullanıcılar', path: '/system/users', component: './Users', icon: 'UserOutlined' },
        { name: 'Roller & Yetkiler', path: '/system/roles', component: './Roles', icon: 'SafetyOutlined' },
      ],
    },

    { path: '*', layout: false, component: './404' },
  ],

  npmClient: 'npm',
});
