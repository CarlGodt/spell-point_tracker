import { Container, Section, Tab, TabLink, TabList, Tabs } from "bloomer";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Character from "../../domain/character/Character";
import useCharacterRepository from "../../domain/character/CharacterRepository";
import ClassDisplay from "../class/ClassDisplay";
import Layout from "../main/Layout";
import SpellDisplay from "../spells/SpellDisplay";
import styles from './characterDisplay.module.scss';
import CharacterDetails from "./details/CharacterDetails";
import CharacterHeader from "./header/CharacterHeader";

type $ActiveTab = 'INFO' | 'CLASS' | 'SPELL';

interface $Params {
  id: string;
  action: $ActiveTab;
}

const CharacterDisplay: FunctionComponent = () => {
  const { id, action } = useParams<$Params>();
  const { get } = useCharacterRepository();
  const [character, setCharacter] = useState<Character>();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const data = await get(parseInt(id, 10));
      if (data) {
        setCharacter(data);
      }
    })();
  }, [get, id, setCharacter]);

  const activateTab = useCallback((tab: $ActiveTab) => {
    history.push(tab)
  }, [history]);

  if (!character) return null

  return (
    <>
      <Layout
        body={<CharacterHeader character={character} onUpdate={setCharacter} />}
        footer={(
          <Tabs className="is-centered" isBoxed isFullWidth>
            <TabList>
              <Tab isActive={action === 'SPELL'}>
                <TabLink onClick={() => activateTab('SPELL')}>Spells</TabLink>
              </Tab>
              <Tab isActive={action === 'CLASS'}>
                <TabLink onClick={() => activateTab('CLASS')}>Classes</TabLink>
              </Tab>
              <Tab isActive={action === 'INFO'}>
                <TabLink onClick={() => activateTab('INFO')}>Info</TabLink>
              </Tab>
            </TabList>
          </Tabs>
        )} />
      <Section className={styles.section}>
        <Container>
          {action === 'INFO' && (
            <CharacterDetails character={character} />
          )}
          {action === 'CLASS' && (
            <ClassDisplay character={character} onUpdate={setCharacter} />
          )}
          {action === 'SPELL' && (
            <SpellDisplay character={character} onUpdate={setCharacter} />
          )}
        </Container>
      </Section>
    </>
  );
}

export default CharacterDisplay;