import express from "express"
import cors from 'cors';
import videosRoutes from './routes/videos.js'
import "dotenv/config"

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://brainflix-application.netlify.app'  
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to BrainFlix API" });
});

app.use('/videos', videosRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});