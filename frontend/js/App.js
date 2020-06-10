import React from 'react';
import { hot } from 'react-hot-loader/root';
import SentryBoundary from './utils/SentryBoundary';
import Navbar from './components/Navbar';
import FoodItemList from './components/FoodItemList';
import FoodListPage from './components/FoodListPage';
import RecipeLookUp from './components/RecipeLookup';
import RecipeDetails from './components/RecipeDetails';
import MealPlanner from './components/MealPlanner';
import Register from './components/Register';
import Login from './components/Login';
import ThemeContextProvider from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import AuthContextProvider from './contexts/AuthContext';
import { View } from 'react-navi';
import { lazy, mount, route } from 'navi';
import { Router } from 'react-navi';
import Cookie from "js.cookie";
import  { Provider as FetchProvider } from 'use-http'
import 'chartist/dist/chartist.css';

// Define your routes
const routes = mount({
  '/': route({
    title: 'Dashboard',
    view: <FoodItemList />,
  }),
  '/lookup': route({
    view: <RecipeLookUp />,
  }),
  '/lookup/:search': route({
    getView: ({ params }) => {
      return <RecipeLookUp {...params} />;
    },
  }),
  '/recipes/:id': route({
    getView: ({ params }) => {
      return <RecipeDetails {...params} />;
    },
  }),
  '/planner': route({
    view: <MealPlanner />,
  }),
  '/food_list': route({
    view: <FoodListPage />,
  }),
  '/register': route({
    view: <Register />,
  }),
  '/login': route({
    view: <Login />,
  }),
});

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <ThemeToggle />
    </>
  );
};

function App() {
  const options = {
    headers: {
      "X-CSRFToken": Cookie.get( "csrftoken" ),
    },
  };
  return (
    <div className="App">
      <SentryBoundary>
        <FetchProvider options={options}>
        <ThemeContextProvider>
          <AuthContextProvider>
            <Router routes={routes}>
              <Layout>
                <View />
              </Layout>
            </Router>
          </AuthContextProvider>
        </ThemeContextProvider>
        </FetchProvider>
      </SentryBoundary>
    </div>
  );
}

export default hot(App);
