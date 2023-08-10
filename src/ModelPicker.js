import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';


//import InfoIcon from '@mui/icons-material/Info';

export default function ModelPicker() {

    function updateModel(modelName, loraText, keywords, info){
        sessionStorage.setItem('model', modelName);
        sessionStorage.setItem('loraText', loraText);
        sessionStorage.setItem('keywords', keywords);
        sessionStorage.setItem('info', info);
        sessionStorage.setItem('image', defaultImage);

        console.log("working");
    }

    /*useEffect(() => {
        if (models) {
            axios
                .get('https://48cf06b0dea443c53e.gradio.live/sdapi/v1/sd-models', {
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
    );*/

    return (
        <div>
            <header className="gallery-header">
                IMAGE STYLES
            </header>
        <div className="gallery">
            
            <ImageList className="gallery2">
            <ImageListItem key="Subheader" cols={2}>
                
            </ImageListItem>
            {itemData.map((item) => (
                <Link to="/generator" onClick={() => updateModel(item.modelName,item.loraText,item.keywords,item.moreInfo)}>
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
        loraText: "",
        keywords: "None",
    },
    {
        img: 'https://64.media.tumblr.com/27b10067c017f9ed99b2e1da830fa241/99cc5a09eb24cca6-59/s540x810/b4e6d92e4f2998fd92d4968459591be0c88d186b.pnj',
        title: 'Anime Toon',
        author: '@rollelflex_graphy726',
        modelName: "mistoonAnime_v20",
        loraText: "",
        keywords: "None",
    },
    {
        img: 'https://64.media.tumblr.com/9cce873726d715efa27590047852c174/41c19f28b3adafed-00/s540x810/acac3d02fe1c24249149569d61115393c691a504.pnj',
        title: 'HR Realism',
        author: '@helloimnik',
        modelName: "xxmix9realistic_v40",
        loraText: "",
        keywords: "None",
    },
    {
        img: 'https://64.media.tumblr.com/2b43c4f882a04cc27578617e3da099f7/dc0bb4dd1a03b122-e2/s540x810/d604d8d1c1557678869ad8f163d581c9430d624b.pnj',
        title: 'Genshin Impact Anime',
        author: '@nolanissac',
        cols: 2,
        modelName: "mistoonAnime_v20",
        loraText: "<lora:genshinfull1:1>",
        keywords: "KUKISHINOBUDEF, LUMINEDEF, DORIDEF, FISCHLDEF, KEQINGDEF, LISADEF, RAIDENSHOGUNDEF, YAEMIKODEF, KUJOUSARADEF, BEIDOUDEF, DIONADEF,\
        GANYUDEF, KAMISATOAYAKADEF, SHENHEDEF, EULADEF, ROSARIADEF, QIQIDEF, LAYLADEF, NILOUDEF, KOKOMIDEF, YELANDEF, MONADEF, BARBARADEF, CANDACEDEF,\
        COLLEIDEF, YAOYAODEF, NAHIDADEF, FARUZANDEF, JEANFAVONIAN, SUCROSEDEF, SAYUDEF, XIANGLINGDEF, DEHYADEF, YOIMIYADEF, KLEEDEF, HUTAODEF, XINYANDEF\
        AMBER5STAR, YANFEIDEF, NOELLEDEF, YUNJINDEF, NINGGUANGDEF",
        moreInfo: 'Genshin Impact characters each have their own specific keyword.'
    },
    {
        img: 'https://64.media.tumblr.com/5cb7351ed17d5a2f9f1d5f907ecada9c/f99cffcdf6fec66b-2f/s540x810/c34ca7e987213b737c0b2fdac7c99c4f4babe1a5.pnj',
        title: 'Genshin Impact Realistic',
        author: '@hjrc33',
        cols: 2,
        modelName: "xxmix9realistic_v40",
        loraText: "<lora:genshinfull1:1>",
        keywords: "KUKISHINOBUDEF, LUMINEDEF, DORIDEF, FISCHLDEF, KEQINGDEF, LISADEF, RAIDENSHOGUNDEF, YAEMIKODEF, KUJOUSARADEF, BEIDOUDEF, DIONADEF,\
        GANYUDEF, KAMISATOAYAKADEF, SHENHEDEF, EULADEF, ROSARIADEF, QIQIDEF, LAYLADEF, NILOUDEF, KOKOMIDEF, YELANDEF, MONADEF, BARBARADEF, CANDACEDEF,\
        COLLEIDEF, YAOYAODEF, NAHIDADEF, FARUZANDEF, JEANFAVONIAN, SUCROSEDEF, SAYUDEF, XIANGLINGDEF, DEHYADEF, YOIMIYADEF, KLEEDEF, HUTAODEF, XINYANDEF\
        AMBER5STAR, YANFEIDEF, NOELLEDEF, YUNJINDEF, NINGGUANGDEF",
        moreInfo: 'Genshin Impact characters each have their own specific keyword.'
    },
    
];

const defaultImage = "iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXrq6uYmJiFhYVycnJhYWFkZGRBQUGxsbEAAAArKyszMzM+Pj5JSUlQUFBoaGiSkpKMjIx+fn54eHgKjnX1AAABfElEQVR4nO3dTU7dMABGUee9BB605Xf/e4UBEzopqhRZNznHG/ju0JIlj4fHX7//PD1t2/a8frp+ebl8s/y/yz+9Xn/gbf2J7W939+N5HNttrLMn7Gw5QeH77Ak7W8Z19oSdKexT2KewT2Gfwr4zFL7OnrCzZVxmT9iZwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9h3/J5jk1hn8I+hX0K+xT2KexT2KewT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9Zyg8/oshhXUK+xT2KexT2KewT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9p2h8GX2hJ2d4Z8ZhXUK+xT2KexT2KewT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvuWsc6esDOFfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9hn8I+hX0K+5ZxN3vCzpaxzZ6wM4V9CvsU9insU9insE9h3xkKj34Dvo3723Jkt/UD4p4HN3xcuaQAAAAASUVORK5CYII=";

