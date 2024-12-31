import express from "express"
import cors from 'cors';
import videosRoutes from './routes/videos.js'
import "dotenv/config"


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to BrainFlix API" });
});

app.use('/videos', videosRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Port listening to ${PORT}`)
})
