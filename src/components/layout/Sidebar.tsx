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
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

// Menu items.
const items = [
  {
    title: 'Patients',
    url: '#',
    icon: User,
    active: true,
  },
  {
    title: 'Inventory',
    url: '#',
    icon: Container,
  },
  {
    title: 'Point-of-Sale',
    url: '#',
    icon: HandCoins,
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      variant="floating"
      className={cn('px-0 py-4 rounded-tl-none ring-0 z-600')}
    >
      <SidebarHeader className={cn('h-[40px]')}>NextEMR</SidebarHeader>
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
                        'hover:text-white': item.active,
                      },
                    )}
                  >
                    <a
                      href={item.url}
                      className={cn('block w-full px-4 py-2')}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
            'text-gray-900 bg-inherit hover:bg-gray-200 cursor-pointer dark:bg-gray-800 dark:text-white dark:bg-slate-900 dark:hover:bg-slate-800',
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
