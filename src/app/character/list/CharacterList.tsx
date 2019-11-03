import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Content, Level, LevelLeft, LevelRight, Section, Table, Title } from "bloomer";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Character from "../../../domain/character/Character";
import useCharacterRepository from "../../../domain/character/CharacterRepository";
import Layout from "../../main/Layout";
import styles from './../characterCreator.module.scss';
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
    <>
      <Layout
        body={(
          <Level isMobile>
            <LevelLeft>
              <Title>Character</Title>
            </LevelLeft>
            <LevelRight>
              <Button title="Create new Character" onClick={() => history.push('create')} isSize="small">
                <span><FontAwesomeIcon icon={faPlus}/> Add</span>
              </Button>
            </LevelRight>
          </Level>
        )} />
      <Section className={styles.section}>
        <Container>
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
    </>
  );
}

export default CharacterList;
