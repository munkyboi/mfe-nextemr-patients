import { CardHeader } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';

export default function PatientSearchBoxSkeleton() {
  return (
    <CardHeader className="gap-0">
      <Skeleton className="w-full h-[36px] rounded-sm" />
    </CardHeader>
  );
}

export { PatientSearchBoxSkeleton };
