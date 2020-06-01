import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import uuid from 'uuid/v1';
import useFetch from 'use-http';

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState('serving');
  const [exp_date, setExpDate] = useState([]);
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const { get, post, response, loading, error } = useFetch('http://127.0.0.1:8000/api');
  const theme = isLightTheme ? light : dark;
  useEffect(() => {
    loadFoodList();
  }, []);

  async function loadFoodList() {
    const foodList = await get('/food_items');
    if (response.ok) setFoodItems(foodList);
  }

  async function addFoodItem(name, category, quantity, unit, exp_date) {
    const newFoodItem = await post('/food_items/', { name, category, quantity, unit, exp_date });
    if (response.ok) setFoodItems([...foodItems, newFoodItem]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addFoodItem(name, category, quantity, unit, exp_date);
    setName('');
    setCategory('');
    setQuantity('');
    setUnit('serving');
    setExpDate('');
  };

  return (
    <div>
      <div className="food_item_list">
        <div className="card text-white bg-warning mb-3">
          <h5 className="card-header">Expiring Soon</h5>
          <div className="card-body">
            <ul>
              {foodItems.map((foodItem) => (
                <div key={foodItem.id}>
                  <b>{foodItem.name}</b> {foodItem.quantity} {foodItem.unit} <b>EXPIRES: {foodItem.exp_date}</b>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="food_item_form" style={{ background: theme.bg, color: theme.syntax }}>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                placeholder="Banana"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="quantity">Amount</label>
              <input
                type="text"
                id="quantity"
                className="form-control"
                value={quantity}
                placeholder="#"
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="unit">Unit</label>
              <select
                id="unit"
                style={{ marginTop: '0.35em' }}
                className="form-control"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="serving">Serving</option>
                <option value="count">Count</option>
                <option value="package">Package</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                className="form-control"
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option>
                <option value="meat">Meat</option>
                <option value="carbs">Carbs</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="exp_date">Expiration Date</label>
              <input
                type="date"
                id="exp_date"
                className="form-control"
                value={exp_date}
                onChange={(e) => setExpDate(e.target.value)}
              />
            </div>
          </div>
          <input type="submit" value="Add Item" />
          {error && 'Error'}
          {loading && 'Loading...'}
        </form>
      </div>
    </div>
  );
};

export default FoodItemList;
