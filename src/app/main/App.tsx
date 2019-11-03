import React from 'react';
import CharacterCreator from '../character/CharacterCreator';
import Navigation from '../navigation/Navigation';
import CharacterList from '../character/list/CharacterList';
import { Route } from 'react-router-dom';
import CharacterDisplay from '../character/CharacterDisplay';

const App: React.FC = () => {
  return (
    <>
      <Navigation/>
      <Route path="/" exact component={CharacterList}/>
      <Route path="/create" component={CharacterCreator}/>
      <Route path="/character/:id/:action" component={CharacterDisplay}/>
    </>
  );
}

export default App;
