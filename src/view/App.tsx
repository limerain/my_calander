import React, { ReactElement } from 'react';
import HeaderContainer from '@view/header/header_container';
import CalendarContainer from '@view/contents/calendar_container';

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
