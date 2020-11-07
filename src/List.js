import React, { useState } from "react";

const List = () => {
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
      <ul>
        {Items.map((item) => (
          <li key={item}>Item {item}</li>
        ))}
      </ul>
      {isFetching && "Fetching more items..."}
    </React.Fragment>
  );
};

export default List;
