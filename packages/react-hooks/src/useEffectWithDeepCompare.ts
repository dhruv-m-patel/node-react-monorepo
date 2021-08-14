import { useRef, useEffect } from 'react';
import equal from 'fast-deep-equal';

function useDependencyCheck(value) {
  const ref = useRef();
  if (!ref.current || !equal(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

/**
 * A custom hook equivalent to useEffect but meant for use when you can have objects as dependencies to the hook
 * React.useEffect uses Object.is for comparing object dependencies which is inefficient and causes too many rerenders
 * Reference: https://github.com/kentcdodds/use-deep-compare-effect
 * @param callback Callback function to execute as effect
 * @param dependencies Array of dependencies to check for running callback function
 * @returns useEffect callback updated to run with deep compared dependencies for objects
 */
export default function useEffectWithDeepCompare(callback, dependencies) {
  return useEffect(callback, useDependencyCheck(dependencies));
}
