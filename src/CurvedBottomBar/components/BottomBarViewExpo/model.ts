import type {
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs';
import {
  DefaultNavigatorOptions,
  ParamListBase,
  TabNavigationState,
  TabRouterOptions,
} from '@react-navigation/native';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

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

export interface ICurvedBottomBarRef {
  setVisible: (visible: boolean) => void;
}

interface Props {
  ref?:
    | React.RefObject<ICurvedBottomBarRef>
    | React.MutableRefObject<ICurvedBottomBarRef>
    | null
    | undefined;
  type?: 'DOWN' | 'UP';
  circlePosition?: 'CENTER' | 'LEFT' | 'RIGHT';
  style?: StyleProp<ViewStyle>;
  shadowStyle?: StyleProp<ViewStyle>; // Do not use this Prop in Expo
  width?: number;
  height?: Range<50, 91>;
  borderTopLeftRight?: boolean;
  circleWidth?: Range<50, 61>;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  initialRouteName: string;
  defaultScreenOptions?: unknown;
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
}

export type NavigatorBottomBarProps = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap
> &
  Props &
  TabRouterOptions;
