import React from 'react';

interface Props {
  name: string;
  position: 'left' | 'right';
  component: ({
    navigate,
  }: {
    navigate: (selectTab: string) => void;
  }) => JSX.Element;
}

export type ScreenBottomBar = React.FC<Props>
