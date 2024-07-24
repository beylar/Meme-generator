import React, { useState, useEffect } from "react";

export function Header() {
  return (
    <>
      <nav className="bg-[#A626D3] flex gap-3 items-center pl-10 h-[65px] text-white">
        <img src="./Troll Face.svg" className="w-[21px] h-[26px]" />
        <p className="font-bold text-[20px] font-karla">Meme Generator</p>
      </nav>
    </>
  );
}

export function FetchingMemes() {
  const [memes, setMemes] = useState([]);
  const [randomMeme, setRandomMeme] = useState(null);
  const [texts, setTexts] = useState({
    topText: "",
    bottomText: ""
  });

  useEffect(() => {
    async function fetchMemes() {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      setMemes(data.data.memes);
      setRandomMeme(data.data.memes[Math.floor(Math.random() * data.data.memes.length)]);
    }

    fetchMemes();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setTexts(prevTexts => ({
      ...prevTexts,
      [name]: value
    }));
  }

  function getRandomMeme() {
    if (memes.length > 0) {
      const randomIndex = Math.floor(Math.random() * memes.length);
      setRandomMeme(memes[randomIndex]);
    }
  }

  return (
    <>
      <div className="form">
        <div className="mt-4 flex gap-6 mx-[47px] items-center ">
          <input
            type="text"
            placeholder="Top text"
            className="border-2 rounded-lg px-2"
            value={texts.topText}
            name="topText"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Bottom text"
            className="border-2 rounded-lg px-2"
            value={texts.bottomText}
            name="bottomText"
            onChange={handleChange}
          />
        </div>
        <button
          onClick={getRandomMeme}
          className="bg-[#A626D3] flex w-[478px] h-[40px] mx-auto items-center mt-8 rounded-lg"
        >
          <p className="font-karla font-bold text-white mx-auto">Get a new meme image 😎</p>
        </button>
        <div className="mx-auto mt-4 w-[478px] ">
          {randomMeme && (
            <div className="relative">
              <img src={randomMeme.url} alt={randomMeme.name} className="w-full h-[256px] rounded-lg mt-6" />
              <h2 className="font-karla top absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold">{texts.topText}</h2>
              <h2 className="font-karla bottom absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold">{texts.bottomText}</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <div className="w-[550px] h-[530px] mx-auto shadow-lg">
        <Header />
        <FetchingMemes />
      </div>
    </>
  );
}
