import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Grid, Typography, Box } from "@mui/material";
import RecipeCard from "./RecipeCard";

function RecommendPage({ user }) {
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getRecommend() {
      try {
        const response = await axios.post("/api/recipeRecommender", {
          selectedUsername: user.username,
        });
        console.log(response.data);
        setRecipeList(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        //setLoading(false);
      }
    }
    getRecommend();
  }, [user]);
  // console.log(`Recipe list length ${recipeList.length}`)
  if (loading) {
    return (
      <Typography marginTop={2} variant="h6" style={{ textAlign: "center" }}>
        Loading...
      </Typography>
    );
  }
  return (
    <div className="card-container">
      {recipeList.length > 0 ? (
        <>
          <Grid
            container
            spacing={2}
            className="ingredient-grid"
            marginTop={2} 
            marginBottom={2}
            justifyContent="space-evenly"
          >
            <Grid item xs="auto">
              <Typography variant="h6">
                Recommended recipes for you!
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <Button
                variant="contained"
                color={"primary"}
                href="/survey"
              >
                Update Preferences
              </Button>
            </Grid>
          </Grid>
          <Grid container my={2} spacing={2}>
            {recipeList.slice(0, 50).map((recipe, idx) => (
              <RecipeCard recipeId={recipe.id} idx={idx} />
            ))}
          </Grid>
        </>
      ) : (
        <Typography marginTop={2} variant="h6">
          No results. Please try to search something else. Please make sure you
          include ingredients.
        </Typography>
      )}
    </div>
  );
}

export default RecommendPage;
