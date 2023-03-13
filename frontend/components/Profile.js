import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Grid} from "@mui/material"

const Profile = ({ userId, user }) => {
  const [username, setUsername] = useState("");
  const [favlist, setFavlist] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getInfo() {
      if (!userId) {
        setUsername(user.username);
        // just to demonstrate it works
        const favInfo = await axios.get(`/api/fav`);
        setFavlist(favInfo.data.favorites);
      } else {
        const userInfo = await axios.get(`/api/user/${userId}`);
        if (userInfo.hasOwnProperty("data")) {
          setUsername(userInfo.data.username);
        }
        const favInfo = await axios.get(`/api/fav/user/${userId}`);
        setFavlist(favInfo.data.favorites);
      }
    }
    getInfo();
  }, [userId]);

  useEffect(() => {
    async function getRecipes() {
      const recipes = [];
      for (const id of favlist) {
        const recipeInfo = await axios.get(`/api/recipe/${id}`);
        recipes[id] = recipeInfo.data.recipe;
      }
      setRecipes(recipes);
    }
    if (favlist.length > 0) {
      getRecipes();
    }
  }, [favlist]);

  return (
    username && (
      <div>
        <h1>Welcome back, {username}</h1>
        {favlist.length > 0 ? (
          <div>
            <Typography variant="h6">Your favorite recipes:</Typography>
            <Grid container spacing={2}>
              {Object.values(recipes).map((recipe, idx) => (
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
      </div>
    )
  );
};

export default Profile;
