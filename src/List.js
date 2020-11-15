import React, { useState, useEffect } from "react";
import useInfiniteScroll from "./useInfiniteScroll";
import axios from "axios";

const ItemList = () => {
  const [Items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [HasMore, setHasMore] = useState(false);

  const [isFetching, setIsFetching, lastElementRef] = useInfiniteScroll(
    HasMore ? loadMoreItems : () => {}
  );

  useEffect(() => {
    loadMoreItems();
  }, []);

  function loadMoreItems() {
    setIsFetching(true);
    setPage((prevPageNumber) => prevPageNumber + 1);
    axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/albums",
      params: { _page: page, _limit: 40 },
    })
      .then((res) => {
        setItems((prevTitles) => {
          return [...new Set([...prevTitles, ...res.data.map((b) => b.title)])];
        });
        setHasMore(res.data.length > 0);
        setIsFetching(false);
      })
      .catch((e) => {
        console.log(e);
      });
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
      {isFetching && <p>Fetching items...</p>}
    </React.Fragment>
  );
};

export default ItemList;
