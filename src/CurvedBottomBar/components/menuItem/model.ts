export interface ScreenBottomBarProps {
  name: string;
  position: 'left' | 'right' | 'center';
  component: (props) => JSX.Element;
}
