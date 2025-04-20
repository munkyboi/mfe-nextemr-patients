import { HandCoins, User, Container, Settings, Home } from 'lucide-react';

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
import { useNavigation } from '@/context/navigation.context';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SIDEBAR_NAV_ITEMS } from '@/constants/common.constants';

export function AppSidebar() {
  const pathname = usePathname();
  const { currentKey, setCurrentKey } = useNavigation();
  useEffect(() => {
    setCurrentKey('home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const paths = pathname.slice(1, pathname.length).split('/');
    const currentPath = paths[0] ? paths[0] : 'home';
    console.log('=========== pathname', pathname, currentPath);
    setCurrentKey(currentPath);
  }, [pathname, setCurrentKey]);
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
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'text-gray-900 hover:text-gray-900 bg-inherit hover:bg-gray-100 cursor-pointer dark:bg-gray-800 dark:text-white dark:bg-slate-900 dark:hover:bg-slate-800',
                      {
                        'text-white': item.key.includes(currentKey),
                        'bg-blue-500': item.key.includes(currentKey),
                        'hover:bg-blue-400': item.key.includes(currentKey),
                        'hover:text-white': item.key.includes(currentKey)
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
