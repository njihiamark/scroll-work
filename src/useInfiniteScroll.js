import { useState, useRef, useCallback } from "react";

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, callback]
  );

  return [isFetching, setIsFetching, lastElementRef];
};

export default useInfiniteScroll;
