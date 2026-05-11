import { useEffect, useRef, useState } from 'react';

export interface UseClipboardOptions {
  /** Time in ms after which the copied state will reset, `2000` by default */
  timeout?: number;
}

export interface UseClipboardReturnValue {
  /** Function to copy value to clipboard */
  copy: (value: string) => void;

  /** Function to reset copied state and error */
  reset: () => void;

  /** Error if copying failed */
  error: Error | null;

  /** Boolean indicating if the value was copied successfully */
  copied: boolean;
}

export function useClipboard(options: UseClipboardOptions = { timeout: 2000 }): UseClipboardReturnValue {
  const [error, setError] = useState<Error | null>(null);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopyResult = (value: boolean) => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => setCopied(false), options.timeout);
    setCopied(value);
    setError(null);
  };

  const copy = (value: string) => {
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(value)
        .then(() => handleCopyResult(true))
        .catch((err) => setError(err));
    } else {
      setError(new Error('useClipboard: navigator.clipboard is not supported'));
    }
  };

  const reset = () => {
    setCopied(false);
    setError(null);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return { copy, reset, error, copied };
}
