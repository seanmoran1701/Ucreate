import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Textbox from './Textbox'
import './App.css';
import DisplayImage from './DisplayImage';

function setImagePost(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `${sessionStorage.getItem('prompt')}`, steps: 20 })
    };
    
    GenerateImage(requestOptions);
    
}
function GenerateImage(requestOptions) {
    fetch('http://127.0.0.1:7860/sdapi/v1/txt2img', requestOptions)
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('image', data.images[0])
            window.location.reload(false);
        }
        );
        
}


/*const options = {
    method: 'POST',
    url: 'http://127.0.0.1:7860/sdapi/v1/txt2img',
    params: {},
    headers: {
        Accept: 'application/json'
    },
    data: [
        {
            cfg: 5,
            steps: 5,
            prompt: 'pink hair',
            
        },
    ],
};

function GenerateImage() {
    axios
        .request(options)
        .then(function (response) {
            sessionStorage.setItem('image', response.data.images[0]);

            console.log(response.data.images[0]);
            window.location.reload(false);
        })
        .catch(function (error) {
            console.error(error);
        });
}*/

/*function GenerateImage() {
//const [images, setImages] = useState([]);
    sessionStorage.removeItem('image');
        axios
            .post('http://127.0.0.1:7860/sdapi/v1/txt2img', {
                headers: {
                    Accept: 'application/json',
                }
            },
                
        )
    
            .then((response) => {

                sessionStorage.setItem('image', response.data.images[0]);

                console.log(response.data.images[0]);
                window.location.reload(false);
            })
            .catch((error) => console.log(error));

   //// <img src={`data:image/jpeg;base64,${sessionStorage.getItem('image')}`} />
}*/


function App(props) {
    
    const [models, setModels] = useState([]);
    const [image, setImage] = useState([]);


    

    useEffect(() => {
        if (models) {
            axios
                .get('http://127.0.0.1:7860/sdapi/v1/sd-models', {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then((response) => {
                    
                    console.log(response.data);
                })
                .catch((error) => console.log(error));
        }
    },
        [models]
    );

  return (
    <div className="App">
      <header className="App-header">
              <img src={`data:image/jpeg;base64,${sessionStorage.getItem('image')}`} />
              <Textbox />
              <button onClick={() => setImagePost()}>Submit</button>
      </header>
          <textbox />
    </div>
  );
}

export default App;
