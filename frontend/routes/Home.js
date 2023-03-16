import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';
import logo from '../../assets/logo.png'

const theme = createTheme({
  palette: {
    primary: {
      main: '#5c6bc0',
    },
    secondary: {
      main: '#f06292',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const slides = [
  {
    title: "About Us",
    text: "Welcome to RecipeSpree - your ultimate cooking companion! Our mission is to help you discover delectable recipes with ease. By learning about your culinary preferences, we can curate a personalized culinary experience just for you!",
    backgroundImageUrl: logo,
  },
  {
    title: "Search",
    text: "Craving a specific ingredient in your meal? With RecipeSpree, you can easily customize your recipe search with just a few clicks! Our search page lets you filter and find recipes that have every ingredient you desire.",
    backgroundImageUrl: logo,
  },
  {
    title: "Recommend", 
    text: "Looking for inspiration? RecipeSpree has got you covered! Our recommendation page provides you with a variety of handpicked recipes tailored to your specific tastes. Whether you're a foodie or a picky eater, we've got something for everyone.",
    backgroundImageUrl: logo,
  },
  {
    title: "Profile", 
    text: "Your very own culinary journey awaits you on RecipeSpree! Keep track of your recent activity and favorite recipes all in one place on your profile page. You can easily revisit your favorite recipes and discover new ones to try!",
    backgroundImageUrl: logo,
  },
  {
    title: "Interact",
    text: "Share your thoughts and opinions with the RecipeSpree community! Leave comments, ratings, and favorites on recipes to help others find the best results. By interacting with others, you can discover new recipes and learn more about different culinary preferences.",
    backgroundImageUrl: logo,
  }
];

const steps = [
  {
    title: "Step 1: Getting Started",
    text:"Ready to elevate your culinary experience? Let\'s get started with RecipeSpree! Simply create an account and take our initial survey to determine your taste preferences. By getting to know you better, we can curate recipes that will leave you wanting more."
  },
  {
    title: "Step 2: Rate Your Favorites",
    text: "Cooking up a storm? Be sure to leave ratings on the recipes you try! Your feedback is important to us and helps us understand your unique preferences. This way, we can adjust our recommendations and provide you with even better recipes tailored to your taste."
  },
  {
    title: "Step 3: Get Personalized Recommendations",
    text: "Looking for something new to cook? Our recommendation page is the perfect place to find inspiration! With our unique algorithm, we curate a variety of handpicked recipes tailored specifically to your taste. From healthy meals to indulgent desserts, we've got you covered."
  }
];

const Homepage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Carousel showArrows autoPlay infiniteLoop interval={5000}>
          {slides.map((slide, index) => (
            <Box
              key={index}
              className="slide-bg" // Add the background and animation classes
              sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${slide.backgroundImageUrl})`,
              }}
            >
              <Paper
                elevation={6}
                sx={{
                  maxWidth: '80%',
                  padding: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h4" component="h1" gutterBottom>
                  {slide.title}
                </Typography>
                <Typography variant="body1">{slide.text}</Typography>
              </Paper>
            </Box>
          ))}
        </Carousel>
        <Container>
          <Grid container spacing={4} sx={{ marginTop: 4 }}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <StyledPaper elevation={2}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2">{step.text}</Typography>
                </StyledPaper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;
