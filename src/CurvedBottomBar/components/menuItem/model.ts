import type React from 'react';
export interface ScreenBottomBarProps {
  name: string;
  position: 'LEFT' | 'RIGHT' | 'CENTER';
  component: (props: React.ComponentType<any>) => JSX.Element;
}
