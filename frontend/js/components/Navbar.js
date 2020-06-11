import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import Button from '@material-ui/core/Button';
import useFetch from 'use-http';

const Navbar = () => {
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const [profile, setProfile] = React.useState();
  const theme = isLightTheme ? light : dark;
  const api = useFetch('/api');
  useEffect(() => {
    getProfile()
  }, [])

  const { get, post, response, loading, error } = api;

  async function logout_user(e) {
    e.preventDefault()
    await post("/accounts/logout/")
    if (response.ok) window.location.pathname = "/login/"
  }

  async function getProfile() {
    await get("/accounts/profile/")
    if (response.ok) setProfile(response.data)
  }

  return (
    <div className="navbar" style={{ background: theme.ui, color: theme.syntax}}>
        <h1><a href="/">Waste Not</a></h1>
        <ul>
          <li><a href="/food_list">Food List</a></li>
          <li><a href="/planner">Meal Planner</a></li>
          <li><a href="/lookup">Recipe Lookup</a></li>
          {profile ? <li>
            <Button
              onClick={(e) => logout_user(e)}
              >Logout</Button></li> : ""}
        </ul>
    </div>
  );
};

export default Navbar;
