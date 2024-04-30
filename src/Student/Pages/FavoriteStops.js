import React from "react";
import '../Pages/Styles/FavoriteStops.css';
function FavoriteStops() {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
  ];
  return (
    <div>
      <div className="container">
        <div className="scroll-view">
          {items.map((item) => (
            <div key={item.id} className="item">
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FavoriteStops;
