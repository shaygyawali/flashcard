//UNUSED
'use client'
import {useState, useEffect} from 'react'
import {collection, db, getDocs} from "@/firebase"
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
export default function Flashcard() {
    //const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    //const router = useRouter()

    //flips flashcards when clicked
    const handleCardClick = (id) => {
            setFlipped((prev) => ({
                ...prev,
                [id]: !prev[id],
  }))
}
  //This component uses Clerk’s `useUser` hook for authentication, React’s `useState` for managing the flashcards state, and Next.js’s `useRouter` for navigation.


    // ... (rest of the component)

    useEffect(() => {
        async function getFlashcards() {
          /*if (!user) return
          const docRef = doc(collection(db, 'users'), user.id)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            /*This function retrieves the user’s document from Firestore and sets the `flashcards` state 
            with the user’s flashcard collections. If the user document doesn’t exist, it creates one with 
            an empty flashcards array.
            */
            const docSnap = await getDocs(collection(db,"videos"))
            const collections = docSnap.data().flashcards || []
            setFlashcards(collections)
          /*} else {
            await setDoc(docRef, { flashcards: [] })
          }*/
        }
        getFlashcards()
      })

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                <CardContent>
                  <Box sx={{ /* Styling for flip animation */ }}>
                    <div>
                      <div>
                        <Typography variant="h5" component="div">
                          {flashcard.title}
                        </Typography>
                      </div>
                      <div>
                          <iframe src={videos[currentIndex].url} width="640" height="480" allow="autoplay"></iframe>
                      </div>
                    </div>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}