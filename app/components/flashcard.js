'use client';
import { useState } from 'react';
import Flip from 'react-card-flip';
import { Card, CardContent, Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info'; // Example icon, choose any icon you like
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

const Flashcard = ({ title, description, url, icon = <InfoIcon sx={{ fontSize: '1rem' }} /> }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <Flip isFlipped={flipped} flipDirection="horizontal">
      <Card
        elevation={10}
        onClick={handleFlip}
        sx={{
          position: 'relative', // Required to position the small text and icon
          background: 'rgba(255, 255, 255, 0.1)', 
          backdropFilter: 'blur(10px)', 
          color: 'white',
          minHeight: 220,
          width: '100%',
          aspectRatio: '16/9',
          cursor: 'pointer',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 16, // Padding from the top
            right: 16, // Padding from the right
            color: 'lightgrey',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.8rem',
          }}
        >
          <Typography sx={{ mr: 0.5 }}> Flip </Typography>
          <ThreeSixtyIcon/>
        </Box>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </Card>

      <Card
        elevation={10}
        onClick={handleFlip}
        sx={{
          position: 'relative', // Required to position the small text and icon
          background: 'rgba(255, 255, 255, 0.1)', 
          backdropFilter: 'blur(10px)',
          minHeight: 220,
          width: '100%',
          aspectRatio: '16/9',
          cursor: 'pointer',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
      <Box
          sx={{
            position: 'absolute',
            bottom: 5, // Padding from the top
            right: 16, // Padding from the right
            color: 'lightgrey',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.8rem',
          }}
        >
          <Typography sx={{ mr: 0.5 }}> Flip </Typography>
          <ThreeSixtyIcon/>
        </Box>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            p: 0,
          }}
        >
          <Box
            sx={{
              height: '90%',
              width: '90%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={url}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
              style={{ borderRadius: '8px' }}
            ></iframe>
          </Box>
        </CardContent>
      </Card>
    </Flip>
  );
};

export default Flashcard;
