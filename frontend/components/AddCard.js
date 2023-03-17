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
