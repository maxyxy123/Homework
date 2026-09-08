import { useState, useEffect, useRef, useCallback } from 'react';

interface CountdownControls {
  start: () => void;
  pause: () => void;
  reset: () => void;
  isRunning: boolean;
}

export function useCountdown(initialSeconds: number): [number, CountdownControls] {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (timeLeft > 0) setIsRunning(true);
  }, [timeLeft]);

  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            return 0; 
          }
          return prev - 1;
        });
      }, 1000);
    }

   
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  return [timeLeft, { start, pause, reset, isRunning }];
}