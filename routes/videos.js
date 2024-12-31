import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config"

const router = express.Router();

router.get('/', (req, res) => {
    const videos = fs.readFileSync('./data/videos.json', 'utf-8');
    res.json(JSON.parse(videos));
});

router.get('/:id', (req, res) => {
    const videos = JSON.parse(fs.readFileSync('./data/videos.json', 'utf8'));
    const video = videos.find(video => video.id === req.params.id);

    if (!video) {
        return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
});

router.post('/:id/comments', (req, res) => {
    const videos = JSON.parse(fs.readFileSync('./data/videos.json', 'utf8'));
    const video = videos.find(video => video.id === req.params.id);
    if (!video) {
        return res.status(404).json({ error: 'Video not found' });
    }
    const newComment = {
        id: uuidv4(),
        name: req.body.name,
        comment: req.body.comment,
        likes: 0,
        timestamp: Date.now()
    };

    video.comments.unshift(newComment);
    fs.writeFileSync('./data/videos.json', JSON.stringify(videos));
    res.status(201).json(newComment);
});


router.post('/', (req, res) => {
    const videos = JSON.parse(fs.readFileSync('./data/videos.json', 'utf8'));

    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        channel: "Maria Cilloniz",
        image: "https://brainflix-front-end-f17590ab5cac.herokuapp.com/images/image0.jpg",
        views: "221,330",
        likes: "11,900",
        duration: "3:00",
        video: "",
        timestamp: Date.now(),
        comments: [
            {
                "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
                "name": "Jeremy Stiller",
                "comment": "Your hardwork is so amazing! The intersection of passion and disicpline is particularly thought-provoking. Keep us updated on the other races!",
                "likes": 2,
                "timestamp": 1691731062000
            },
            {
                "id": "091de676-61af-4ee6-90de-3a7a53af7521",
                "name": "Peter Parker",
                "comment": "This video is a fantastic overview of the running scene. Your ability to manage long training hours and make it seem easy is impressive. Can't wait for more running insights!",
                "likes": 0,
                "timestamp": 1691644662000
            },
            {
                "id": "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
                "name": "Janike Sambuca",
                "comment": "Your channel is my go-to source for staying updated on running trends. The exploration of the future implications of running is both informative and exciting. Kudos on another excellent video!",
                "likes": 4,
                "timestamp": 1691558262000
            }
        ]
    };

    videos.push(newVideo);

    fs.writeFileSync('./data/videos.json', JSON.stringify(videos));

    res.status(201).json(newVideo);
});
export default router;