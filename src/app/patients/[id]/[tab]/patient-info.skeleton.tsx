import { Skeleton } from '@/components/ui/skeleton';

export default function PatientInfoSkeleton() {
  return (
    <div className="fluid mx-auto">
      <div className="flex flex-col sm:flex-row flex-nowrap gap-y-4 sm:gap-4">
        <div className="relative w-full sm:w-[200px] flex flex-col justify-start items-center space-y-4">
          <Skeleton className="rounded-full aspect-square h-[200px] w-[200px] mb-6" />
          <div className="flex flex-col items-center w-full">
            <Skeleton className="min-w-[140px] w-[70%] h-[26px] mb-1" />
            <Skeleton className="w-[194px] h-[14px] mb-4" />
            <div className="flex flex-nowrap items-center justify-center gap-2">
              <Skeleton className="w-[99px] h-[32px]" />
              <Skeleton className="w-[72px] h-[32px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
