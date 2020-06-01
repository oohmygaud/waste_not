import React, { useContext } from 'react';
import { FoodContext } from '../contexts/FoodContext';

const FoodDetails = ({foodItem}) => {
  const { removeFoodItem } = useContext(FoodContext) 
  return (
    <li onClick={ () => removeFoodItem(foodItem.id)}>
      <div className="name">{foodItem.name}</div>
      <div className="type">{foodItem.type}</div>
    </li>
  )
}

export default FoodDetails;