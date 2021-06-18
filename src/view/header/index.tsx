import React, { ReactElement } from 'react';
import { CalendarUnit } from '@constant';

import ArrowContainer, { Direction } from './header_component/arrow_container';
import CurrentDateContainer from './header_component/current_date_container';
import CalendarSelectorContainer from './header_component/calendar_selector_container';

const HeaderContainer = (): ReactElement => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ArrowContainer direction={Direction.LEFT} />
      <CurrentDateContainer />
      <ArrowContainer direction={Direction.RIGHT} />
      <CalendarSelectorContainer unit={CalendarUnit.MONTHLY} />
      <CalendarSelectorContainer unit={CalendarUnit.DAILY} />
    </div>
  );
};

export default HeaderContainer;
