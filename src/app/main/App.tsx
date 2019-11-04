import React from 'react';
import { Route } from 'react-router-dom';
import CharacterCreator from '../character/create/CharacterCreator';
import CharacterDisplay from '../character/overview/CharacterDisplay';
import CharacterList from '../character/list/CharacterList';

const App: React.FC = () => {
  return (
    <>
      <Route path="/" exact component={CharacterList} />
      <Route path="/create" component={CharacterCreator} />
      <Route path="/character/:id/:action" component={CharacterDisplay} />
    </>
  );
};

export default App;
