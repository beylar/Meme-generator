import inputs from "./input"
import React, {useState, useEffect} from "react"
export function Header(){
  return (
    <>
    <nav className="bg-[#A626D3] flex gap-3 items-center pl-10 h-[65px] text-white">
    <img src="./Troll Face.svg" className="w-[21px] h-[26px]"/>
    <p className="font-bold text-[20px] font-karla">Meme Generator</p>
    </nav>
    </>
  )
}

export function MainContent(props){
    return (
      <>
      <div className="pt-10 mx-auto">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-[14px]">{props.text}</label>
          <input type="text" placeholder={props.placeholder} className="border w-[222px] p-2 rounded-lg text-[14px]"/>
        </div>
      </div>
      </>
    )
}

export function FetchingMemes() {
  const [memes, setMemes] = useState([]);
  const [randomMeme, setRandomMeme] = useState({
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

  function getRandomMeme() {
    if (memes.length > 0) {
      const randomIndex = Math.floor(Math.random() * memes.length);
      setRandomMeme(memes[randomIndex]);
    }
  }
  return (
    <>
      <button
        onClick={getRandomMeme}
        className="bg-[#A626D3] flex w-[478px] h-[40px] mx-auto items-center mt-8 rounded-lg"
      >
        <p className="font-karla font-bold text-white mx-auto">Get a new meme image 😎</p>
      </button>
      <div className="mx-auto mt-4 w-[478px] ">
        {randomMeme && (
          <div className="">
            <img src={randomMeme.url} alt={randomMeme.name} className="w-full h-[256px] rounded-lg" />
            <p className="text-center font-karla mt-2">{randomMeme.name}</p>
          </div>
        )}
      </div>
    </>
  );
}



export default function App() {
 const inputElements = inputs.map(input => 
 <MainContent 
  key= {input.id}
  {...input}
  />)
  return (
    <>
    <div className="w-[550px] h-[560px] mx-auto shadow-lg">
      <Header />
      <div className="flex ">
      {inputElements}
      </div>
      <FetchingMemes />
    </div>
    </>
  )
}

