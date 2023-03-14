import React from "react";
import Recipe from "../components/Recipe";
import { useParams } from "react-router-dom";

export default function RecipePage({ user, themeMode}) {
  const id = useParams()["recipeId"];
  return <Recipe recipeId={id} user={user} themeMode={themeMode} />;
}
