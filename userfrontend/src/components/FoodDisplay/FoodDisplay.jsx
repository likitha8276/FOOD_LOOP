import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodCard from "../FoodCard/FoodCard";
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // 🛡️ Guard against undefined
  if (!food_list || !Array.isArray(food_list)) {
    return <div className="food-display"><p>Loading food list...</p></div>;
  }

  const filteredFoodList = category
    ? food_list.filter(item => item.category?.toLowerCase() === category.toLowerCase())
    : food_list;

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {
          filteredFoodList.map((item) => (
            <FoodCard
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))
        }
      </div>
    </div>
  );
};

export default FoodDisplay;
