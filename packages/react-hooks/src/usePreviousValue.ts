import { useRef, useEffect } from 'react';

/**
 * Used to track previous value of a state setter
 * Example usage:
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * @param value Initial value
 * @returns Last value of the state that was updated
 */
export default function usePreviousValue(value: any): any {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
