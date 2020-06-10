import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useNavigation } from 'react-navi';
import useFetch from 'use-http';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

const RecipeDetails = ({ id }) => {
  console.log('remount');
  const { loading, error, data = {}, get } = useFetch(`http://127.0.0.1:8000/api/recipes/${id}/`, [
    id,
  ]);
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;
  if (loading) return 'Loading..';

  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Card style={{ margin: '0.5em', padding: '1em', background: theme.bg, color: theme.syntax }}>
            <h4>{data.title}</h4>
            {data.ingredients.map((ingredient) => (
              <div key={ingredient.id}>{ingredient.name}</div>
            ))}
            <br />
            {data.instructions.map((instruction) => (
              <div key={instruction.id}>{instruction.step}<br /><br /></div>
              
            ))}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecipeDetails;
