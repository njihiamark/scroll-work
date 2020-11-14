import React, { useState } from "react";
import useInfiniteScroll from "./useInfiniteScroll";

const ItemList = () => {
  const [Items, setItems] = useState(
    Array.from(Array(50).keys(), (n) => n + 1)
  );

  const [isFetching, setIsFetching, lastElementRef] = useInfiniteScroll(
    loadMoreItems
  );

  function loadMoreItems() {
    setIsFetching(true);
    setTimeout(() => {
      setItems((prevState) => [
        ...prevState,
        ...Array.from(Array(20).keys(), (n) => n + prevState.length + 1),
      ]);
      setIsFetching(false);
    }, 2000);
  }

  /*function handleLoadMoreButton(e) {
    e.target.blur();
    setIsFetching(true);
    loadMoreItems();
  }*/
  return (
    <React.Fragment>
      {Items.map((item, index) => {
        if (Items.length === index + 1) {
          return (
            <div ref={lastElementRef} key={index}>
              Item {item} last
            </div>
          );
        } else {
          return <div key={index}>Item {item}</div>;
        }
      })}
      {isFetching && <p>Fetching more items...</p>}
    </React.Fragment>
  );
};

export default ItemList;
