import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Recipe.css";

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

  const rating = 4.5; //change to API call

  let stars = [];
  for (let i = rating; i > 1; i--) {
    let id = i;
    stars.push(
      <svg key={id} className="star" stroke="none" fill="#737178" viewBox="0 0 576 512" size="100" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
      </svg>
    );
  }
  
  return (
    recipeInfo && (
      <div className="recipe">
        <div className="head">
          <div className="left-head">
            <div className="recipe-title">
             <h1>{recipeInfo.title}</h1>
            </div>
            <div className="rating">
              {stars}
            </div>
          </div>
          <div className="right-head">
            <center>
              <img src={recipeInfo.image} />
            </center>
          </div>
        </div>
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
