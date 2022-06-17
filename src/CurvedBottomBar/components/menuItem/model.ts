import type React from 'react';
export interface ScreenBottomBarProps {
  name: string;
  position: 'left' | 'right' | 'center';
  component: (props: React.ComponentType<any>) => JSX.Element;
}
