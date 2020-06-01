import React, { createContext, useState} from 'react';
import uuid from 'uuid/v1';

export const FoodContext = createContext();

const FoodContextProvider = (props) => {
  const [foodItems, setFoodItems] = useState([
    { name: 'bananas', id: 1, type: 'fruit' },
    { name: 'bread', id: 2, type: 'carbs' },
    { name: 'asparagus', id: 3, type: 'vegetable' }
  ])
  const addFoodItem = (name, type) => {
    setFoodItems([...foodItems, {name, type, id: uuid()}])
  }
  const removeFoodItem = (id) => {
    setFoodItems([foodItems.filter(foodItem => foodItem.id !== id)])
  }
  return (
    <FoodContext.Provider value ={{foodItems, addFoodItem, removeFoodItem}}>
      {props.children}
    </FoodContext.Provider>
  );
}
export default FoodContextProvider;