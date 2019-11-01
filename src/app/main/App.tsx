import React from 'react';
import { Section } from 'bloomer';
import CharacterCreator from '../character/CharacterCreator';
import Navigation from '../navigation/Navigation';
import CharacterList from '../character/CharacterList';

const App: React.FC = () => {
  return (
    <>
      <Navigation/>
      <Section>
        <CharacterCreator/>
        <CharacterList/>
      </Section>
    </>
  );
}

export default App;
