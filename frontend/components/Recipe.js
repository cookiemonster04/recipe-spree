import React, { useState, useEffect } from "react";
import axios from "axios";
const Recipe = ({ recipeId }) => {
  const [recipeInfo, setRecipeInfo] = useState();
  // load recipe json
  useEffect(() => {
    async function getInfo() {
      const response = await axios.get(`/api/recipe/${recipeId}`);
      setRecipeInfo(response.data);
    }
    getInfo();
  }, []);
  return (
    recipeInfo && (
      <div className="recipe">
        <h1>{recipeInfo.title}</h1>
        <img src={recipeInfo.image} />
        <div className="recipe-ingredients">
          <h2>Ingredients:</h2>
          <ul>
            {recipeInfo.ingredients.map((item, index) => (
              <li key={`ingredients-${index}`}>{item.text}</li>
            ))}
          </ul>
        </div>
        <div className="recipe-instructions">
          <h2>Instructions:</h2>
          <ol>
            {recipeInfo.instructions.map((item, index) => (
              <li key={`instructions-${index}`}>{item.text}</li>
            ))}
          </ol>
        </div>
      </div>
    )
  );
};
export default Recipe;
