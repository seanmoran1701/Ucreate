import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Textbox from './Textbox'
import './App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import DisplayImage from './DisplayImage';



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
    fetch('https://48cf06b0dea443c53e.gradio.live/sdapi/v1/options', requestOptions)
        .then(response => {
            response.json()
        }
        );
}


function setImagePost(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `${sessionStorage.getItem('prompt')}`, steps: 20 })
    };
    
    GenerateImage(requestOptions);
    
}
function GenerateImage(requestOptions) {
    fetch('https://48cf06b0dea443c53e.gradio.live/sdapi/v1/txt2img', requestOptions)
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
                <p style={{ position: 'absolute', top: 10, left: 10 }}>
                    <Link to="/">
                        <Button variant="contained">Back to Models</Button>
                    </Link>
                 </p>
              <img src={`data:image/jpeg;base64,${sessionStorage.getItem('image')}`} />
              <Textbox />
                <Button variant="contained" onClick={() => setImagePost()}>Submit</Button>
      </header>
          <textbox />
    </div>
  );
}

export default App;
