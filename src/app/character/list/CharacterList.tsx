import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Content, Level, LevelLeft, LevelRight, Section, Table, Title, Container } from "bloomer";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Character from "../../../domain/character/Character";
import useCharacterRepository from "../../../domain/character/CharacterRepository";
import CharacterListElement from "./CharacterListElement";

const CharacterList: FunctionComponent = () => {
  const history = useHistory();
  const { getAll, del } = useCharacterRepository();
  const [character, setCharacter] = useState<Array<Character>>([]);

  useEffect(() => {
    (async () => {
      const chars = await getAll();
      if (chars) {
        setCharacter(chars as Array<Character>);
      }
    })();
  }, [getAll, setCharacter]);

  const onDelete = useCallback((char: Character) => {
    if (!char.id) return;
    del(char.id);
    setCharacter(character.filter(elem => elem.id !== char.id))
  }, [del, character, setCharacter]);

  return (
    <Section>
      <Container>
        <Level isMobile>
          <LevelLeft>
            <Title>Character</Title>
          </LevelLeft>
          <LevelRight>
            <Button title="Create new Character">
              <span><FontAwesomeIcon icon={faPlus} onClick={() => history.push('create')} /> Add</span>
            </Button>
          </LevelRight>
        </Level>
        {character && (
          <Table isFullWidth>
            <thead>
              <tr>
                <th>Name</th>
                <th>Level</th>
                <th>SP</th>
                <th>
                  <Content hasTextAlign="right">
                    Actions
                </Content>
                </th>
              </tr>
            </thead>
            <tbody>
              {character.map((char, key) => <CharacterListElement key={key} character={char} onDelete={onDelete} />)}
            </tbody>
          </Table>
        )}
        {!character && <Content>No characters yet.</Content>}
      </Container>
    </Section>
  );
}

export default CharacterList;
