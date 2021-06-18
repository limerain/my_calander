import React, { ReactElement } from 'react';
import HeaderContainer from '@view/header';
import CalendarContainer from '@view/contents';

import './App.less';

const App = (): ReactElement => {
  return (
    <header className="App-header">
      <HeaderContainer />
      <CalendarContainer />
    </header>
  );
};

export default App;
