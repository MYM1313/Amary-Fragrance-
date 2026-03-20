import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Tag, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CouponSystemProps {
  onApply: (discount: number) => void;
  subtotal: number;
}

export function CouponSystem({ onApply, subtotal }: CouponSystemProps) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleApply = () => {
    if (!code.trim()) return;

    if (code.toUpperCase() === 'SAVE10') {
      const discount = subtotal * 0.1;
      onApply(discount);
      setStatus('success');
      setMessage('Coupon applied! 10% discount added.');
    } else {
      onApply(0);
      setStatus('error');
      setMessage('Invalid coupon code.');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-4 shadow-sm">
      <div className="flex items-center gap-2 text-zinc-900 font-bold">
        <Tag size={18} className="text-emerald-600" />
        <h3>Apply Coupon</h3>
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            label=""
            placeholder="Enter code (e.g. SAVE10)"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setStatus('idle');
              setMessage('');
            }}
            className="py-2.5"
          />
        </div>
        <Button
          onClick={handleApply}
          variant="secondary"
          className="h-[46px] mt-1.5"
        >
          Apply
        </Button>
      </div>

      {status !== 'idle' && (
        <div
          className={cn(
            "flex items-center gap-2 text-sm font-medium p-3 rounded-xl animate-in fade-in slide-in-from-top-2",
            status === 'success' ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          )}
        >
          {status === 'success' ? (
            <CheckCircle2 size={16} />
          ) : (
            <XCircle size={16} />
          )}
          {message}
        </div>
      )}
    </div>
  );
}
