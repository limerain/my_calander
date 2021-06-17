import React, { ReactElement } from 'react';
import ArrowContainer, { Direction } from './header_component/arrow_container';
import CurrentDateContainer from './header_component/current_date_container';

const HeaderContainer = (): ReactElement => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ArrowContainer direction={Direction.LEFT} />
      <CurrentDateContainer />
      <ArrowContainer direction={Direction.RIGHT} />
    </div>
  );
};

export default HeaderContainer;
