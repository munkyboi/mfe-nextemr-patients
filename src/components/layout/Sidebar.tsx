import { Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { SIDEBAR_NAV_ITEMS } from '@/constants/common.constants';
import { SidebarItem } from './SidebarItem';

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" className={cn('z-600')}>
      <SidebarHeader className="h-16 flex justify-center items-start px-4">
        <Link href="/">
          <h1 className="text-xl font-thin text-gray-900">
            Next<span className="text-blue-500 font-bold">EMR</span>
          </h1>
        </Link>
      </SidebarHeader>
      <Separator className={cn('bg-gray-200')} />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_NAV_ITEMS.filter((item) => !item.hidden).map((item) => (
                <SidebarItem key={item.id} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          asChild
          className={cn(
            'text-gray-900 bg-inherit hover:bg-gray-200 cursor-pointer dark:text-white dark:bg-slate-900 dark:hover:bg-slate-800'
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
