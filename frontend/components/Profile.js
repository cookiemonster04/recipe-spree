import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

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
        recipes[id] = recipeInfo.data;
      }
      setRecipes(recipes);
      console.log(recipes)
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
            {Object.values(recipes).map((recipe, idx) => (
              <Card key={`user_prof_fav_id_${idx}`} sx={{ maxWidth: 400, my: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image}
                  alt={recipe.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  <p>ingredients:</p>
                  <ul>
                  {recipe.ingredients.map((ingredient, idx) => (
                      <li>{ingredient.text}</li>
                    ))}
                  </ul>
                  </Typography>
                  <Link to={`/recipe/${favlist[idx]}`}>View Recipe</Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>You haven't added any favorite recipes yet!</p>
        )}
      </div>
    )
  );
};

export default Profile;
