import React from 'react';
import equal from 'fast-deep-equal';

function useDeepCompare(value: any) {
  const ref = React.useRef();
  if (!ref.current || !equal(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

export default function useEffectWithDeepCompare(
  callback: React.EffectCallback,
  dependencies?: React.DependencyList
) {
  return React.useEffect(callback, useDeepCompare(dependencies));
}
