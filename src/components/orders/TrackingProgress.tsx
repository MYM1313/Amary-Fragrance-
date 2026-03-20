import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

type Status = 'Pending' | 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

interface TrackingProgressProps {
  currentStatus: Status;
}

const STATUS_STEPS: Status[] = [
  'Pending',
  'Confirmed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

export function TrackingProgress({ currentStatus }: TrackingProgressProps) {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus);

  return (
    <div className="relative flex justify-between items-start w-full px-2">
      {/* Progress Line Background */}
      <div className="absolute top-3 left-6 right-6 h-[2px] bg-zinc-200 -z-0" />
      
      {/* Active Progress Line */}
      <div 
        className="absolute top-3 left-6 h-[2px] bg-emerald-500 transition-all duration-1000 -z-0"
        style={{ 
          width: `calc(${(currentIndex / (STATUS_STEPS.length - 1)) * 100}% - 12px)` 
        }}
      />

      {STATUS_STEPS.map((status, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div key={status} className="flex flex-col items-center gap-2 relative z-10 w-12">
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500",
                isCompleted ? "bg-emerald-500 text-white" :
                isActive ? "bg-white border-2 border-emerald-500 text-emerald-500 scale-110 shadow-sm" :
                "bg-white border-2 border-zinc-200 text-zinc-300"
              )}
            >
              {isCompleted ? (
                <Check size={12} strokeWidth={4} />
              ) : (
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  isActive ? "bg-emerald-500 animate-pulse" : "bg-zinc-200"
                )} />
              )}
            </div>
            <span
              className={cn(
                "text-[8px] font-black uppercase tracking-tighter text-center leading-tight",
                isActive ? "text-emerald-600" : "text-zinc-400"
              )}
            >
              {status}
            </span>
          </div>
        );
      })}
    </div>
  );
}
