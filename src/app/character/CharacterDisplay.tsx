import { FunctionComponent, useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabLink, Section, Container } from "bloomer";
import React from "react";
import { useParams } from "react-router";
import useCharacterRepository from "../../domain/character/CharacterRepository";
import Character from "../../domain/character/Character";
import ClassDisplay from "../class/ClassDisplay";
import CharacterDetails from "./details/CharacterDetails";
import SpellDisplay from "../spells/SpellDisplay";
import CharacterHeader from "./header/CharacterHeader";
import styles from './characterDisplay.module.scss';

type $ActiveTab = 'INFO' | 'CLASS' | 'SPELL';

interface $Params {
  id: string;
}

const CharacterDisplay: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<$ActiveTab>('SPELL')
  const { id } = useParams<$Params>();
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
    <Section className={styles.section}>
      <CharacterHeader character={character} onUpdate={setCharacter}/>
      <Container>
        <Tabs className="is-centered" isBoxed isFullWidth>
          <TabList>
            <Tab isActive={activeTab === 'SPELL'}>
              <TabLink onClick={() => setActiveTab('SPELL')}>Spells</TabLink>
            </Tab>
            <Tab isActive={activeTab === 'CLASS'}>
              <TabLink onClick={() => setActiveTab('CLASS')}>Classes</TabLink>
            </Tab>
            <Tab isActive={activeTab === 'INFO'}>
              <TabLink onClick={() => setActiveTab('INFO')}>Info</TabLink>
            </Tab>
          </TabList>
        </Tabs>
        {activeTab === 'INFO' && (
          <CharacterDetails character={character} />
        )}
        {activeTab === 'CLASS' && (
          <ClassDisplay character={character} onUpdate={setCharacter} />
        )}
        {activeTab === 'SPELL' && (
          <SpellDisplay character={character} onUpdate={setCharacter} />
        )}
      </Container>
    </Section>
  );
}

export default CharacterDisplay;