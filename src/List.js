import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";

const ItemList = () => {
  const [Items, setItems] = useState(
    Array.from(Array(30).keys(), (n) => n + 1)
  );
  const [isFetching, setIsFetching] = useState(false);

  function loadMoreItems() {
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    loadMoreItems();
  }, [isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      setIsFetching(true);
    }
  }

  return (
    <React.Fragment>
      <List divided relaxed>
        {Items.map((item) => (
          <List.Item key={item}>
            <List.Content>
              <List.Description>Item {item}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
      {isFetching && <p>Fetching more items...</p>}
    </React.Fragment>
  );
};

export default ItemList;
