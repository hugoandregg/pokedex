import React, { useRef, useState, useEffect } from "react";
import "./PokeList.css";
import PokeImage from "./PokeImage";

const PokeList: React.FC = () => {
  const listInnerRef = useRef(null);
  const [data, setData] = useState<any>([]);
  const [currOffset, setCurrOffset] = useState(0);
  const [prevOffset, setPrevOffset] = useState(-1);
  const [pokeImg, setPokeImg] = useState("");
  const url = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchData = () => {
      fetch(url + `?offset=${currOffset}&limit=20`)
        .then((response) => response.json())
        .then((responseData) => {
          setData([...data, ...responseData.results]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      setPrevOffset(currOffset);
    };
    if (prevOffset !== currOffset) {
      fetchData();
    }
  }, [url, currOffset, prevOffset, data]);

  const onScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setCurrOffset(currOffset + 20);
    }
  };

  const onClick = (url: string) => {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        setPokeImg(
          responseData["sprites"]["versions"]["generation-v"]["black-white"][
            "animated"
          ]["front_default"]
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <PokeImage url={pokeImg} />
      <div
        className="list"
        style={{ overflow: "scroll", height: 180 }}
        onScroll={onScroll}
        ref={listInnerRef}
      >
        <div>
          <ul>
            {data.map((item: any, index: number) => (
              <li
                className="list-item"
                key={index}
                onClick={() => onClick(item.url)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PokeList;
