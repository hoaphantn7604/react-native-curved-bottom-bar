import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenBottomBarProps } from './model';

const MenuItemComponent: ScreenBottomBarProps = (props) => {
  const { name } = props;
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
  );
};

export default MenuItemComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
