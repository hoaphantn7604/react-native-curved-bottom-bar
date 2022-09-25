import type {
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs';
import type {
  DefaultNavigatorOptions,
  ParamListBase,
  TabNavigationState,
  TabRouterOptions,
} from '@react-navigation/native';
import type React from 'react';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

type Props = {
  ref: React.MutableRefObject<any>;
  type?: 'DOWN' | 'UP';
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  borderTopLeftRight?: boolean;
  circleWidth?: number;
  bgColor?: string;
  initialRouteName: string;
  strokeWidth?: number;
  strokeColor?: ColorValue;
  renderCircle: ({
    routeName,
    selectedTab,
    navigate,
  }: {
    routeName: string;
    selectedTab: string;
    navigate: (selectedTab: string) => void;
  }) => JSX.Element;
  tabBar?: ({
    routeName,
    selectedTab,
    navigate,
  }: {
    routeName: string;
    selectedTab: string;
    navigate: (selectedTab: string) => void;
  }) => JSX.Element;
};

export type NavigatorBottomBarProps = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap
> &
  Props &
  TabRouterOptions;
