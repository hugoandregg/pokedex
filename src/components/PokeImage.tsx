import { useEffect, useState } from "react";

const PokeImage = ({ url }: { url: string }) => {
  const [pokeImage, setPokeImage] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif"
  );

  useEffect(() => {
    if (url !== "") {
      setPokeImage(url);
    }
  }, [url]);

  return (
    <>
      <img src={pokeImage} className="pokemon-img" alt="pokemon"></img>
    </>
  );
};

export default PokeImage;
