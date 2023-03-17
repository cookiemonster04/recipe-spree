import React, { useState }from "react"
import { DndContext, rectIntersection } from "@dnd-kit/core";
import KanbanLane from "./KanbanLane";
import AddCard from "./AddCard";
import './KanbanBoard.css'
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";

export default function KanbanBoard( { user }) {
    const [submitted, setSubmitted] = useState(false)
    const [loveItems, setLoveItems] = useState([
        {title:"brocolli"},
        {title:"butter"},
        {title:"chicken"},
        {title:"spinach"},
        {title:"egg"},
        {title:"rice"},
    ])
    const [likeItems, setLikeItems] = useState([
        {title:"pork"},
        {title:"beef"},
        {title:"cheese"},
        {title:"garlic"},
        {title:"turkey"},
        {title:"peanut"},
    ])
    const [dislikeItems, setDislikeItems] = useState([
        {title:"tomato"},
        {title:"potato"},
        {title:"milk"},
        {title:"pasta"},
        {title:"onion"},
        {title:"corn"},
    ])
    const [allergicItems, setAllergicItems] = useState([
        {title:"olive"},
        {title:"tuna"},
        {title:"chile"},
        {title:"broth"},
        {title:"bacon"},
        {title:"mushroom"},
    ])

    const addNewCard = (title) => {
        setLoveItems([...loveItems,{title}]);
    };

    const submitArrays = () => {
        var loveIngredients = loveItems.map(function(item){
            return item['title'];
        });
        var likeIngredients = likeItems.map(function(item){
            return item['title'];
        });
        var dislikeIngredients = dislikeItems.map(function(item){
            return item['title'];
        });
        var allergicIngredients = allergicItems.map(function(item){
            return item['title'];
        });
        console.log(loveIngredients)
        console.log(likeIngredients)
        console.log(dislikeIngredients)
        console.log(allergicIngredients)
        console.log(user)
        axios.post("/api/surveyAdjuster", {
          selectedUsername: user.username,
          love: loveIngredients,
          like: likeIngredients,
          dislike: dislikeIngredients,
          blacklisted: allergicIngredients,
        })
        .then((response) => {
          setSubmitted(true)
        })

    }
    if(submitted) {
      return <Navigate to="/recommend" />
    }

    return (
        <Box>
        <h2 className="survey-title">Survey</h2>
        <p className="survey-description">Welcome! Please move ingredients in the proper section based on your preference. Feel free to add ingredients, too!</p>
        <DndContext
          collisionDetection={rectIntersection}
          onDragEnd={(e) => {
            const container = e.over?.id;
            const title = e.active.data.current?.title ?? "";
            const index = e.active.data.current?.index ?? 0;
            const parent = e.active.data.current?.parent ?? "Love";
            if (container === "Love") {
              setLoveItems([...loveItems, { title }]);
            }
            else if (container === "Dislike") {
              setDislikeItems([...dislikeItems, { title }]);
            }
            else if (container === "Allergic") {
              setAllergicItems([...allergicItems, { title }]);
            }
            else {
              setLikeItems([...likeItems, { title }]);
            }

            if (parent === "Love") {
              setLoveItems([
                ...loveItems.slice(0, index),
                ...loveItems.slice(index + 1),
              ]);
            } else if (parent === "Dislike") {
              setDislikeItems([
                ...dislikeItems.slice(0, index),
                ...dislikeItems.slice(index + 1),
              ]);
            } else if (parent === "Allergic") {
              setAllergicItems([...allergicItems.slice(0, index), ...allergicItems.slice(index + 1)]);
            } else {
              setLikeItems([
                ...likeItems.slice(0, index),
                ...likeItems.slice(index + 1),
              ]);
            }
          }}
        >
          <div className="full-board-container">
            <AddCard addCard={addNewCard} />
            <div className="four-col-container">
              <KanbanLane title="Love" items={loveItems} ind={0}/>
              <KanbanLane title="Like" items={likeItems} ind={1}/>
              <KanbanLane title="Dislike" items={dislikeItems} ind={2}/>
              <KanbanLane title="Allergic" items={allergicItems} ind={3}/>
            </div>
          </div>
        </DndContext>
        <button className="survey-submit" onClick={ submitArrays }>Submit</button>
        </Box>
      );
}