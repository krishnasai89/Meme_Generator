import React, { useState, useEffect } from 'react';
import './Memes.css';

const MemeGenerator = () => {
    const [memes, setMemes] = useState([]);
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [randomMeme, setRandomMeme] = useState('');

    const apiUrl = "https://api.imgflip.com/get_memes";

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                const memesArray = data.data.memes;
                setMemes(memesArray);
                setRandomMeme(memesArray[Math.floor(Math.random() * memesArray.length)].url);
            })
            .catch((error) => console.error('Error fetching memes:', error));
    }, []);

    const generateMeme = () => {
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        setRandomMeme(randomMeme.url);
    };

    return (
        <div className="meme-generator">
            <h1>Meme Generator</h1>
            <div className="meme">
                <img src={randomMeme} alt="Meme" />
                <h2 className="top-text">{topText}</h2>
                <h2 className="bottom-text">{bottomText}</h2>
            </div>
            <input
                type="text"
                placeholder="Top Text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
            />
            <input
                type="text"
                placeholder="Bottom Text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
            />
            <button onClick={generateMeme}>Get a new meme</button>
        </div>
    );
};

export default MemeGenerator;
