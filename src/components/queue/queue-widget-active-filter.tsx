import { useState } from 'react';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';

export const QueueWidgetActiveFilter = () => {
  const [showAll, setShowAll] = useState(true);
  const handleShowAll = () => setShowAll((prev) => !prev);
  return (
    <Button
      variant="link"
      className="text-[10px] m-0 has-[>svg]:px-0"
      onClick={handleShowAll}
    >
      {showAll ? <Eye size={8} className="w-[12px] h-[12px]" /> : <EyeOff />}
      <span>{showAll ? 'Show all' : 'Show active only'}</span>
    </Button>
  );
};

export default QueueWidgetActiveFilter;
