import Link from 'next/link';
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/context/navigation.context';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ISidebarNavItem } from '@/constants/common.constants';

interface ISidebarItemProps {
  item: ISidebarNavItem;
}

export function SidebarItem({ item }: ISidebarItemProps) {
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
        <Link href={item.url} className={cn('block w-full px-4 py-2')}>
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
