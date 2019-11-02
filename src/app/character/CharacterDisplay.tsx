import { FunctionComponent, useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabLink } from "bloomer";
import React from "react";
import { useParams } from "react-router";
import useCharacterRepository from "../../domain/character/CharacterRepository";
import Character from "../../domain/character/Character";
import ClassDisplay from "../class/ClassDisplay";
import CharacterDetails from "./details/CharacterDetails";
import SpellPointDisplay from "../spellpoints/SpellPointDisplay";

type $ActiveTab = 'INFO' | 'CLASS' | 'SPELL';

interface $Params {
  id: string;
}

const CharacterDisplay: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<$ActiveTab>('INFO')
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
    <>
      <Tabs>
        <TabList>
          <Tab isActive={activeTab === 'INFO'}>
            <TabLink onClick={() => setActiveTab('INFO')}>Info</TabLink>
          </Tab>
          <Tab isActive={activeTab === 'CLASS'}>
            <TabLink onClick={() => setActiveTab('CLASS')}>Classes</TabLink>
          </Tab>
          <Tab isActive={activeTab === 'SPELL'}>
        <TabLink onClick={() => setActiveTab('SPELL')}>SpellPoints</TabLink>
          </Tab>
        </TabList>
      </Tabs>
      {activeTab === 'INFO' && (
        <CharacterDetails character={character} />
      )}
      {activeTab === 'CLASS' && (
        <ClassDisplay character={character} onUpdateCharacter={setCharacter} />
      )}
      {activeTab === 'SPELL' && (
        <SpellPointDisplay/>
      )}
    </>
  );
}

export default CharacterDisplay;