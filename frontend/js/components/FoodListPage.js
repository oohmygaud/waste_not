import React, { useState, useEffect, useContext, forwardRef } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import useFetch from 'use-http';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';

const FoodListPage = () => {
  const [foodList, setFoodList] = useState([]);
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const api = useFetch('http://127.0.0.1:8000/api', {
    cachePolicy: 'no-cache',
  });
  const { loading, error, response, data = [], get } = api;
  useEffect(() => {
    loadFoodList()
  }, [])

  async function loadFoodList() {
     const list = await get('/food_items/?status=in_pantry');
     console.log(list)
     if (response.ok) setFoodList(list)
  }

  async function eatenFoodItem(item) {
    await api.put('/food_items/' + item.id + '/', { ...item, status: 'eaten' });
    await loadFoodList();
  }

  async function wastedFoodItem(item) {
    await api.put('/food_items/' + item.id + '/', { ...item, status: 'wasted' });
    await loadFoodList();
  }

  return (
    <div>
      <Grid container justify="center" style={{ marginTop: "20px"}}>
        <Grid item xs={12} lg={8}>
          <MaterialTable
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Category', field: 'category' },
              { title: 'Quantity', field: 'quantity', type: 'numeric' },
              { title: 'Unit', field: 'unit' },
              { title: 'Eat By', field: 'exp_date', type: 'date' },
              { title: 'Recipes', field: 'recipes',
                render: (rowData) => <a href={"/lookup/"+rowData.name}>Get Recipes</a>}
            ]}
            data={foodList.map((foodItem) => ({
              id: foodItem.id,
              name: foodItem.name,
              category: foodItem.category,
              quantity: foodItem.quantity,
              unit: foodItem.unit,
              exp_date: foodItem.exp_date,
            }))}
            title="Food Items"
            actions={[
              {
                icon: () => <i className="material-icons">check_circle_outline</i>,
                tooltip: 'Eaten',
                onClick: (e, rowData) => eatenFoodItem(rowData),
              },
              {
                icon: () => <i className="material-icons">delete_sweep</i>,
                tooltip: 'Wasted',
                onClick: (e, rowData) => wastedFoodItem(rowData),
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default FoodListPage;

/*<div key={foodItem.id}>
          <b>{foodItem.name}</b> {foodItem.quantity} {foodItem.unit}{' '}
          <b>EXPIRES: {foodItem.exp_date}</b>
          <button
            style={{ marginBottom: '0.5em' }}
            className="btn btn-link"
            onClick={() => removeFoodItem(foodItem.id)}
          >
            -
          </button>
        </div>{' '} */
