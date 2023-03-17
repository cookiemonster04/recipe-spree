import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as SStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as RStar } from "@fortawesome/free-regular-svg-icons";
import "./Recipe.css";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Recipe({ user, recipeId, themeMode }) {

  const [recipeInfo, setRecipeInfo] = useState();
  const [star, setStar] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [recipeRating, setRecipeRating] = useState(-1); //need to update with APi call
  const [userRating, setUserRating] = useState(10);
  const [numRating, setNumRating] = useState(0);
  const [ratingStar, setRatingStar] = useState([]);
  const [hasRated, setHasRated] = useState(false);
  const [numFav, setNumFav] = useState(0);


  const theme = createTheme({
    palette: {
      mode: themeMode
    }
  })

  // load recipe json & push to recentlyViewed
  useEffect(() => {
    async function getInfo() {
      const response = await axios.get(`/api/recipe/${recipeId}`);
      setRecipeInfo(response.data.recipe);
      setNumFav(response.data.recipe.favorites);
      setRecipeRating(response.data.recipe.rating.stars / 2);
      setNumRating(response.data.recipe.rating.numRatings);

      if(user && user.ratings && user.ratings.hasOwnProperty(recipeId)) {
        setUserRating(user.ratings[recipeId]);
        setHasRated(true);
      }
    }
    getInfo();
  }, []);
  useEffect(() => {
    if (!user) return;
    axios.get(`/api/fav/recipe/${recipeId}`).then((res) => {
      setStar(res.data.found);
    });
    axios.post(`/api/recentRecipe`, { userId: user.username, recipeId: recipeId });
  }, [user]);
  useEffect(() => {
    if (!user || star === null) return;
    axios.post(`/api/fav`, {
      recipeId: recipeId,
      insert: star,
    });
  }, [star]);

  const handleStarClick = async () => {
    try {
      if (star === true) {
        await axios.post(`/api/removeStar`, {itemID: recipeId});
        setNumFav(numFav - 1);
      } else {
        await axios.post(`/api/addStar`, {itemID: recipeId});
        setNumFav(numFav + 1);
      }
      setStar((prev) => !prev);
    } catch (error) {
      console.error(error)
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText === "") {
      return;
    }
    try {
      await axios.post(`/api/addComment`, {
        itemID: recipeId,
        selectedUsername: user.username,
        comment: commentText,
      });
      setRecipeInfo({
        ...recipeInfo,
        comments: [...recipeInfo.comments, {text: commentText}]
      })
      setCommentText("");
      console.log(user.comments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingChange = (e) => {
    setUserRating(e.target.value);
  }

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const response = await axios.get(`/api/recipe/${recipeId}`);
    console.log(response.data);
    try {
      await axios.post(`/api/addRating`, {
        itemID: recipeId,
        newRating: userRating, 
        user: user.username 
      });
      await axios.post(`/api/recipeAdjuster`, {
        selectedUsername: user.username,
        recipeId: recipeId,
        score: userRating
      })
      const newNumRatings = response.data.recipe.rating.numRatings + 1;
      const newTotalStars = response.data.recipe.rating.stars + userRating;
      const newAverageRating = newTotalStars / newNumRatings;
      console.log(newNumRatings);
      console.log(newTotalStars);
      console.log(newAverageRating);
      setNumRating(newNumRatings)
      setRecipeRating(newAverageRating/2);
      setHasRated(true)
      // e.preventDefault();
    } catch (error) {
      console.error(error)
    }
  }
  const ratings = [0,1,2,3,4,5,6,7,8,9,10]

  useEffect(() => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      let id = i;
      let fill = "none";
      if (i <= recipeRating) {
        fill = "#737178";
      } else if (i - recipeRating < 1) {
        fill = `url(#star-gradient-${id})`;
      }
      stars.push(
        <svg
          key={id}
          className="star"
          stroke="#737178"
          strokeWidth="12px"
          viewBox="0 0 576 512"
          size="100"
          height="30"
          width="30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`star-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${(1 - (i - recipeRating)) * 100}%`} stopColor="#737178" />
              <stop offset={`${(1 - (i - recipeRating)) * 100}%`} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            fill={fill}
          ></path>
        </svg>
      );
    }
    setRatingStar(stars);
  }, [recipeRating])
  

  return (
    recipeInfo && (
      <ThemeProvider theme={theme}>
      <Paper className={`root ${themeMode === 'light' ? '' : 'dark'}`} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" className="title" textAlign="left">
                {recipeInfo.title}
                {user && (
                  <FontAwesomeIcon
                  className={star ? "filled" : "empty"}
                  icon={star ? SStar : RStar}
                  size="lg"
                  onClick={handleStarClick}
                />
                )}
              </Typography>
            </Box>
            {recipeRating >= 0 && (
            <Box display="flex" alignItems="center" paddingLeft={1} paddingTop={2}>
              <Typography variant="p" className="avgRating" textAlign="left" paddingRight={2}>
                Average users' rating:
              </Typography>
              {ratingStar}
            </Box>
            )}
            <Box display="flex" alignItems="center" paddingLeft={1} paddingTop={2}>
              <Typography variant="p" className="avgRating" textAlign="left" paddingRight={2}>
                {`${numFav} users favorite this recipe.`}
              </Typography>
            </Box>
            <Box marginTop={2}>
              <Typography variant="subtitle1" color="textSecondary" className="subtitle">
                Ingredients:
              </Typography>
              <List className="ingredients">
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
              <List className="instructions">
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
              <img className="image" src={recipeInfo.image} alt={recipeInfo.title}/>
            </Box>
            <Box className="rating" marginBottom={2}>
            {user && (
                <form onSubmit={handleRatingSubmit}>
                  <Box marginTop={2}>
                  {hasRated ? (
                    <Typography variant="body2" color="textSecondary" className="body2" marginBottom={1}>
                      You have already rated this recipe.
                    </Typography>
                  ) : (
                    <Typography variant="subtitle1" color="textSecondary" className="subtitle" marginBottom={1}>
                      Tried cooking this recipe? Leave a rating!
                    </Typography>
                  )}
                    <TextField
                    id="user-rating"
                    select
                    label="Select"
                    defaultValue={userRating}
                    helperText="10 highest, 0 lowest"
                    onChange={handleRatingChange}
                    disabled={hasRated}
                    >
                    {ratings.map((rating) => (
                      <MenuItem key={rating} value={rating}>
                        {rating}
                      </MenuItem>
                    ))}
                    </TextField>
                  </Box>
                  <Box marginTop={1}>
                    <Button variant="contained" color="primary" type="submit" disabled={hasRated}>
                      Submit Rating
                    </Button>
                  </Box>
                </form>
              )}
            </Box>
            <Box className="comments">
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
                    <TextField
                      fullWidth
                      id="comment-textfield"
                      label="Comment"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      // onChange={(e) => e.target.value !== "" ? setCommentText(e.target.value) : null}
                    />
                    <Box marginTop={1}>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
              </Box>
          </Grid>
        </Grid>
      </Paper>
      </ThemeProvider>
    ))
}        

export default Recipe;
