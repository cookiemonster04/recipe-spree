import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';
import slide1 from '../../assets/slide1.png'
import slide2 from '../../assets/slide2.png'
import slide3 from '../../assets/slide3.png'
import slide4 from '../../assets/slide4.png'
import slide5 from '../../assets/slide5.png'

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
    fontFamily: 'Agency FB, sans-serif',
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  width: "475px",
  // height: '300px'
}));

const slides = [
  {
    title: "About Us",
    text: "Welcome to RecipeSpree - your ultimate cooking companion! Our mission is to help you discover delectable recipes with ease. By learning about your culinary preferences, we can curate a personalized culinary experience just for you!",
    backgroundImageUrl: slide1,
  },
  {
    title: "Search",
    text: "Craving a specific ingredient in your meal? With RecipeSpree, you can easily customize your recipe search with just a few clicks! Our search page lets you filter and find recipes that have every ingredient you desire.",
    backgroundImageUrl: slide2,
  },
  {
    title: "Recommend", 
    text: "Looking for inspiration? RecipeSpree has got you covered! Our recommendation page provides you with a variety of handpicked recipes tailored to your specific tastes. Whether you're a foodie or a picky eater, we've got something for everyone.",
    backgroundImageUrl: slide3,
  },
  {
    title: "Profile", 
    text: "Your very own culinary journey awaits you on RecipeSpree! Keep track of your recent activity and favorite recipes all in one place on your profile page. You can easily revisit your favorite recipes and discover new ones to try!",
    backgroundImageUrl: slide4,
  },
  {
    title: "Interact",
    text: "Share your thoughts and opinions with the RecipeSpree community! Leave comments, ratings, and favorites on recipes to help others find the best results. By interacting with others, you can discover new recipes and learn more about different culinary preferences.",
    backgroundImageUrl: slide5,
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
        <Carousel showArrows autoPlay infiniteLoop interval={5000} showThumbs={false}>
          {slides.map((slide, index) => (
            <Box
              key={index}
              className="slide-bg"
              sx={{
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                //justifyContent: 'flex-start', // Change from 'center' to 'flex-start'
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url(${slide.backgroundImageUrl})`,
                backgroundSize: 'cover', // Add this line to resize the background image according to the screen size
                backgroundPosition: 'center', // Add this line to keep the background image centered
              }}
            >
              <Paper
                elevation={6}
                sx={{
                  maxWidth: '35%',
                  padding: 4,
                  marginLeft: 10, // Add this line to provide some left margin
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 2,
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 10px 12px rgba(0, 0, 0, 0.6)',
                }}
              >
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: '3.0rem', textShadow: '1.8px 1.8px 4px #888' }}>
                  {slide.title}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ fontSize: '1.7rem', textShadow: '0.5px 0.5px 0.5px #888' }}>
                  {slide.text}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Carousel>
        <Container>
          <Grid container spacing={5} sx={{ marginTop: '2px', marginLeft: '2px'}}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} marginLeft={10} marginRight={10}>
                <StyledPaper elevation={3}>
                  <Typography variant="h6" component="h2" gutterBottom sx={{ fontSize: '2rem', textShadow: '1.2px 1.2px 1.2px #888' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ fontSize: '1.4rem', textShadow: '0.5px 0.5px 0.5px #888' }}>
                    {step.text}
                  </Typography>
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
