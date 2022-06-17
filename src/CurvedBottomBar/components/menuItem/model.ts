export interface ScreenBottomBarProps {
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
