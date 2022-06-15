import type React from 'react';

interface IProps {
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

export type ScreenBottomBarProps = React.FC<IProps>;