import { StyleSheet } from 'react-native-size-scaling';

export const styles = StyleSheet.create({
  wrapContainer: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
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
  circleRight: {
    marginRight: 25,
  },
  circleLeft: {
    marginLeft: 25,
  },
});
