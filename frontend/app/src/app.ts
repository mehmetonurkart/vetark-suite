import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';

const isLoggedIn = () => {
  const user = localStorage.getItem('vetark_user');
  return !!user;
};

export const layout: RunTimeLayoutConfig = () => {
  return {
    logout: () => {
      localStorage.removeItem('vetark_user');
      history.push('/login');
    },
  };
};

export async function getInitialState() {
  // login sayfasındaysak dokunma
  if (history.location.pathname === '/login') return {};

  // login değilse ve giriş yoksa login’e at
  if (!isLoggedIn()) {
    history.push('/login');
    return {};
  }

  return {
    currentUser: JSON.parse(localStorage.getItem('vetark_user') || '{}'),
  };
}
