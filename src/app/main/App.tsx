import React from 'react';
import { Section, Container } from 'bloomer';
import CharacterCreator from '../character/CharacterCreator';
import Navigation from '../navigation/Navigation';
import CharacterList from '../character/list/CharacterList';
import { Route } from 'react-router-dom';
import ClassAdd from '../class/ClassAdd';
import CharacterDisplay from '../character/CharacterDisplay';

const App: React.FC = () => {
  return (
    <>
      <Navigation/>
      <Section>
        <Route path="/" exact component={CharacterList}/>
        <Route path="/create" component={CharacterCreator}/>
        <Route path="/character/:id" exact component={CharacterDisplay}/>
        <Route path="/character/:id/addClass" component={ClassAdd}/>
      </Section>
    </>
  );
}

export default App;
