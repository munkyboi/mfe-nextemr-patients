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
      <Card className="flex-1 mb-4 break-after break-inside-avoid-column">
        <CollapsibleTrigger className="flex flex-row items-center justify-start flex-nowrap">
          <CardHeader className="flex-grow flex flex-col items-start justify-center">
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <div className="px-4">
            <ChevronDown
              className={cn('h-4 w-4 transition', {
                'rotate-180': isOpen
              })}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <CardContent>{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
