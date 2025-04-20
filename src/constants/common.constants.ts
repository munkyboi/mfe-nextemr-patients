import { Container, HandCoins, Home, User } from 'lucide-react';

export const SIDEBAR_NAV_ITEMS = [
  {
    title: 'Home',
    url: '/',
    key: ['home'],
    icon: Home,
    hidden: true
  },
  {
    title: 'Patients',
    url: '/patients',
    key: ['patient', 'patients'],
    icon: User
  },
  {
    title: 'Inventory',
    url: '/test',
    key: ['test', 'inventory', 'warehouse'],
    icon: Container
  },
  {
    title: 'Point-of-Sale',
    url: '/patients/123/info',
    key: ['pos', 'cashering'],
    icon: HandCoins
  }
];
