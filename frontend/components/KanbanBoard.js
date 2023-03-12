import React, { useState }from "react"
import { DndContext, rectIntersection } from "@dnd-kit/core";
import KanbanLane from "./KanbanLane";
import AddCard from "./AddCard";
import './KanbanBoard.css'

export default function KanbanBoard() {
    const [loveItems, setLoveItems] = useState([
        {title:"brocolli"},
        {title:"butter"},
        {title:"chicken"},
        {title:"spinach"},
        {title:"egg"},
        {title:"rice"},
        {title:"mushroom"},
        {title:"peanut"},
    ])
    const [likeItems, setLikeItems] = useState([
        {title:"pork"},
        {title:"beef"},
        {title:"cheese"},
        {title:"garlic"},
        {title:"orange"},
        {title:"turkey"},
        {title:"coconut"},
        {title:"yogurt"},
    ])
    const [dislikeItems, setDislikeItems] = useState([
        {title:"tomato"},
        {title:"potato"},
        {title:"milk"},
        {title:"pasta"},
        {title:"onion"},
        {title:"corn"},
        {title:"beet"},
    ])
    const [allergicItems, setAllergicItems] = useState([
        {title:"olive"},
        {title:"tuna"},
        {title:"lentils"},
        {title:"chile"},
        {title:"broth"},
        {title:"bacon"},
        {title:"strawberry"}
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
    }

    return (
        <>
        <h2 className="survey-title">Initial Survey</h2>
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
              <KanbanLane title="Love" items={loveItems} />
              <KanbanLane title="Like" items={likeItems} />
              <KanbanLane title="Dislike" items={dislikeItems} />
              <KanbanLane title="Allergic" items={allergicItems} />
            </div>
          </div>
        </DndContext>
        <button className="survey-submit" onClick={ submitArrays }>Submit</button>
        </>
      );
}

/*
          <div className="full-board-container">
            <AddCard addCard={addNewCard} />
            <div className="board-top-container">
              <KanbanLane title="Love" items={loveItems} />
              <KanbanLane title="Like" items={likeItems} />
              <KanbanLane title="Dislike" items={dislikeItems} />
              <KanbanLane title="Allergic" items={allergicItems} />
            </div>
          </div>
        </DndContext>
        <button onClick={ submitArrays }>Submit</button>


          <Flex flexDirection="column">
            <AddCard addCard={addNewCard} />
            <Flex flex="3">
              <KanbanLane title="Love" items={loveItems} />
              <KanbanLane title="Like" items={likeItems} />
              <KanbanLane title="Dislike" items={dislikeItems} />
              <KanbanLane title="Allergic" items={allergicItems} />
            </Flex>
          </Flex>
        </DndContext>
        <button onClick={ submitArrays }>Submit</button>
*/