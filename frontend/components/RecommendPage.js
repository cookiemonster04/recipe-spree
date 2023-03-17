import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";

function RecommendPage ({ user }) {
    const [recipeList, setRecipeList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getRecommend() {
            try {
                const response = await axios.post("/api/recipeRecommender", {
                    selectedUsername: user.username,
                })
                setRecipeList(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        getRecommend();
    }, [user])
    // console.log(`Recipe list length ${recipeList.length}`)
    if (loading) {
        return (
                <Typography marginTop={2} variant="h6" style={{ textAlign: 'center' }}>
                    Loading...
                </Typography>
        )
    }
    return (
        <div className="card-container">
          {recipeList.length > 0 ? (
            <>
                <Typography marginTop={2} variant="h6">Recommend recipes for you!</Typography>
                <Grid container my={2} spacing={2}>
                {recipeList.slice(0,50).map((recipe, idx) => <RecipeCard recipeId={recipe.id} idx={idx} />)}
                </Grid>
            </>
          ) : (
            <Typography marginTop={2} variant="h6">
              No results. Please try to search something else. Please make sure you include ingredients.
            </Typography>
          )}
        </div>
    );
};

export default RecommendPage;