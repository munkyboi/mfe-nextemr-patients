'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '../ui/sidebar';
import { CalendarDaysIcon, ListIcon } from 'lucide-react';

export default function Header() {
  return (
    <div className={cn('header sticky flex flex-nowrap h-[50px] z-50')}>
      <div className="flex justify-start items-center w-full">
        <NavigationMenu className={cn('grow  flex items-center')}>
          <NavigationMenuList className={cn('gap-0')}>
            <SidebarTrigger className={cn('rounded-full')} />
            <NavigationMenuItem
              className={cn('border-r border-gray-300 ml-2 pr-2')}
            >
              <NavigationMenuTrigger>
                <ListIcon
                  size={16}
                  className={cn('mr-2')}
                />
                <span className="hidden sm:inline-block">Queue</span>
                <NavigationMenuContent>
                  <div>xxxcxcxcxcx</div>
                  <div>xxxcxcxcxcx</div>
                  <div>xxxcxcxcxcx</div>
                  <div>xxxcxcxcxcx</div>
                  <div>xxxcxcxcxcx</div>
                  <div>xxxcxcxcxcx</div>
                  <div>xxxcxcxcxcx</div>
                </NavigationMenuContent>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem className={cn('ml-2')}>
              <NavigationMenuTrigger>
                <CalendarDaysIcon
                  size={16}
                  className={cn('mr-2')}
                />
                <span className="hidden sm:inline-block">Appointments</span>
                <NavigationMenuContent>
                  <div>asdfasdfasdf</div>
                </NavigationMenuContent>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex justify-end items-center w-auto">
        <NavigationMenu
          viewport
          className={cn('flex')}
          style={{ left: 'auto', right: '0' }}
        >
          <NavigationMenuList>
            <NavigationMenuItem className={cn('flex')}>
              <NavigationMenuTrigger className={cn('px-1')}>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CA</AvatarFallback>
                </Avatar>
                <span className="ml-2 hidden sm:inline-block">Carlo A.</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul>
                  <li>asdfasdf</li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
