import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';


//import InfoIcon from '@mui/icons-material/Info';

export default function modelPicker() {
    //sd_model_checkpoint:
    
    const [models, setModels] = useState([]);
    const [picked, setPicked] = useState([]);
    const [modelCount, setModelCount] = useState(0);

    function setModelPost(modelNumber) {
        console.log(models[0].model_name);
        console.log(modelNumber);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sd_model_checkpoint: `${models[modelNumber].model_name}` })
        };

        changeModel(requestOptions);

    }
    function changeModel(requestOptions) {
        fetch('http://127.0.0.1:7860/sdapi/v1/options', requestOptions)
            .then(response => {
                response.json()
            }
            );
    }
    function updateModel(modelName){
        sessionStorage.setItem('model', modelName);
        sessionStorage.setItem('image', defaultImage);
        console.log("working");
    }

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
                    setModels(response.data);
                })
                .catch((error) => console.log(error));
        }
    },
        []
    );

    return (
        <div>
            
        <ImageList sx={{ width: 500, height: 450 }}>


            <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">STYLES</ListSubheader>
            </ImageListItem>
            {itemData.map((item) => (
                <Link to="/generator" onClick={() => updateModel(item.modelName)}>
                <ImageListItem key={item.img}>
                   
                    <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    
                    
                    <ImageListItemBar
                        title={item.title}
                        
                        
                    />
                    </ImageListItem>
                    </Link>
            ))}
            </ImageList>
            </div>
    );
}


const itemData = [
    {
        img: 'https://64.media.tumblr.com/d9cbf0da58fec95c2fab4b0b17b6bfe1/8532d93853958a77-f5/s540x810/a21fb37e7e08d9ab1c43c2d70573ea8802ef33ad.pnj',
        title: 'Base Model (untrained)',
        author: '@bkristastucchio',
        rows: 2,
        cols: 2,
        featured: true,
        modelName: "sd-v1-4",
    },
    {
        img: 'https://64.media.tumblr.com/27b10067c017f9ed99b2e1da830fa241/99cc5a09eb24cca6-59/s540x810/b4e6d92e4f2998fd92d4968459591be0c88d186b.pnj',
        title: 'Anime Toon',
        author: '@rollelflex_graphy726',
        modelName: "mistoonAnime_v20",
    },
    {
        img: 'https://64.media.tumblr.com/9cce873726d715efa27590047852c174/41c19f28b3adafed-00/s540x810/acac3d02fe1c24249149569d61115393c691a504.pnj',
        title: 'HR Realism',
        author: '@helloimnik',
        modelName: "xxmix9realistic_v40",
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        author: '@hjrc33',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        author: '@silverdalex',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
        author: '@shelleypauls',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
        author: '@peterlaster',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        author: '@southside_customs',
        cols: 2,
    },
];

const defaultImage = "iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXrq6uYmJiFhYVycnJhYWFkZGRBQUGxsbEAAAArKyszMzM+Pj5JSUlQUFBoaGiSkpKMjIx+fn54eHgKjnX1AAABfElEQVR4nO3dTU7dMABGUee9BB605Xf/e4UBEzopqhRZNznHG/ju0JIlj4fHX7//PD1t2/a8frp+ebl8s/y/yz+9Xn/gbf2J7W939+N5HNttrLMn7Gw5QeH77Ak7W8Z19oSdKexT2KewT2Gfwr4zFL7OnrCzZVxmT9iZwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9h3/J5jk1hn8I+hX0K+xT2KexT2KewT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9Zyg8/oshhXUK+xT2KexT2KewT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9p2h8GX2hJ2d4Z8ZhXUK+xT2KexT2KewT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvuWsc6esDOFfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9hn8I+hX0K+5ZxN3vCzpaxzZ6wM4V9CvsU9insU9insE9h3xkKj34Dvo3723Jkt/UD4p4HN3xcuaQAAAAASUVORK5CYII=";

