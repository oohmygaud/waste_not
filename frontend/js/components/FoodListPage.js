import React, { useState, useEffect, useContext, forwardRef } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import useFetch from 'use-http';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';

const FoodListPage = () => {
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const { loading, error, data = [], get } = useFetch('http://127.0.0.1:8000/api/food_items', []);

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
            data={data.map((foodItem) => ({
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
              },
              {
                icon: () => <i className="material-icons">delete_sweep</i>,
                tooltip: 'Wasted',
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
