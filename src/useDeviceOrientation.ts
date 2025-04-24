import { useWindowDimensions } from 'react-native';

export function useDeviceOrientation() {
  const { width, height } = useWindowDimensions();

  return width < height ? 'PORTRAIT' : 'LANDSCAPE';
}
