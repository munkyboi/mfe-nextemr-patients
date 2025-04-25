import { Container, HandCoins, Home, LucideProps, User } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface ISidebarNavItem {
  id: string;
  title: string;
  url: string;
  key: string[];
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  hidden?: boolean;
}

export const SIDEBAR_NAV_ITEMS: ISidebarNavItem[] = [
  {
    id: 'home',
    title: 'Home',
    url: '/',
    key: ['home'],
    icon: Home,
    hidden: true
  },
  {
    id: 'patients',
    title: 'Patients',
    url: '/patients',
    key: ['patient', 'patients'],
    icon: User
  },
  {
    id: 'inventory',
    title: 'Inventory',
    url: '/test',
    key: ['test', 'inventory', 'warehouse'],
    icon: Container
  },
  {
    id: 'point-of-sale',
    title: 'Point-of-Sale',
    url: '/cashering',
    key: ['pos', 'cashering'],
    icon: HandCoins
  }
];
