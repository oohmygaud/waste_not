import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import uuid from 'uuid/v1';
import useFetch from 'use-http';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// react component used to create charts
import ChartistGraph from 'react-chartist';
import MaterialTable from 'material-table';
import { Chart, PieSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { Animation, Palette } from '@devexpress/dx-react-chart';
import asparagus from '../static/asparagus.jpg';
import { schemeSet2 } from 'd3-scale-chromatic';
import moment from 'moment';

const FoodItemList = () => {
  const [expiringSoon, setExpiringSoon] = useState([]);
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState('serving');
  const [exp_date, setExpDate] = useState([]);
  const [status, setStatus] = useState();
  const [pieCount, setPieCount] = useState([]);
  const [searchItem, setSearchItem] = useState();
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const api = useFetch('http://127.0.0.1:8000/api', {
    cachePolicy: 'no-cache',
  });

  const { get, post, response, loading, error } = api;
  const theme = isLightTheme ? light : dark;
  useEffect(() => {
      const asyncPageLoaded = async () => {
            await loadFoodList();
            await getStatusCount()
      }
      asyncPageLoaded(); 
    }, []);

  async function loadFoodList() {
    const foodList = await get('/food_items/?expiring_soon=true&status=in_pantry');
    if (response.ok) setExpiringSoon(foodList);
  }

  async function addFoodItem(name, category, quantity, unit, exp_date) {
    const newFoodItem = await post('/food_items/', { name, category, quantity, unit, exp_date });
    const expiresIn = (new Date(exp_date) - new Date()) / (86400 * 1000);
    if (response.ok && expiresIn <= 5) await loadFoodList();
  }

  async function eatenFoodItem(item) {
    await api.put('/food_items/' + item.id + '/', { ...item, status: 'eaten' });
    await loadFoodList();
    await getStatusCount();
  }

  async function wastedFoodItem(item) {
    await api.put('/food_items/' + item.id + '/', { ...item, status: 'wasted' });
    await loadFoodList();
    await getStatusCount();
  }

  async function getStatusCount() {
      const response = await get('/status_count/')
      setPieCount(response);
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
      <Grid container spacing={2} style={{width: "100%"}} justify="center">
        <Grid item xs={12} md={7} lg={7}>
          <Card style={{ marginTop: '20px', background: theme.bg, color: theme.syntax }}>
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
              <Grid container justify="flex-end">
              <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" >Add Item</Button>
              </Grid>
              </Grid>
              {error && 'Error'}
              {loading && 'Loading...'}
            </form>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5} lg={3}>
          <Card
            style={{
              height: '260px',
              marginTop: '20px',
              background: theme.bg,
              color: theme.syntax,
            }}
          >
            <Chart data={pieCount} style={{ maxHeight: '260px', maxWidth: '350px', marginLeft: '1em' }}>
                <Palette scheme={schemeSet2} />
              <PieSeries valueField="count" argumentField="status" />
              <Legend />
              <Animation />
            </Chart>
          </Card>
        </Grid>
        <Grid item xs={12} md={9} lg={7}>
          <MaterialTable
            style={{ background: theme.bg, color: theme.syntax, height: '500px' }}
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Category', field: 'category' },
              { title: 'Quantity', field: 'quantity', type: 'numeric' },
              { title: 'Unit', field: 'unit' },
              { title: 'Eat By', field: 'exp_date' },
              { title: 'Recipes', field: 'recipes',
                render: (rowData) => <a href={"/lookup/"+rowData.name}>Get Recipes</a>},
            ]}
            data={expiringSoon.map((item) => ({
              id: item.id,
              name: item.name,
              category: item.category,
              quantity: item.quantity,
              unit: item.unit,
              exp_date: item.exp_date,
            }))}
            options={{
                rowStyle: rowData => ({
                    backgroundColor: (moment(rowData.exp_date).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD')) ? '#FABEA7' : '#FFF'
                })
            }}
            title="Expiring Soon"
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
        <Grid item xs={12} sm={3}>
          <Card style={{ height: '500px', background: theme.bg, color: theme.syntax }}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Food Waste Tip"
                height="230"
                image={asparagus}
                title="Food Waste Tip"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Trim a 1/4 inch off the bottoms of asparagus and place in water. Keep trimmed
                  asparagus in the refrigerator and watch it stay fresh for a week, sometimes even
                  two weeks! Some suggest covering the asparagus with a clean plastic bag, but
                  that’s optional.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
  );
};

export default FoodItemList;
