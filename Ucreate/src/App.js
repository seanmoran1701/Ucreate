import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Textbox from './Textbox'
import './App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Popup from './Popup';
import MoreInfo from './MoreInfo';
import DisplayImage from './DisplayImage';




//find way to automatically update URL before session timeout
function getPublicURL() {
    const URL = 'https://8e512f631cbffdc589.gradio.live';
    return URL;
}


//wait for turn in queue, then set model with setModePost
async function waitForTurn(top) {
    console.log(top);
    if (top === undefined || top === sessionStorage.getItem('model')) {
        setModelPost();
        return true;
    } else {
        //if front of queue does not match wait 3 seconds and try again
        setTimeout(getTopQueue, 3000);
    }

}

//get top of queue to pass to waitForTurn function
function getTopQueue() {
    fetch('https://ucreate-production.up.railway.app/api/peekQ')
            .then(response => response.json())
            .then(data => {
                console.log(data.model);
                waitForTurn(data.model)
            })
            .catch(error => console.error('Error fetching data:', error));

}

//get model from sessionStorage and pass to setModelPost function
function setAndGetQ() {
    console.log(sessionStorage.getItem('model'));
    console.log("adding to queue")
    //add model to queue after clicking submit on prompt
    queuePost(sessionStorage.getItem('model'), 'false');
    //route to queue management (getTopQueue + waitForTurn)
    getTopQueue();
}

//define post request for changing the currently used model in SD server
function setModelPost() {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sd_model_checkpoint: `${sessionStorage.getItem('model')}` })
    };

    changeModel(requestOptions);

}
//execute post request to change model
function changeModel(requestOptions) {
    fetch(getPublicURL()+'/sdapi/v1/options', requestOptions)
        .then(response => {
            response.json()
        }
    );
    setImagePost();
}

//define post request for passing prompt to SD server
function setImagePost() {
 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `${sessionStorage.getItem('loraText')+sessionStorage.getItem('prompt')}`, steps: 35 })
    };
    
    GenerateImage(requestOptions);
    
}
//execute image generation with given prompt from requestOptions
function GenerateImage(requestOptions,props) {
    console.log(sessionStorage.getItem('loraText') + sessionStorage.getItem('prompt'));
    fetch(getPublicURL()+'/sdapi/v1/txt2img', requestOptions)
        .then(response => response.json())
        .then(data => {
            //set base64 image in sessionStorage
            sessionStorage.setItem('image', data.images[0])
            console.log("removing from queue");
            //dequeue model after image is finished generating
            queuePost(sessionStorage.getItem('model'), 'true');
            window.location.reload(false);
        }
        );       
}
//define post request for queueing and dequeueing 
function queuePost(model, isDequeue) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: `${sessionStorage.getItem('model')}`, dequeue: `${isDequeue}`})
    };

    queue(requestOptions);

}
//execute post request for queueing and dequeuing
function queue(requestOptions) {
    fetch('https://ucreate-production.up.railway.app/api/queue', requestOptions)
        .then(response => {
            response.json()
        })
        .then(data => {
            console.log(data);
        }       
        );
}



function App(props) {
    //default image to be used soon
    const defaultImage = "iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXrq6uYmJiFhYVycnJhYWFkZGRBQUGxsbEAAAArKyszMzM+Pj5JSUlQUFBoaGiSkpKMjIx+fn54eHgKjnX1AAABfElEQVR4nO3dTU7dMABGUee9BB605Xf/e4UBEzopqhRZNznHG/ju0JIlj4fHX7//PD1t2/a8frp+ebl8s/y/yz+9Xn/gbf2J7W939+N5HNttrLMn7Gw5QeH77Ak7W8Z19oSdKexT2KewT2Gfwr4zFL7OnrCzZVxmT9iZwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9h3/J5jk1hn8I+hX0K+xT2KexT2KewT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9Zyg8/oshhXUK+xT2KexT2KewT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9p2h8GX2hJ2d4Z8ZhXUK+xT2KexT2KewT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvuWsc6esDOFfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9hn8I+hX0K+5ZxN3vCzpaxzZ6wM4V9CvsU9insU9insE9h3xkKj34Dvo3723Jkt/UD4p4HN3xcuaQAAAAASUVORK5CYII=";
    const [image, setImage] = useState(defaultImage);
  
    return (
      
    <div className="App">
            <header className="App-header">
                {/* Back Button */}
                <p style={{ position: 'absolute', top: 10, left: 10 }}>
                    <Link to="/">
                        <Button variant="contained">Back to Models</Button>
                    </Link>
                </p>
                {/* Info Button */}
                <p style={{ position: 'absolute', top: 10, right: 144 }}>
                    <MoreInfo moreInfo={sessionStorage.getItem('info')}/>
                </p>
                {/* Keywords Button */}
                <p style={{ position: 'absolute', top: 10, right: 10 }}>
                    <Popup keywords={sessionStorage.getItem('keywords')}/>
                </p>
                {/* Display Generated Image */}
                
                <img src={`data:image/jpeg;base64,${sessionStorage.getItem('image')}`} />
                {/* Prompt Text Box */}
              <Textbox />
                <Button variant="contained" onClick={() => setAndGetQ()}>Submit</Button>
            </header>
              
    </div>
  );
}

export default App;


