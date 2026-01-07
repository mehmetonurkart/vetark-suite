import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('vetark_user') || 'null');
  } catch {
    return null;
  }
};

export async function getInitialState() {
  const { pathname } = history.location;

  // Login sayfasında guard yok
  if (pathname === '/login') {
    return { currentUser: undefined };
  }

  const user = getUser();

  // giriş yoksa login'e (loop engeli)
  if (!user) {
    history.push('/login');
    return { currentUser: undefined };
  }

  return { currentUser: user };
}

// ✅ Menü görünürlüğünü burada stabil şekilde yönetiyoruz
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  const role = initialState?.currentUser?.role;

  return {
    avatarProps: {
      title: initialState?.currentUser?.name || 'Kullanıcı',
      size: 'small',
    },

    logout: () => {
      localStorage.removeItem('vetark_user');
      window.location.href = '/login';
    },

    // Menü ilk açılış bug fix: role geldikçe menüyü yeniden hesaplar
    menu: {
      request: async (menus) => {
        const filterMenus = (items: any[]): any[] =>
          (items || [])
            .map((item) => {
              const children = item.children ? filterMenus(item.children) : item.routes ? filterMenus(item.routes) : undefined;

              // Umi menü objesinde children/routes farklı gelebilir
              const next: any = { ...item };
              if (children) {
                next.children = children;
                next.routes = children;
              }
              return next;
            })
            .filter((item) => {
              // Sistem sadece admin
              if (item.path === '/system') return role === 'admin';
              if (item.path === '/system/users') return role === 'admin';
              if (item.path === '/system/roles') return role === 'admin';

              // Tedaviler sadece vet/admin
              if (item.path === '/clinic/treatments') return role === 'vet' || role === 'admin';

              // Müşteriler assistant+
              if (item.path === '/clinic/customers')
                return role === 'assistant' || role === 'vet' || role === 'admin';

              return true;
            });

        return filterMenus(menus as any[]);
      },
    },
  };
};
