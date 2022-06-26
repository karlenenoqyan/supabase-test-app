import {useEffect, DependencyList} from 'react';

const useDebounceEffect = (
  fn: () => void,
  waitTime: number,
  deps?: DependencyList,
): void => {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps as []);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDebounceEffect;
