import { HandCoins, User, Container, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import Link from 'next/link';

// Menu items.
const items = [
  {
    title: 'Patients',
    url: '/',
    icon: User,
    active: true
  },
  {
    title: 'Inventory',
    url: '/test',
    icon: Container
  },
  {
    title: 'Point-of-Sale',
    url: '#',
    icon: HandCoins
  }
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" className={cn('z-600')}>
      <SidebarHeader className="h-16 flex justify-center items-start px-4">
        <h1 className="text-xl font-thin text-gray-900">
          Next<span className="text-blue-500 font-bold">EMR</span>
        </h1>
      </SidebarHeader>
      <Separator className={cn('bg-gray-200')} />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'text-gray-900 hover:text-gray-900 bg-inherit hover:bg-gray-100 cursor-pointer dark:bg-gray-800 dark:text-white dark:bg-slate-900 dark:hover:bg-slate-800',
                      {
                        'text-white': item.active,
                        'bg-blue-500': item.active,
                        'hover:bg-blue-800': item.active,
                        'hover:text-white': item.active
                      }
                    )}
                  >
                    <Link
                      href={item.url}
                      className={cn('block w-full px-4 py-2')}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          asChild
          className={cn(
            'text-gray-900 bg-inherit hover:bg-gray-200 cursor-pointer dark:bg-gray-800 dark:text-white dark:bg-slate-900 dark:hover:bg-slate-800'
          )}
        >
          <a href="#">
            <Settings />
            <span>Settings</span>
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
