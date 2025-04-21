import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Eye, EyeOff, UserMinus, UserRoundCheck } from 'lucide-react';
import { useQueue } from '@/context/queue.context';
import { Badge } from '../ui/badge';
import { filterQUeue } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Spinner } from '../ui/spinner';

interface IQueueWidgetActiveFilterProps {
  isFetching?: boolean;
}

export const QueueWidgetActiveFilter = ({
  isFetching
}: IQueueWidgetActiveFilterProps) => {
  const { queue, filters, saveFilter } = useQueue();
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    if (filters) {
      if (filters.length > 1) setShowAll(false);
      if (filters.length === 0) setShowAll(true);
    }
  }, [filters]);

  if (!queue || !filters) return null;

  const activeItems = filterQUeue(queue, ['active']);
  const inactiveItems = filterQUeue(queue, ['inactive']);
  const filteredQueue = filterQUeue(queue, filters);
  const handleActiveClick = () => {
    let newFilters = filters;
    if (filters.includes('active')) {
      newFilters = filters.filter((n) => n !== 'active');
    } else {
      newFilters = [...filters, 'active'];
    }
    saveFilter(newFilters);
  };
  const handleInactiveClick = () => {
    let newFilters = filters;
    if (filters.includes('inactive')) {
      newFilters = filters.filter((n) => n !== 'inactive');
    } else {
      newFilters = [...filters, 'inactive'];
    }
    saveFilter(newFilters);
  };
  const handleShowAll = () => {
    saveFilter(showAll ? ['active', 'inactive'] : []);
    setShowAll((prev) => !prev);
  };

  return (
    <div className="flex flex-row items-center flex-nowrap gap-2">
      <div className="text-[10px]">
        <span className="font-bold">{filteredQueue?.length}</span> patients
        in-queue
      </div>
      <div className="grow flex gap-2 justify-end border-r pr-2">
        {isFetching && <Spinner className="w-5 h-5" />}
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant={filters.includes('active') ? 'default' : 'outline'}
              className="cursor-pointer text-[10px] flex gap-2"
              onClick={handleActiveClick}
            >
              <UserRoundCheck size={10} />
              <span className="font-bold">{activeItems?.length}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle to show/hide active queues</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant={filters.includes('inactive') ? 'default' : 'outline'}
              className="cursor-pointer text-[10px] flex gap-2"
              onClick={handleInactiveClick}
            >
              <UserMinus size={10} />
              <span className="font-bold">{inactiveItems?.length}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle to show/hide inactive queues</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="text-right">
        <Button
          variant="link"
          className="text-[10px] m-0 has-[>svg]:px-0"
          onClick={handleShowAll}
        >
          {!showAll ? (
            <EyeOff size={8} className="w-[12px] h-[12px]" />
          ) : (
            <Eye size={8} className="w-[12px] h-[12px]" />
          )}
          <span>{!showAll ? 'Hide all' : 'Show all'}</span>
        </Button>
      </div>
    </div>
  );
};

export default QueueWidgetActiveFilter;
