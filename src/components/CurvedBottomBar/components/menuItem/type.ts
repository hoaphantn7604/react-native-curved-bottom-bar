import React from 'react';

interface Props {
  name: string;
  position: 'left' | 'right' | 'center';
  renderHeader?: ({
    navigate,
  }: {
    navigate: (selectedTab: string) => void;
  }) => JSX.Element;
  component: ({
    navigate,
  }: {
    navigate: (selectedTab: string) => void;
  }) => JSX.Element;
}

export type ScreenBottomBar = React.FC<Props>
