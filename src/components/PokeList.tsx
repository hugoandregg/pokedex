import React, { useRef, useState, useEffect } from "react";
import "./PokeList.css";
import PokeImage from "./PokeImage";

const PokeList: React.FC = () => {
  const listInnerRef = useRef(null);
  const [data, setData] = useState<any>([]);
  const [currPage, setCurrPage] = useState(0);
  const [prevPage, setPrevPage] = useState(-1);
  const [pokeImg, setPokeImg] = useState("");
  const url = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchData = () => {
      fetch(url + `?offset=${currPage}&limit=20`)
        .then((response) => response.json())
        .then((responseData) => {
          setData([...data, ...responseData.results]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      setPrevPage(currPage);
    };
    if (prevPage !== currPage) {
      fetchData();
    }
  }, [url, currPage, prevPage, data]);

  const onScroll = () => {
    if (listInnerRef.current) {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setCurrPage(currPage + 20);
      }
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
