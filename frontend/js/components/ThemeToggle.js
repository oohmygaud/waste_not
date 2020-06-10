import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import Button from '@material-ui/core/Button';

const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext)
  return (
    <Button onClick={toggleTheme}>Toggle the theme</Button>
  )
}

export default ThemeToggle;