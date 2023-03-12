import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as SStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as RStar } from "@fortawesome/free-regular-svg-icons";
import "./Recipe.css";

const Recipe = ({ user, recipeId }) => {
  const [recipeInfo, setRecipeInfo] = useState();
  const [star, setStar] = useState(null);
  // load recipe json
  useEffect(() => {
    async function getInfo() {
      const response = await axios.get(`/api/recipe/${recipeId}`);
      setRecipeInfo(response.data);
    }
    getInfo();
  }, []);
  useEffect(() => {
    if (!user) return;
    axios.get(`/api/fav/recipe/${recipeId}`).then((res) => {
      setStar(res.data.found);
    });
  }, [user]);
  useEffect(() => {
    if (!user || star === null) return;
    axios.post(`/api/fav`, {
      recipeId: recipeId,
      insert: star,
    });
  }, [star]);
  return (
    recipeInfo && (
      <div className="recipe">
        <h1>
          {recipeInfo.title}{" "}
          {star !== null && (
            <FontAwesomeIcon
              className={star ? "filled" : "empty"}
              icon={star ? SStar : RStar}
              size="lg"
              onClick={() => setStar((cstar) => !cstar)}
            />
          )}
        </h1>
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
