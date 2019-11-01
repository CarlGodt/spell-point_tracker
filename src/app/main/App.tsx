import React from 'react';
import { Section, Container } from 'bloomer';
import CharacterCreator from '../character/CharacterCreator';
import Navigation from '../navigation/Navigation';
import CharacterList from '../character/list/CharacterList';
import { Route } from 'react-router-dom';
import CharacterDetails from '../character/CharacterDetails';

const App: React.FC = () => {
  return (
    <>
      <Navigation/>
      <Section>
        <Container>
          <Route path="/" exact component={CharacterList}/>
          <Route path="/create" component={CharacterCreator}/>
          <Route path="/character/:id" component={CharacterDetails}/>
        </Container>
      </Section>
    </>
  );
}

export default App;
