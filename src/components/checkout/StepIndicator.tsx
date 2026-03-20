import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full px-2 py-6">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step} className="flex flex-col items-center flex-1 relative">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-10",
                isCompleted ? "bg-emerald-600 text-white" : 
                isActive ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-600 ring-offset-2" : 
                "bg-zinc-100 text-zinc-400"
              )}
            >
              {isCompleted ? <Check size={16} strokeWidth={3} /> : index + 1}
            </div>
            <span
              className={cn(
                "text-[10px] uppercase tracking-wider font-bold mt-2 transition-colors duration-300",
                isActive ? "text-emerald-700" : "text-zinc-400"
              )}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-4 left-1/2 w-full h-[2px] -z-0",
                  isCompleted ? "bg-emerald-600" : "bg-zinc-100"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
