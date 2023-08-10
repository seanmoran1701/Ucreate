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
    const URL = 'https://5508b14dd84396d1f0.gradio.live';
    return URL;
}

function setModelPost() {
    console.log(sessionStorage.getItem('model'));
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sd_model_checkpoint: `${sessionStorage.getItem('model')}` })
    };

    changeModel(requestOptions);

}
function changeModel(requestOptions) {
    fetch(getPublicURL()+'/sdapi/v1/options', requestOptions)
        .then(response => {
            response.json()
        }
        );
}


function setImagePost(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `${sessionStorage.getItem('loraText')+sessionStorage.getItem('prompt')}`, steps: 20 })
    };
    
    GenerateImage(requestOptions);
    
}
function GenerateImage(requestOptions) {
    console.log(sessionStorage.getItem('loraText') + sessionStorage.getItem('prompt'));
    fetch(getPublicURL()+'/sdapi/v1/txt2img', requestOptions)
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('image', data.images[0])
            
            window.location.reload(false);
        }
        );
        
}

function App(props) {
    const [image, setImage] = useState([]);

    useEffect(() => {
        let ignore = false;

        if (!ignore) setModelPost()
        return () => { ignore = true; }
    }, []);

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
                <Button variant="contained" onClick={() => setImagePost()}>Submit</Button>
            </header>
              
    </div>
  );
}

export default App;
