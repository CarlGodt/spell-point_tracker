import { Container, Section, Tab, TabLink, TabList, Tabs } from 'bloomer';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useHistory, useParams } from 'react-router';
import Character from '../../../domain/character/Character';
import useCharacterRepository from '../../../domain/character/CharacterRepository';
import ChatDisplay from '../../chat/ChatDisplay';
import ClassDisplay from '../../class/ClassDisplay';
import Layout from '../../main/Layout';
import SpellDisplay from '../../spells/SpellDisplay';
import CharacterDetails from '../details/CharacterDetails';
import CharacterHeader from '../header/CharacterHeader';
import styles from './characterDisplay.module.scss';

type $ActiveTab = 'INFO' | 'CLASS' | 'SPELL' | 'ROLL';

interface $Params {
  id: string;
  action: $ActiveTab;
}

const WithSection = ({ children }: { children: ReactNode }) => (
  <Section>
    <Container className={styles.contentContainer}>{children}</Container>
  </Section>
);

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

  const activateTab = useCallback(
    (tab: $ActiveTab) => {
      history.push(tab);
    },
    [history]
  );

  if (!character) return null;

  return (
    <>
      <Layout
        body={<CharacterHeader character={character} onUpdate={setCharacter} />}
        footer={
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
              <Tab isActive={action === 'ROLL'}>
                <TabLink onClick={() => activateTab('ROLL')}>Dice</TabLink>
              </Tab>
            </TabList>
          </Tabs>
        }
      />
      {action === 'INFO' && (
        <WithSection>
          <CharacterDetails character={character} onUpdate={setCharacter} />
        </WithSection>
      )}
      {action === 'CLASS' && (
        <WithSection>
          <ClassDisplay character={character} onUpdate={setCharacter} />
        </WithSection>
      )}
      {action === 'SPELL' && (
        <WithSection>
          <SpellDisplay character={character} onUpdate={setCharacter} />
        </WithSection>
      )}
      {action === 'ROLL' && <ChatDisplay author={character.getName()} />}
    </>
  );
};

export default CharacterDisplay;
