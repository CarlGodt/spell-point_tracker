import React from 'react';
import { Section, Container } from 'bloomer';
import CharacterCreator from '../character/CharacterCreator';
import Navigation from '../navigation/Navigation';
import CharacterList from '../character/list/CharacterList';
import { Route } from 'react-router-dom';
import CharacterDetails from '../character/details/CharacterDetails';
import CharacterAddClass from '../character/details/CharacterAddClass';

const App: React.FC = () => {
  return (
    <>
      <Navigation/>
      <Section>
        <Container>
          <Route path="/" exact component={CharacterList}/>
          <Route path="/create" component={CharacterCreator}/>
          <Route path="/character/:id" exact component={CharacterDetails}/>
          <Route path="/character/:id/addClass" component={CharacterAddClass}/>
        </Container>
      </Section>
    </>
  );
}

export default App;
