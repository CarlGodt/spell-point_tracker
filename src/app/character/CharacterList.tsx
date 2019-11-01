import React, { FunctionComponent, useState, useEffect, useCallback } from "react";
import useCharacterRepository from "../../domain/character/CharacterRepository";
import $Character from "../../domain/character/Character";
import DisplayCard from "../../infrastructure/components/DisplayCard";
import CharacterListElement from "./CharacterListElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";

const CharacterList: FunctionComponent = () => {
  const history = useHistory();
  const { getAll, del } = useCharacterRepository();
  const [character, setCharacter] = useState<Array<$Character>>([]);

  useEffect(() => {
    (async () => {
      const chars = await getAll();
      if (chars) {
        setCharacter(chars as Array<$Character>);
      }
    })();
  }, [getAll, setCharacter]);

  const onDelete = useCallback((char: $Character) => {
    if (!char.id) return;
    del(char.id);
    setCharacter(character.filter(elem => elem.id !== char.id))
  }, [del, character, setCharacter]);

  return (
    <DisplayCard title="Character" headerIcon={(
      <FontAwesomeIcon icon={faPlus}
        onClick={() => history.push('create')} />
    )}>
      {character && character.map((char, key) => <CharacterListElement key={key} character={char} onDelete={onDelete}/>)}
    </DisplayCard>
  );
}

export default CharacterList;
