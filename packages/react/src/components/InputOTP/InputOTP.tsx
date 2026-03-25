import { forwardRef, type ComponentPropsWithoutRef, useContext } from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Dot } from 'lucide-react';
import { cn } from '@josui/core-web';

export type InputOTPProps = ComponentPropsWithoutRef<typeof OTPInput>;

export const InputOTP = forwardRef<HTMLInputElement, InputOTPProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        'flex items-center gap-2 has-[:disabled]:opacity-50',
        containerClassName
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  )
);
InputOTP.displayName = 'InputOTP';

export type InputOTPGroupProps = ComponentPropsWithoutRef<'div'>;

export const InputOTPGroup = forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', className)} {...props} />
  )
);
InputOTPGroup.displayName = 'InputOTPGroup';

export type InputOTPSlotProps = ComponentPropsWithoutRef<'div'> & { index: number };

export const InputOTPSlot = forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = useContext(OTPInputContext);
    const slot = inputOTPContext.slots[index];
    if (!slot) return null;
    const { char, hasFakeCaret, isActive } = slot;

    return (
      <div
        ref={ref}
        className={cn(
          'border-input relative flex h-10 w-10 items-center justify-center border-y border-r text-sm transition-all',
          'first:rounded-l-md first:border-l last:rounded-r-md',
          isActive && 'ring-ring ring-offset-background z-10 ring-2',
          className
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
          </div>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = 'InputOTPSlot';

export type InputOTPSeparatorProps = ComponentPropsWithoutRef<'div'>;

export const InputOTPSeparator = forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  )
);
InputOTPSeparator.displayName = 'InputOTPSeparator';
