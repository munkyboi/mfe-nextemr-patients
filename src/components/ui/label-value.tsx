import { ReactNode } from 'react';

interface ILabelValueProps {
  label: string;
  value: ReactNode;
}

export default function LabelValue({ label, value }: ILabelValueProps) {
  return (
    <div className="space-y-0 break-after break-inside-avoid-column">
      <div className="text-[12px] leading-4 m-0 font-medium text-gray-400">
        {label}
      </div>
      <div className="text-md leading-6 font-regular">{value}</div>
    </div>
  );
}

export { LabelValue };
