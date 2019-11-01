import React, { FunctionComponent, useState, useEffect } from "react";
import useCharacterRepository from "../../domain/character/CharacterRepository";
import $Character from "../../domain/character/Character";
import DisplayCard from "../../infrastructure/components/card/DisplayCard";

const CharacterList: FunctionComponent = () => {
  const { getAll } = useCharacterRepository();
  const [ character, setCharacter ] = useState<Array<$Character>>();

  useEffect(() => {
    (async () => {
      const chars = await getAll();
      if (chars) {
        setCharacter(chars as Array<$Character>);
      }
    }) ();
  }, [getAll, setCharacter]);

  return (
    <DisplayCard title="Character">
      {character && character.map((char, key) => (
        <div key={key}>{char.name}</div>
      ))}
    </DisplayCard>
  );
}

export default CharacterList;
