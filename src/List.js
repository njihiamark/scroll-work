import React, { useState } from "react";
import { List } from "semantic-ui-react";

const ItemList = () => {
  const [Items, setItems] = useState(
    Array.from(Array(20).keys(), (n) => n + 1)
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
      {isFetching && "Fetching more items..."}
    </React.Fragment>
  );
};

export default ItemList;
