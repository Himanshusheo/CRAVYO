import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if ((category === "All" || category === item.category))
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;

// Development commit #1

// Development commit #2

// Development commit #3

// Development commit #4

// Development commit #5

// Development commit #1

// Development commit #2

// Development commit #3

// Development commit #4

// Development commit #5
