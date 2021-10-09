import axios from "axios";
import { FC, useEffect, useState } from "react";
import { CharacterDetails } from "../types/api";

const fetchCharacter = async (characterUrl: string) =>
  axios.get<CharacterDetails>(characterUrl);

type Props = {
  characterUrl: string;
};
const CharacterCard: FC<Props> = ({ characterUrl }) => {
  const [character, setCharacter] = useState<CharacterDetails | undefined>();

  useEffect(() => {
    fetchCharacter(characterUrl).then((res) => setCharacter(res.data));
  }, [characterUrl]);

  return (
    <div className="flex rounded-lg flex-col border">
      <img
        className="rounded-lg"
        src={character?.image}
        alt={character?.name}
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-center mt-2 text-2xl font-medium">
          {character?.name}
        </h2>
        <p className=" mt-2 text-xl font-normal">{`From ${character?.origin.name}, identifies as ${character?.gender} of ${character?.species} race`}</p>
        <p className=" mt-2 text-xl font-light">
          Current Status: {character?.status}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
