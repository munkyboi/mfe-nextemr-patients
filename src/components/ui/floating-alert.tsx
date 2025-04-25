'use-client';

import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { Alert, AlertDescription } from './alert';
import { CircleAlert, X } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { useSidebar } from './sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from './spinner';

interface IActionButton {
  label: ReactNode;
  onClick: () => void;
  icon?: ReactNode;
}

export type IFloatAlertVariants =
  | 'positive'
  | 'destructive'
  | 'info'
  | 'warning'
  | 'default'
  | string;

interface IFloatingAlert {
  variant?: IFloatAlertVariants;
  icon?: ReactNode;
  description: ReactNode;
  actionButton?: IActionButton | undefined;
  exitable?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  autoHide?: boolean;
  autoHideDuration?: number | null;
  processing?: boolean;
}

export const FloatingAlert: FC<IFloatingAlert> = ({
  variant = 'default',
  icon = <CircleAlert className="h-8 w-8" />,
  description,
  actionButton,
  exitable = true,
  open: controlledOpen,
  onOpenChange,
  autoHide = false,
  autoHideDuration = 5000,
  processing
}) => {
  const { open: sidebarOpen } = useSidebar();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const getButtonCss = () => {
    let css = 'bg-white text-gray-800 hover:bg-white/50 border-white/50';
    if (variant === 'positive')
      css =
        'bg-white shadow-xs hover:bg-green-600 text-green-500 hover:text-white';
    if (variant === 'destructive')
      css = 'bg-white shadow-xs hover:bg-red-600 text-red-500 hover:text-white';
    if (variant === 'info')
      css =
        'bg-white shadow-xs hover:bg-blue-600 text-blue-500 hover:text-white';
    if (variant === 'warning')
      css =
        'bg-white shadow-xs hover:bg-orange-600 text-orange-500 hover:text-white';
    return css;
  };

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  useEffect(() => {
    if (open && autoHide && autoHideDuration !== null) {
      const timer = setTimeout(() => {
        handleOpenChange(false);
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [open, autoHide, autoHideDuration, handleOpenChange]);
  return (
    <div
      className={cn(
        'flex flex-nowrap justify-center fixed bottom-4 md:left-[255px] left-0 right-0 transition-[left]',
        {
          'md:left-0': !sidebarOpen
        }
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 400 }}
            className="pointer-events-auto"
          >
            <Alert
              variant={variant}
              className="text-[12px] w-auto items-center justify-start p-2 min-h-[42px]"
            >
              {processing ? <Spinner size="small" /> : icon}
              <AlertDescription>
                <div className="w-full flex flex-row flex-nowrap gap-4 items-center">
                  <div className="flex-grow">{description}</div>
                  {actionButton && (
                    <Button
                      className={cn(
                        'text-[12px] px-4 py-2 h-auto leading-2',
                        getButtonCss()
                      )}
                      onClick={actionButton.onClick}
                    >
                      {actionButton.icon && actionButton.icon}
                      {actionButton.label}
                    </Button>
                  )}
                  {exitable && (
                    <Button
                      className="w-6 h-6 rounded-full bg-white/30 text-white"
                      onClick={() => handleOpenChange(false)}
                    >
                      <X className="w-12 h-12" />
                    </Button>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingAlert;
