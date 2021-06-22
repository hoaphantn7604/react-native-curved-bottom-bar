import { StyleProp, ViewStyle } from 'react-native';

interface Props {
    type?: 'down' | 'up' | string;
    style?: StyleProp<ViewStyle>;
    width?: number;
    height?: number;
    borderTopLeftRight?: boolean;
    circleWidth?: number;
    bgColor?: string;
    initialRouteName: string;
    strokeWidth?: number;
    renderCircle: () => JSX.Element;
    tabBar: ({
      routeName,
      selectTab,
      navigation,
    }: {
      routeName: string;
      selectTab: string;
      navigation: (selectTab: string) => void;
    }) => JSX.Element;
}

export type NavigatorBottomBar = React.FC<Props>