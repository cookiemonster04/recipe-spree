import React, { useState } from 'react';
import RecipeCard from "../components/RecipeCard"
import axios from "axios";
import './Search.css'

const Search = ({themeMode}) => {
  const [include, setInclude] = useState([]);
  const [exclude, setExclude] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const initialList = {
    brocolli: false,
    butter: false,
    chicken: false,
    spinach: false,
    egg: false,
    rice: false,
    pork: false,
    beef: false,
    cheese: false,
    garlic: false,
    turkey: false,
    tomato: false,
    potato: false,
    milk: false,
    pasta: false,
    onion: false,
    corn: false,
    olive: false,
    tuna: false,
    chile: false,
    broth: false,
    bacon: false,
    mushroom: false,
    peanut: false,
  }

  const [formData, setFormData] = useState(initialList);
  const [formData2, setFormData2 ] = useState(initialList);
  const [recipeIds, setRecipeIds] = useState([]);

    function updateInclude(name, isChecked){
      const isFound = include.includes(name);
      if(isChecked && !isFound){
        setInclude([
          ...include,
          name
        ])
      }
      else if (!isChecked && isFound){
        setInclude(include.filter(ingredient => name !== ingredient))
      }
    }

    function updateExclude(name, isChecked){
      const isFound = exclude.includes(name);
      console.log(isChecked);
      if(isChecked && !isFound){
        setExclude([
          ...exclude,
          name
        ])
      }
      else if (!isChecked && isFound){
        setInclude(exclude.filter(ingredient => name !== ingredient))
      }
    }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const isChecked = checked;
    setFormData (prevData => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked: value
      }
    })
    updateInclude(name, isChecked);
  }

  function handleChange2(event) {
    const { name, value, type, checked } = event.target;
    const isChecked = checked;
    setFormData2 (prevData => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked: value
      }
    })
    updateExclude(name, isChecked);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/api/search',
      {
        desired: include,
        undesired: exclude,
      });
      setRecipeIds(response.data);

      setSubmitted(true);
    } catch (error) {
      console.log("ERROR")
      console.log(error.response)
    }
  }

  return (
    <>
    { !submitted ? (
    <div className="ingredient-form-container">
    <form onSubmit={ handleSubmit } className="ingredient-form">
      <h1 className="title">Discover your next favorite recipe!</h1>
      <div className="ingredient-grid">
        <h2 className="include-exclude">Include:</h2>
        <h2 className="include-exclude">Exclude:</h2>
        <div className="ingredient-options">

          {
                Object.entries(formData).map(([key, value]) => (
                  <Checkbox
                    label={key}
                    value={value}
                    onChange={ handleChange }
                    key={key}
                  />
              ))
            }
        </div>

        <div className="ingredient-options">
          {
              Object.entries(formData2).map(([key, value]) => (
                <Checkbox
                  label={key}
                  value={value}
                  onChange={ handleChange2 }
                  key={key}
                />
            ))
          }
        </div>
      </div>
      <div className="submit-container">
        <button className="checklist-submit">
          Submit
        </button>
      </div>
    </form>
  </div>
    ) :
    (
      <div>
        {recipeIds.length > 0  && recipeIds.map(id => <RecipeCard key={id} recipeId={id} themeMode={ themeMode }/>)}
      </div>
    )
  }
    </>
  )
}

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        name={label}
      />
      {label}
    </label>
  )
}

export default Search;
