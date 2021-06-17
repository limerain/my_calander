import React, { ReactElement } from 'react';
import HeaderContainer from '@view/header';
import SchedulerContainer from '@view/contents';

import './App.css';

const App = (): ReactElement => {
  return (
    <header className="App-header">
      <HeaderContainer />
      <SchedulerContainer />
    </header>
  );
};

export default App;
