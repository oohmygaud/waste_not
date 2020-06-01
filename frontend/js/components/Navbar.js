import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';
import { FoodContext } from '../contexts/FoodContext';

const Navbar = () => {
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const { isAuthenticated, toggleAuth } = useContext(AuthContext);
  const theme = isLightTheme ? light : dark;
  return (
    <div className="navbar" style={{ background: theme.ui, color: theme.syntax}}>
        <h1>Waste Not</h1>
        <ul>
          <li>Add Item</li>
          <li>Recipe Lookup</li>
        </ul>
    </div>
  );
};

export default Navbar;
