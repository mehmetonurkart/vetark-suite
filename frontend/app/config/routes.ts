export default [
  { path: '/', redirect: '/dashboard' },

  {
    name: 'Dashboard',
    path: '/dashboard',
    component: './Dashboard',
  },

  {
    name: 'Klinik',
    path: '/clinic',
    routes: [
      { name: 'Müşteriler', path: '/clinic/customers', component: './Customers' },
      { name: 'Hastalar', path: '/clinic/pets', component: './Pets' },
      { name: 'Randevular', path: '/clinic/appointments', component: './Appointments' },
      { name: 'Tedaviler', path: '/clinic/treatments', component: './Treatments' },
    ],
  },

  {
    name: 'Sistem',
    path: '/system',
    routes: [
      { name: 'Kullanıcılar', path: '/system/users', component: './Users' },
      { name: 'Roller & Yetkiler', path: '/system/roles', component: './Roles' },
    ],
  },

  { path: '*', layout: false, component: './404' },
];
