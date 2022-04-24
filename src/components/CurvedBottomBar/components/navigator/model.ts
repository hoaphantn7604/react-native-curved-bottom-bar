import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface IProps {
    type?: 'down' | 'up' | string;
    style?: StyleProp<ViewStyle>;
    width?: number;
    height?: number;
    borderTopLeftRight?: boolean;
    circleWidth?: number;
    bgColor?: string;
    initialRouteName: string;
    strokeWidth?: number;
    swipeEnabled?: boolean;
    lazy?: boolean;
    children?: React.ReactNode;
    renderCircle: ({
      selectedTab,
      navigate,
    }: {
      selectedTab: string;
      navigate: (selectedTab: string) => void;
    }) => React.ReactNode;
    tabBar: ({
      routeName,
      selectedTab,
      navigate,
    }: {
      routeName: string;
      selectedTab: string;
      navigate: (selectedTab: string) => void;
    }) => React.ReactNode;
}

export type NavigatorBottomBarProps = React.FC<IProps>
