import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as SStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as RStar } from "@fortawesome/free-regular-svg-icons";
import "./Recipe.css";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blue, grey } from "@material-ui/core/colors";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Grid,
  Paper,
  Button,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    padding: theme.spacing(2),
    maxWidth: 800,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  ingredients: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  instructions: {
    marginBottom: theme.spacing(3),
  },
  comments: {
    marginBottom: theme.spacing(3),
  },
}));

function Recipe({ user, recipeId, themeMode }) {
  
  const classes = useStyles();

  const handleStarClick = () => {
    setStar((prev) => !prev);
  };

  const [recipeInfo, setRecipeInfo] = useState();
  const [star, setStar] = useState(null);
  const [commentText, setCommentText] = useState("");
  // load recipe json
  useEffect(() => {
    async function getInfo() {
      const response = await axios.get(`/api/recipe/${recipeId}`);
      setRecipeInfo(response.data.recipe);
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`/api/comment/${recipeId}`, {
      text: commentText,
    });
    const newComment = response.data.comment;
    setRecipeInfo((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));
    setCommentText("");
  };
  

  const rating = 4.5; //change to API call

  let stars = [];
  for (let i = 1; i <= 5; i++) {
    let id = i;
    let fill;
    if (i < rating) fill = "#737178";
    else fill = "none";
    stars.push(
      <svg
        key={id}
        className="star"
        stroke="#737178"
        stroke-width="12px"
        fill={fill}
        viewBox="0 0 576 512"
        size="100"
        height="30"
        width="30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
      </svg>
    );
  }

  return (
    recipeInfo && (
      <Paper className={`root ${themeMode === 'light' ? '' : 'dark'}`}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" className={classes.title}>
                {recipeInfo.title}
                <FontAwesomeIcon
                  className={star ? "filled" : "empty"}
                  icon={star ? SStar : RStar}
                  size="lg"
                  onClick={handleStarClick}
                />
              </Typography>
              <Box display="flex" alignItems="center">
                {stars}
              </Box>
            </Box>
            <Box marginTop={2}>
              <Typography variant="subtitle1" color="textSecondary" className="subtitle">
                Ingredients:
              </Typography>
              <List className={classes.ingredients}>
                {recipeInfo.ingredients.map((item, index) => (
                  <ListItem key={`ingredients-${index}`} dense disableGutters>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box>
              <Typography variant="subtitle1" color="textSecondary" className="subtitle">
                Instructions:
              </Typography>
              <List className={classes.instructions}>
                {recipeInfo.instructions.map((item, index) => (
                  <ListItem key={`instructions-${index}`} dense disableGutters>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box height={300} width={1} position="relative">
              <img className={classes.image} src={recipeInfo.image} alt={recipeInfo.title} />
            </Box>
            <Box className={classes.comments}>
              <Typography variant="subtitle1" color="textSecondary" className="subtitle">
                Comments from users:
              </Typography>
              {recipeInfo.comments.length > 0 ? (
                <List>
                  {recipeInfo.comments.map((comment, index) => (
                    <React.Fragment key={`comments-${index}`}>
                      <Divider variant="middle" />
                      <ListItem dense>
                        <ListItemText
                          primary={<Typography variant="body2">{comment.text}</Typography>}
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary" className="body2">
                  No comments yet.
                </Typography>
              )}
              {user && (
                <form onSubmit={handleCommentSubmit}>
                  <Box marginTop={2}>
                    <Typography variant="subtitle1" color="textSecondary" className="subtitle">
                      Leave a comment:
                    </Typography>
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <Box marginTop={1}>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </form>)}
              </Box>
          </Grid>
        </Grid>
      </Paper>
    ))
}        

export default Recipe;
