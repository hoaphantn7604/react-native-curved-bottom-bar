import React from 'react';

interface IProps {
  name: string;
  position: 'left' | 'right' | 'center';
  renderHeader?: ({
    navigate,
  }: {
    navigate: (selectedTab: string) => void;
  }) => React.ReactNode;
  component: ({
    navigate,
  }: {
    navigate: (selectedTab: string) => void;
  }) => React.ReactNode;
}

export type ScreenBottomBarProps = React.FC<IProps>
