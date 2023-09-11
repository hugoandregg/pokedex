import React from "react";
import "./App.css";
import PokeList from "./components/PokeList";

function App() {
  return (
    <main>
      <img
        alt=""
        src="https://steamuserimages-a.akamaihd.net/ugc/105106022019032191/B0ABAE901B0ADFDD725E29136D5F7DF1A92F2C4E/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        className="poke-bckg"
      />
      <PokeList />
      <img
        alt=""
        src="https://www.pinclipart.com/picdir/big/318-3180390_pokemon-newbies-pokedex-png-clipart.png"
        className="pokedex"
      ></img>
    </main>
  );
}

export default App;
