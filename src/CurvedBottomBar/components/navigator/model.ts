import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface IProps {
  ref: React.MutableRefObject<any>;
  type?: 'down' | 'up' | string;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  borderTopLeftRight?: boolean;
  circleWidth?: number;
  bgColor?: string;
  initialRouteName: string;
  strokeWidth?: number;
  renderCircle: ({
    selectedTab,
    navigate,
  }: {
    selectedTab: string;
    navigate: (selectedTab: string) => void;
  }) => JSX.Element;
  tabBar: ({
    routeName,
    selectedTab,
    navigate,
  }: {
    routeName: string;
    selectedTab: string;
    navigate: (selectedTab: string) => void;
  }) => JSX.Element;
}

export type NavigatorBottomBarProps = React.FC<IProps>;
