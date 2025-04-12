'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import { CalendarDaysIcon, ChevronDown, ListIcon } from 'lucide-react';
import QueueWidget from '../queue/queue-widget';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { useQueue } from '@/context/queue.context';

export default function Header() {
  const { open } = useSidebar();
  const { isOpen, toggleOpen } = useQueue();
  const handleQueueOpen = (e: boolean) => {
    toggleOpen(e);
  };
  return (
    <div
      className={cn(
        'header fixed top-0 right-0 left-0 md:left-[256px] px-4 bg-background flex flex-nowrap h-16 z-50 transition-[left]',
        {
          'md:left-0': !open
        }
      )}
    >
      <div className="flex justify-start items-center w-full">
        <div className="grow  flex items-center">
          <div className="flex flex-nowrap justify-start items-center gap-0">
            <SidebarTrigger className="rounded-full" />
            <div className="border-r border-gray-300 ml-2 pr-2">
              <Popover open={isOpen} onOpenChange={handleQueueOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost">
                    <ListIcon size={16} className="mr-2" />
                    <span className="hidden sm:inline-block">Queue</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="max-w-lg min-w-[100svw] md:h-auto md:min-w-lg"
                >
                  <QueueWidget />
                </PopoverContent>
              </Popover>
            </div>
            <div className="ml-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost">
                    <CalendarDaysIcon size={16} className="mr-2" />
                    <span className="hidden sm:inline-block">Appointments</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <div>asdfasdfasdf</div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>
              <span className="ml-2 hidden sm:inline-block">Carlo A.</span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
