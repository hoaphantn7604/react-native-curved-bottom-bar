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

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type Props = {
  ref: React.MutableRefObject<any>;
  type?: 'DOWN' | 'UP';
  circlePosition?: 'CENTER' | 'LEFT' | 'RIGHT';
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: Range<50, 91>;
  borderTopLeftRight?: boolean;
  circleWidth?: Range<50, 61>;
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
