import React from 'react';
import { Section, Container } from 'bloomer';
import CharacterCreator from '../character/CharacterCreator';
import Navigation from '../navigation/Navigation';
import CharacterList from '../character/CharacterList';
import { Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Navigation/>
      <Section>
        <Container>
          <Route path="/" exact component={CharacterList}/>
          <Route path="/create" component={CharacterCreator}/>
        </Container>
      </Section>
    </>
  );
}

export default App;
