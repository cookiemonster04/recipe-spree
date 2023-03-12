import React, { useState } from "react"
import "./KanbanBoard.css"

export default function AddCard({addCard}){
    const [title,setTitle] = useState("");

    return (
        <div className="center-input">
            <div className="input-container">
                <p className="input-title">
                    Ingredient:
                </p>
                <input
                    type="text"
                    className="ingredient-input"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <button
                    className="add-button"
                    onClick={() => {
                        setTitle("")
                        addCard(title)
                    }}
                >
                    Add
                </button>
            </div>
        </div>
    )
}

/*
            <Button
                flex="1"
                marginX="3"
                bgColor="green.400"
                color="white"
                onClick={() => {
                    setTitle("")
                    addCard(title)
                }}
            >
                Add
            </Button>
*/