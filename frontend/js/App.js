import React from 'react';
import { hot } from 'react-hot-loader/root';
import SentryBoundary from './utils/SentryBoundary';
import Navbar from './components/Navbar';
import FoodItemList from './components/FoodItemList';
import ThemeContextProvider from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import AuthContextProvider from './contexts/AuthContext';
import FoodContextProvider from './contexts/FoodContext';
import Calendar from './components/Calendar';

/*const App = () => (
  <SentryBoundary>
    <ThemeContextProvider>
      <AuthContextProvider>
        <Navbar />
        <FoodContextProvider>
          
        </FoodContextProvider>
        <ThemeToggle />
      </AuthContextProvider>
    </ThemeContextProvider>
  </SentryBoundary>
);
*/

function App() {
  return (
    <div className="App">
      <SentryBoundary>
        <ThemeContextProvider>
          <AuthContextProvider>
            <Navbar />
                <FoodItemList />

                  <Calendar />

            <ThemeToggle />
          </AuthContextProvider>
        </ThemeContextProvider>
      </SentryBoundary>
    </div>
  );
}

export default hot(App);
