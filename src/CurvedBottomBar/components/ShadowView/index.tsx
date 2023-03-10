import { StyleProp } from 'react-native';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
  View,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-curved-bottom-bar' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type CurvedBottomBarProps = {
  style?: StyleProp<ViewStyle>;
};

const ComponentName = 'CurvedBottomBarView';

export const CurvedBottomBarView =
  Platform.OS === 'android'
    ? UIManager.getViewManagerConfig(ComponentName) != null
      ? requireNativeComponent<CurvedBottomBarProps>(ComponentName)
      : () => {
          throw new Error(LINKING_ERROR);
        }
    : View;
