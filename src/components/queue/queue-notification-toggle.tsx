import { Bell, BellOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export const QueueNotificationToggle = () => {
  const [isActive, setIsActive] = useState(true);
  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <Button
      variant="ghost"
      className="p-0 rounded-full w-8 h-8 cursor-pointer"
      onClick={handleToggle}
    >
      {isActive ? <Bell /> : <BellOff />}
    </Button>
  );
};

export default QueueNotificationToggle;
