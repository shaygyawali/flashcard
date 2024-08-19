import {collection, db, getDocs} from "../firebase"

export const getShuffledVideos = async() => {
    //const videoCollection = collection(db, 'videos')
    //const videoSnapshot = await getDocs(videoCollection)
    console.log(db)
    const videoSnapshot = await getDocs(collection(db,"videos"))
    const videoList = videoSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))

    //Shuffle the array
    let currentIndex = videoList.length;
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [videoList[currentIndex], videoList[randomIndex]] = [
            videoList[randomIndex], videoList[currentIndex]];
      }
      return videoList;
    }
    /*for (let i = videoList.length - 1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1))
        console.log(j)
        console.log("this is exactly")
        console.log(videoList[i])
        console.log(videoList[j])
        [videoList[i], videoList[j]] = [videoList[j], videoList[i]]
    }*/