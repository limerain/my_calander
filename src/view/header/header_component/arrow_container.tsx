import React, { ReactElement } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
}

type Props = {
  direction: Direction;
};

const ArrowContainer = ({ direction }: Props): ReactElement => {
  const onClick = () => {
    console.log('button click~');
  };
  if (direction === Direction.LEFT) {
    return <LeftOutlined onClick={onClick} />;
  }
  return <RightOutlined onClick={onClick} />;
};

export default ArrowContainer;
