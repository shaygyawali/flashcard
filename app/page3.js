'use client'
import {useState} from 'react'
import { getShuffledVideos } from '@/utils/get-videos'
import {
    Container,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    TextField,
    Button,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
  } from '@mui/material'
  import Flashcard from './components/Flashcard';

const Home = () => {
    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
}))
}
    const [videos, setVideos] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    const loadVideos = async() => {
        const shuffledVideos = await getShuffledVideos()
        setVideos(shuffledVideos)
        setCurrentIndex(0)
    }

    const nextVideo = () => {
        if (currentIndex < videos.length-1){
            setCurrentIndex(currentIndex+1)
        }else{
            setCurrentIndex(0)
        }
    }
    return(
      <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(video.id)}>
                <CardContent>
                  <Box sx={{ /* Styling for flip animation */ }}>
                    <div>
                      <div>
                        <Typography variant="h5" component="div">
                          {video.title}
                        </Typography>
                      </div>
                      <div>
                          <iframe src={video.url} width="640" height="480" allow="autoplay"></iframe>
                      </div>
                    </div>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <button onClick={loadVideos}> Shuffle Cards </button>
    </Container>
    )
}

export default Home;