import React, { FunctionComponent, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import useCharacterRepository from "../../domain/character/CharacterRepository";
import Character from "../../domain/character/Character";
import DisplayCard from "../../infrastructure/components/DisplayCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface $Params {
  id: string;
}

const CharacterDetails: FunctionComponent = () => {
  const { id } = useParams<$Params>();
  const history = useHistory();
  const { get } = useCharacterRepository();
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    (async () => {
      const data = await get(parseInt(id, 10));
      if (data) {
        setCharacter(data);
      }
    })();
  }, [get, id, setCharacter]);

  if (!character) return null

  return (
    <DisplayCard title={character.name} headerIcon={<FontAwesomeIcon icon={faTimes} onClick={() => history.push('/')} />}>
      Hier kommen Details hin oder so
    </DisplayCard>
  );
}

export default CharacterDetails;