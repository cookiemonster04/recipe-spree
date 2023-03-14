import React, { useState } from "react";
//import { Navigate } from "react-router-dom";
import Recipe from "../components/Recipe"
import Explore from "../routes/Explore"
import "./RecipeList.css"

const RecipeList = ({user, themeMode}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [recipeIdz, setRecipeIdz] = useState([]);
    function showChecklist(){
        setIsOpen(val => !val);
    }

    return (
        isOpen ? (
            <div className="checklist-modal">
                <button onClick={ showChecklist }>Click me!</button>
                <Explore setRecipeIdz={setRecipeIdz} setIsOpen={ setIsOpen }/>
            </div>
        ) : (
                <div className="recipelist-container">
                <button onClick={ showChecklist }>Click me!</button>
                <div className="two-recipes-container">
                    <div className="recommended-recipes-container">
                        Recommended
                    </div>
                    <div className="searched-recipes-container">
                        {recipeIdz.length > 0  && recipeIdz.map(id => <Recipe user={user} recipeId={id} themeMode={ themeMode }/>)}
                    </div>
                </div>
            </div>
        )
        )
}

export default RecipeList;

/* <Recipe user={user} recipeId={id} themeMode={ themeMode } /> */