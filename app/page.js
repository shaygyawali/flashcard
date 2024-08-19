'use client'
import { useState } from 'react';
import { getShuffledVideos } from '@/utils/get-videos';
import Image from 'next/image';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Flashcard from './components/flashcard';

import {
  Container,
  Grid,
  Button,
  Typography,
  Box,
} from '@mui/material';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [showText, setShowText] = useState(true); // State to manage text visibility

  const loadVideos = async () => {
    const shuffledVideos = await getShuffledVideos();
    setVideos(shuffledVideos);
    setShowText(false); // Hide the text and background effect after the first shuffle
  };

  // Function to clean the title
  const cleanTitle = (title) => {
    return title.replace(/^\d+:\s*/, ''); // Remove any leading number followed by a colon and optional space
  };

  return (
    <Container
      sx={{
        width: '80%',
        height: '90vh',
        maxWidth: 'none',
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: showText ? 'center' : 'flex-start', // Center content initially, align to top after shuffle
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          background: showText ? 'rgba(255, 255, 255, 0.1)' : 'none', // Background effect only when text is visible
          backdropFilter: showText ? 'blur(10px)' : 'none', // Blur effect only when text is visible
          padding: '50px',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '600px',
          mb: showText ? 4 : 2, // Adjust margin-bottom based on the text visibility
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Image
          src={`./public/moneyhub_short.png`}
          width={155}
          height={80}
          alt="MoneyHub Logo"
        />
        {showText && (
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)', // White text with 90% opacity
              fontWeight: 'light', 
              mt: 2, 
              mb: 2,
              padding: '20px'
            }}
          >
            Money Hub, founded with the mission of empowering youth through financial literacy to create the life of their dreams, proudly presents The Money Hub Shuffle: a game that randomizes short-form videos on financial topics that the users can learn from.
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={loadVideos}
          sx={{ backgroundColor: 'rgb(124,190,228)',
            borderRadius: '10px',
            textTransform: 'none'
           }}
        >
          <ShuffleIcon sx={{ mr: 1 }} /> {/* Add margin to the right of the icon */}
          Shuffle Cards
        </Button>
      </Box>
      
      <Grid container spacing={3} sx={{ mt: 2 }}> {/* Reduce margin-top */}
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Flashcard
              id={video.id}
              title={cleanTitle(video.title)}  
              description={"Lorem Lorem Lorem Lorem"}
              url={video.url}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;