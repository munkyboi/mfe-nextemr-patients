import { Skeleton } from '../ui/skeleton';

export function QueueWidgetSkeleton() {
  return (
    <div className="py-2">
      <div className="px-2">
        <div className="w-full flex flex-nowrap gap-4">
          <div className="grow overflow-hidden space-y-2">
            <Skeleton className="w-[60%] h-[22px]" />
            <Skeleton className="min-w-[205px] w-[40%] h-[14px]" />
          </div>
          <div className="flex flex-col flex-nowrap items-end space-y-2">
            <Skeleton className="min-w-[67px] w-[100%] h-[12px]" />
            <Skeleton className="w-[80%] h-[22px]" />
          </div>
        </div>
      </div>
      <div className="px-2 mt-9 mb-4 w-full">
        <div className="h-[calc(100dvh-230px)] md:h-64 w-full rounded-md border">
          <div className="relative flex items-center justify-between px-4 py-4 border-b">
            <div className="w-full flex items-center gap-2">
              <div className="w-[60px] flex flex-col space-y-2 items-center">
                <Skeleton className="w-[100%] h-[16px]" />
                <Skeleton className="w-[50%] h-[14px]" />
              </div>
              <div className="grow space-y-2">
                <Skeleton className="w-[70%] h-[16px]" />
                <Skeleton className="w-[50%] h-[12px]" />
              </div>
              <div className="flex flex-nowrap items-center gap-0">
                <Skeleton className="w-[60px] h-[12px]" />
              </div>
              <Skeleton className="p-0 rounded-full w-8 h-8 cursor-pointer" />
            </div>
          </div>
          <div className="relative flex items-center justify-between px-4 py-4 border-b">
            <div className="w-full flex items-center gap-2">
              <div className="w-[60px] flex flex-col space-y-2 items-center">
                <Skeleton className="w-[100%] h-[16px]" />
                <Skeleton className="w-[50%] h-[14px]" />
              </div>
              <div className="grow space-y-2">
                <Skeleton className="w-[70%] h-[16px]" />
                <Skeleton className="w-[50%] h-[12px]" />
              </div>
              <div className="flex flex-nowrap items-center gap-0">
                <Skeleton className="w-[60px] h-[12px]" />
              </div>
              <Skeleton className="p-0 rounded-full w-8 h-8 cursor-pointer" />
            </div>
          </div>
          <div className="relative flex items-center justify-between px-4 py-4 border-b">
            <div className="w-full flex items-center gap-2">
              <div className="w-[60px] flex flex-col space-y-2 items-center">
                <Skeleton className="w-[100%] h-[16px]" />
                <Skeleton className="w-[50%] h-[14px]" />
              </div>
              <div className="grow space-y-2">
                <Skeleton className="w-[70%] h-[16px]" />
                <Skeleton className="w-[50%] h-[12px]" />
              </div>
              <div className="flex flex-nowrap items-center gap-0">
                <Skeleton className="w-[60px] h-[12px]" />
              </div>
              <Skeleton className="p-0 rounded-full w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-2">
        <Skeleton className="p-0 w-full h-[36px]" />
      </div>
    </div>
  );
}
