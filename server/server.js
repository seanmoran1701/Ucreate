const express = require('express')
const cors = require('cors');

var bodyParser = require('body-parser')
const app = express()

var jsonParser = bodyParser.json()

//Simple queue data structure. Used to make sure user's models aren't changed by another user during generation.
class Queue {
    constructor() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(element) {
        this.elements[this.tail] = element;
        this.tail++;
    }
    dequeue() {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        return item;
    }
    peek() {
        return this.elements[this.head];
    }
    get length() {
        return this.tail - this.head;
    }
    get isEmpty() {
        return this.length === 0;
    }
}
//Declare global queue
const queue = new Queue();

// Define a list of allowed origins
const allowedOrigins = ['http://localhost:3000', 'https://ucreate-ai.vercel.app/'];

// Define CORS options
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

//set CORS options
app.use(cors());

//endpoint for retreiving front of queue
app.get('/api/peekQ', (req, res) => {
    const top = {
        model: queue.peek(),
    };

    res.json(top);
});

//endpoint for queueing and dequeueing
app.post('/api/queue', jsonParser, (req, res) => {
    console.log(req.body.model);
    console.log(req.body.dequeue);
    queueHandler(req.body.model,req.body.dequeue)
});
const port = process.env.PORT || 1234;
app.listen(port, "0.0.0.0", () => { console.log("Server started on port 1234") })

//handles whether to queue or dequeue model
function queueHandler(model, isDequeue) {
    if (isDequeue === 'false') {
        queue.enqueue(model);
    } else {
        queue.dequeue(model);
    }
}


