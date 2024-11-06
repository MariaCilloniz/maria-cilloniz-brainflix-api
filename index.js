import express from "express"
import cors from 'cors';
import videosRoutes from './routes/videos.js'
import "dotenv/config"


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/videos', videosRoutes);

app.listen(PORT, () => {
    console.log(`Port listening to ${PORT}`)
})
