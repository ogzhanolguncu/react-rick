import { FC, useState } from "react";
import { EpisodeDetails } from "../types/api";
import CharacterCard from "./CharacterCard";

type Props = {
  episode: EpisodeDetails;
  viewRef?: (node?: Element | null | undefined) => void;
};

const EpisodeWrapper: FC<Props> = ({ episode, viewRef }) => {
  const [loadCount, setLoadCount] = useState(6);
  const [counter, setCounter] = useState(1);

  const totalPage = Math.ceil(episode.characters.length / 6);

  const handleLoadMore = () => {
    if (counter < totalPage) {
      setLoadCount((prevState) => prevState + 6);
      setCounter((prevState) => prevState + 1);
    }
  };

  const episodeNumber = episode.episode.substring(
    episode.episode.length - 2,
    episode.episode.length
  );

  const seasonNumber = episode.episode.substring(1, 3);
  return (
    <div
      className="rounded-md border-solid border p-5 border-black mt-5"
      ref={viewRef}
    >
      <p className="text-3xl">
        #{episode.id}-{episode.name}
      </p>
      <p className="text-xl my-2">
        {`This is the
          ${episodeNumber}st episode in ${seasonNumber}st session. It was aired on ${episode.air_date}. There are total of ${episode.characters.length} featured in this episode.`}
      </p>
      <div className="grid grid-cols-3 gap-4">
        {episode.characters.slice(0, loadCount).map((char, index) => (
          <CharacterCard characterUrl={char} key={index} />
        ))}
        {counter !== totalPage && (
          <>
            <div></div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLoadMore}
            >
              Load More!
            </button>
            <div></div>
          </>
        )}
      </div>
    </div>
  );
};

export default EpisodeWrapper;
