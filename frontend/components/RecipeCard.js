import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Grid} from "@mui/material"

function RecipeCard({ recipeId, themeMode }){
    const [recipeInfo, setRecipeInfo] = useState();

    useEffect(() => {
        async function getInfo() {
          const response = await axios.get(`/api/recipe/${recipeId}`);
          setRecipeInfo(response.data.recipe);
          console.log(response.data.recipe);
        }
        getInfo();
      }, []);

    return (
        recipeInfo && (
            <Grid container spacing={2}>
                <Grid key={recipeId} item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ maxWidth: 400, my: 2 }}>
                        <CardMedia
                        component="img"
                        height="200"
                        image={recipeInfo.image}
                        alt={recipeInfo.title}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ maxWidth: 400,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {recipeInfo.title}
                        </Typography>
                        <Link to={`/recipe/${recipeId}`}>View Recipe</Link>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    )

}









export default RecipeCard;