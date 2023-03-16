import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Grid} from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Profile = ({ userId, user, themeMode }) => {
  const [username, setUsername] = useState("");
  const [favlist, setFavlist] = useState([]);
  const [recentlyViewedList, setRecentlyViewedList] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);
  const [recentRecipes, setRecentRecipes] = useState([]);

  const theme = createTheme({
    palette : {
      mode: themeMode
    }
  })

  useEffect(() => {
    console.log("a");
    async function getInfo() {
      if (!userId) {
        console.log("b");
        setUsername(user.username);
        // just to demonstrate it works
        const favInfo = await axios.get(`/api/fav`);
        setFavlist(favInfo.data.favorites);
        //setRecentlyViewedList(['0003d5b120']);
        const userInfo = await axios.get(`/api/user`);
        console.log("recentlyviewed: ");
        console.log(userInfo.data.recentlyViewed);
        setRecentlyViewedList(userInfo.data.recentlyViewed);
      } else {
        console.log("c");
        const userInfo = await axios.get(`/api/user/${userId}`);
        if (userInfo.hasOwnProperty("data")) {
          setUsername(userInfo.data.username);
        }
        const favInfo = await axios.get(`/api/fav/user/${userId}`);
        setFavlist(favInfo.data.favorites);
        //const rvInfo = await axios.get(`/api/`);
        // setRecentlyViewedList(['0003d5b120']); //replace
        setRecentlyViewedList(userInfo.data.recentlyViewed);
      }
    }
    getInfo();
  }, [userId]);

  useEffect(() => {
    async function getFavRecipes() {
      const recipes = [];
      for (const id of favlist) {
        const recipeInfo = await axios.get(`/api/recipe/${id}`);
        recipes[id] = recipeInfo.data.recipe;
      }
      setFavRecipes(recipes);
    }
    if (favlist.length > 0) {
      getFavRecipes();
    }
  }, [favlist]);

  useEffect(() => {
    async function getRecentRecipes() {
      const recipes = [];
      for (const id of recentlyViewedList) {
        const recipeInfo = await axios.get(`/api/recipe/${id}`);
        recipes[id] = recipeInfo.data.recipe;
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
        <h1>Welcome back, {username}.</h1>
        {favlist.length > 0 ? (
          <div>
            <Typography variant="h6">Your favorite recipes:</Typography>
            <Grid container spacing={2}>
              {Object.values(favRecipes).map((recipe, idx) => (
                <Grid key={`user_prof_fav_id_${idx}`} item xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{ maxWidth: 400, my: 2 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={recipe.image}
                      alt={recipe.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx={{ maxWidth: 400,
                       overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {recipe.title}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary">
                        {recipe.ingredients.join(", ")}
                      </Typography> */}
                      <Link to={`/recipe/${favlist[idx]}`}>View Recipe</Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <p>You haven't added any favorite recipes yet!</p>
        )}
      {recentlyViewedList.length > 0 ? (
        <div>
        <Typography variant="h6">Your recently viewed recipes:</Typography>
        <Grid container spacing={2}>
          {Object.values(recentRecipes).map((recipe, idx) => (
            <Grid key={`user_prof_fav_id_${idx}`} item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 400, my: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image}
                  alt={recipe.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ maxWidth: 400,
                   overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {recipe.title}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    {recipe.ingredients.join(", ")}
                  </Typography> */}
                  <Link to={`/recipe/${recentlyViewedList[idx]}`}>View Recipe</Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      ) : (
        <p>You haven't recently viewed any recipes.</p>
      )}
      </ThemeProvider>
    )
  );
};

export default Profile;
