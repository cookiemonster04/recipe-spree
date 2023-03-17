import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Grid} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./Profile.css";

const RecipeCard = ({ recipe, idx }) => {
  return(
    <Grid key={`recipe ${recipe.id}`} item xs={12} sm={6} md={4} lg={3}>
      <Card className="card" sx={{ maxWidth: 400, my: 2}}>
        <CardMedia
          component="img"
          height="200"
          image={recipe.image}
          alt={recipe.title}
        />
        <CardContent>
          <Typography 
            gutterBottom
            variant="h5"
            component="div" 
            sx={{ 
              maxWidth: 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}>
            {recipe.title}
          </Typography>
          <Link className="link" to={`/recipe/${recipe.id}`}>View Recipe</Link>
        </CardContent>
      </Card>
    </Grid>
  )
};

const Profile = ({ userId, user, themeMode }) => {
  const [username, setUsername] = useState("");
  const [favList, setFavList] = useState([]);
  const [recentlyViewedList, setRecentlyViewedList] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);
  const [recentRecipes, setRecentRecipes] = useState([]); 

  const theme = createTheme({
    palette : {
      mode: themeMode
    }
  })
  //get user info
  useEffect(() => {
    async function getInfo() {
      if (!userId) {
        setUsername(user.username);
        const favInfo = await axios.get(`/api/fav`);
        setFavList(favInfo.data.favorites);
        const userInfo = await axios.get(`/api/user`);
        setRecentlyViewedList(userInfo.data.recentlyViewed);
      } else {
        const userInfo = await axios.get(`/api/user/${userId}`);
        if (userInfo.hasOwnProperty("data")) {
          setUsername(userInfo.data.username);
        }
        const favInfo = await axios.get(`/api/fav/user/${userId}`);
        setFavList(favInfo.data.favorites);
        setRecentlyViewedList(userInfo.data.recentlyViewed);
      }
    }
    getInfo();
  }, [userId]);
  //set fav list
  useEffect(() => {
    async function getFavRecipes() {
      const recipes = [];
      for (const id of favList) {
        const recipeInfo = await axios.get(`/api/recipe/${id}`);
        recipes.push(recipeInfo.data.recipe);
      }
      setFavRecipes(recipes);
    }
    if (favList.length > 0) {
      getFavRecipes();
    }
  }, [favList]);
  //set recent view list
  useEffect(() => {
    async function getRecentRecipes() {
      const recipes = [];
      for (const id of recentlyViewedList) {
        const recipeInfo = await axios.get(`/api/recipe/${id}`);
        recipes.push(recipeInfo.data.recipe);
      }
      setRecentRecipes(recipes);
    }
    if (recentlyViewedList.length > 0) {
      getRecentRecipes();
    }
  }, [recentlyViewedList]); 
  return (
    username && (
      <ThemeProvider theme={theme}>
        <div className={"profile-container"}>
          <Typography variant="h3" marginBottom={2} className="section-header"> Welcome back, {username}. </Typography>
          <Typography variant="h6" marginBottom={2}>
            Click 
            <Link className="link" to={{ pathname: "/survey", state: { user: user }}}>{" here "}</Link>
            to update your preference.
          </Typography>
          <Typography variant="h6" marginBottom={2}>
            Click 
            <Link className="link" to={{ pathname: "/recommend", state: { user: user }}}>{" here "}</Link>
            view recommend recipe.
          </Typography>
          {favList.length > 0 ? (
            <div className="card-container">
              <Typography variant="h6" className="section-header">
                Your favorite recipes:
              </Typography>
              <Grid container spacing={2}>
                {favRecipes.map((recipe, idx) => (
                  <RecipeCard recipe={recipe} idx={idx} />
                ))}
              </Grid>
            </div>
          ) : (
            <p>You haven't added any favorite recipes yet!</p>
          )}
          {recentlyViewedList.length > 0 ? (
            <div className="card-container">
            <Typography variant="h6" className="section-header">
              Your recently viewed recipes:
            </Typography>
            <Grid container spacing={2}>
              {recentRecipes.map((recipe, idx) => (
                <RecipeCard recipe={recipe} idx={idx} />
              ))}
            </Grid>
          </div>
          ) : (
            <p>You haven't recently viewed any recipes.</p>
          )} 
        </div>
      </ThemeProvider>
    )
  );
};

export default Profile;
