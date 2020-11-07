import React, { useState } from "react";

const List = () => {
  const [Items, seItems] = useState(Array.from(Array(20).keys(), (n) => n + 1));
  return (
    <React.Fragment>
      <ul>
        {Items.map((item) => (
          <li>Item {item}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default List;
