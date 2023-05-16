import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { MiniCard, WrappingCard } from "../components/Card";
import Layout from "../components/Layout";
import { PokemonType } from "../utils/type";

const Pokemon = () => {
  const [previousPoke, setPreviousPoke] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [nextPoke, setNextPoke] = useState<string>("");
  const [data, setData] = useState<PokemonType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
      .then((data) => {
        const { results, next, previous } = data.data;
        setData(results);
        setNextPoke(next);
        setPreviousPoke(previous);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, something wrong wrong ",
        });
      })
      .finally(() => setLoading(false));
  }

  function nextPage() {
    axios
      .get(nextPoke)
      .then((data) => {
        const { results, next, previous } = data.data;
        setData(results);
        setNextPoke(next);
        setPreviousPoke(previous);
      })
      .catch(() => {});
  }

  function prevPage() {
    axios
      .get(previousPoke)
      .then((data) => {
        const { results, next, previous } = data.data;
        setData(results);
        setNextPoke(next);
        setPreviousPoke(previous);
      })
      .catch(() => {});
  }

  return (
    <Layout>
      <WrappingCard judul="Pagination Test">
        {loading ? (
          <>
            <p className="text-center text-3xl animate-pulse font-bold">
              Loading...
            </p>
          </>
        ) : (
          <div className="grid grid-flow-row auto-rows-max grid-cols-2 lg:grid-cols-4 p-6">
            {data.map((data) => (
              <MiniCard
                key={data.id}
                name={data.name}
                img={
                  data.url
                    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.url
                        .slice(34)
                        .replace("/", ".svg")}`
                    : data.url
                }
              />
            ))}
          </div>
        )}
        <div className="flex justify-center w-full mb-5">
          <div className="hover:scale-125 cursor-pointer mx-5 transition">
            <AiFillCaretLeft size={40} onClick={() => prevPage()} />
          </div>
          <div className="hover:scale-125 cursor-pointer mx-5 transition">
            <AiFillCaretRight size={40} onClick={() => nextPage()} />
          </div>
        </div>
      </WrappingCard>
    </Layout>
  );
};

export default Pokemon;
