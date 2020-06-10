import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useNavigation } from 'react-navi';
import useFetch from 'use-http';
import Grid from '@material-ui/core/Grid';

const RecipeLookUp = ({ search }) => {
  console.log('remount');
  const [searchItem, setSearchItem] = useState(search);
  const { loading, error, data = [], get } = useFetch(
    'http://127.0.0.1:8000/api/recipes/?search=' + searchItem,
    [search]
  );
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const navigation = useNavigation();
  const theme = isLightTheme ? light : dark;

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigation.navigate('/lookup/' + searchItem);
  };

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={8}>
          <center>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-sm-10 col-xs-12">
                  <input
                    autofocus
                    class="form-control"
                    placeholder="Enter food name to find a recipe"
                    type="text"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                  />
                </div>
                <div className="form-group col-sm-2">
                  <button className="btn btn-primary" type="submit" style={{ marginTop: '0.3em' }}>
                    Search
                  </button>
                </div>
              </div>
            </form>
            <div style={{ marginLeft: '0.5em' }}>
              <b>{loading ? 'LOADING...' : <>{data.length} results</>}</b>
              <br />
              <br />
              {data.map((recipe) => (
                <div key={recipe.id}>
                  <h5>
                    <a href={`http://127.0.0.1:8000/recipes/${recipe.id}`}>{recipe.title}</a>
                  </h5>
                </div>
              ))}
            </div>
          </center>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecipeLookUp;
