import React, { FunctionComponent, useState, useEffect } from "react";
import useCharacterRepository from "../../domain/character/CharacterRepository";
import { Container, CardHeader, Card, CardContent } from "bloomer";
import $Character from "../../domain/character/Character";

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
    <Container>
      <Card>
        <CardHeader>
          Character
        </CardHeader>
        <CardContent>
          {character && character.map((char, key) => (
            <div key={key}>{char.name}</div>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
}

export default CharacterList;
