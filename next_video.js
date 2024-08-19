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
        <div>
            {videos.length > 0 && (
                <div>
                <div className="flashcard">
                    {videos[currentIndex].title}
                    <iframe src={videos[currentIndex].url} width="640" height="480" allow="autoplay"></iframe>
                </div>
                {currentIndex < videos.length-1 && (
                    <button onClick={nextVideo}>Next Video</button>
                )}
                </div>
            )}
             <button onClick={loadVideos}>Shuffle and load vids!!</button>
        </div>
    )
}

export default Home;