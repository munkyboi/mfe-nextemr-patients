'use client';

import { ChevronDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from './collapsible';
import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ICollapsibleCardProps extends PropsWithChildren {
  title: ReactNode;
  description?: ReactNode;
  open?: boolean;
}

export const CollapsibleCard: FC<ICollapsibleCardProps> = ({
  title,
  description,
  open,
  children
}) => {
  const [isOpen, setIsOpen] = React.useState(open);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="flex-1 mb-4 break-after break-inside-avoid-column p-0">
        <CollapsibleTrigger
          asChild
          className="cursor-pointer hover:bg-gray-50 py-4 rounded-lg data-[state=open]:rounded-b-none"
        >
          <CardHeader className="flex flex-row items-center justify-start flex-nowrap">
            <div className="space-y-1 flex-grow flex flex-col items-start justify-center">
              <CardTitle>{title}</CardTitle>
              {description && (
                <CardDescription className="text-xs ">
                  {description}
                </CardDescription>
              )}
            </div>
            <div className="px-0">
              <ChevronDown
                className={cn('h-4 w-4 transition', {
                  'rotate-180': isOpen
                })}
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 pb-4 space-y-4">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
