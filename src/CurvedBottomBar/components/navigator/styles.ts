import { StyleSheet } from 'react-native-size-scaling';

export const styles = StyleSheet.create({
  wrapContainer: {
    flex: 1,
  },
  container: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  main: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  top30: {
    top: 30,
  },
  itemTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
