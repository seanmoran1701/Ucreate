const express = require('express')
const cors = require('cors');
const app = express()


// Define a list of allowed origins
const allowedOrigins = ['http://localhost:3000', 'https://ucreate-ai.vercel.app/'];

// Configure CORS with options
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

app.get('/api/word', (req, res) => {
    const wordData = {
        word: 'example',
        definition: 'a representative instance or case'
    };

    res.json(wordData);
});

app.listen(1234, () => {console.log("Server started on port 1234")})