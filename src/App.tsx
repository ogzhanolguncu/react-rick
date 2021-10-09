import { FC, useCallback, useEffect, useState } from "react";

import axios from "axios";
import { useInView } from "react-intersection-observer";

import { EpisodeResponse } from "./types/api";
import EpisodeWrapper from "./components/EpisodeWrapper";

const fetchEpisodes = async (optionalUrl?: string) =>
  axios.get<EpisodeResponse>(
    optionalUrl ?? "https://rickandmortyapi.com/api/episode"
  );

const App: FC = () => {
  const [episodes, setEpisodes] = useState<EpisodeResponse>();
  const [ref, inView] = useInView({ triggerOnce: true });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMoreImages = async () => {
    if (episodes?.info?.next) {
      const { data } = await fetchEpisodes(episodes?.info.next);

      const modifiedEpisodes = [...episodes?.results, ...data.results];

      setEpisodes(
        (prevState) =>
          ({
            ...prevState,
            results: modifiedEpisodes,
            info: data.info,
          } as EpisodeResponse)
      );
    }
  };

  useEffect(() => {
    if (inView === true) fetchMoreImages();
  }, [fetchMoreImages, inView]);

  useEffect(() => {
    fetchEpisodes().then((res) => setEpisodes(res.data));
  }, []);

  return (
    <div className="flex justify-center items-center flex-col p-10">
      <h2 className=" font-medium text-4xl my-5">Rick and Morty</h2>
      <div style={{ width: "1000px" }}>
        {episodes?.results.map((episode, index) => (
          <EpisodeWrapper
            episode={episode}
            key={episode.name}
            viewRef={index === episodes.results.length - 1 ? ref : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
