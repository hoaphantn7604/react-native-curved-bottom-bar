import type { RouteConfig } from '@react-navigation/core/lib/typescript/src/types';

type MenuItem = {
  position: 'LEFT' | 'RIGHT' | 'CENTER';
};
type RouteConfigComponent = RouteConfig<any, any, any, any, any>;

export type ScreenBottomBarProps = RouteConfigComponent & MenuItem;
