import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, rows = 6, ...rest }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const errorId = `${textareaId}-error`;
    const hasError = Boolean(error);

    return (
      <>
        <label htmlFor={textareaId} className="block text-sm font-medium text-ink-700">
          {label}
        </label>
        <textarea
          {...rest}
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`mt-1.5 block w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-ink-900 shadow-sm transition placeholder:text-ink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-60 ${
            hasError ? 'border-red-500' : 'border-ink-500/20'
          } ${className}`}
        />
        {hasError && (
          <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        )}
      </>
    );
  }
);

Textarea.displayName = 'Textarea';
