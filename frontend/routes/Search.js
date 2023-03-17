import React, { useState, useEffect } from 'react';
import RecipeCard from "../components/RecipeCard"
import axios from "axios";
import './Search.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel, FormGroup, Button, Typography, Box, Paper, Grid } from '@mui/material';

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

  const darkMode = themeMode === 'dark';

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

  function handleSearchAgain() {
    console.log("clicked");
    setSubmitted(false);
    navigate('.', {
      state: {
        ...location.state,
        submitted: false
      }
    });
  }

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if( location.state && location.state.submitted && location.state.recipeIds ){
      setSubmitted(true);
      setRecipeIds(location.state.recipeIds)
    }
  }, [location]);

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

      navigate('.', {
        state: {
          ...location.state,
          submitted: true,
          recipeIds: response.data
        }
      });

    } catch (error) {
      console.log("ERROR")
      console.log(error.response)
    }
  }

  return (
    <>
    { !submitted ? (
      <Box className="container">
        <Paper className="form" elevation={3}>
        <Typography variant="h4" my={1} className="title">Discover your next favorite recipe!</Typography>
          <form onSubmit={handleSubmit}>
            <Box className="ingredient-grid">
              <FormGroup>
                <Typography variant="h6" className="include-exclude">Include:</Typography>
                {
                  Object.entries(formData).map(([key, value]) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={value}
                          onChange={handleChange}
                          name={key}
                          color={darkMode ? "secondary" : "primary"}
                        />
                      }
                      label={key}
                    />
                  ))
                }
              </FormGroup>
              <FormGroup>
                <Typography variant="h6" className="include-exclude">Exclude:</Typography>
                {
                  Object.entries(formData2).map(([key, value]) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={value}
                          onChange={handleChange2}
                          name={key}
                          color={darkMode ? "secondary" : "primary"}
                        />
                      }
                      label={key}
                    />
                  ))
                }
              </FormGroup>
            </Box>
            <Box className="submit-container">
              <Button type="submit" variant="contained" color={darkMode ? "secondary" : "primary"}>
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    ) :
      (
        <div className="card-container">
          <Button onClick={handleSearchAgain} variant="outlined" color={darkMode ? "secondary" : "primary"}>Search Again</Button>
          {recipeIds.length > 0 ? (
            <Grid container my={2} spacing={2}>
            {recipeIds.map((id, idx) => <RecipeCard recipeId={id} recipe={null} idx={idx} />)}
          </Grid>
          ) : (
            <Typography marginTop={2} variant="h6">
              No results. Please try to search something else.
            </Typography>
          )}
        </div>
      )
    }
  </>
  )
}

export default Search;
