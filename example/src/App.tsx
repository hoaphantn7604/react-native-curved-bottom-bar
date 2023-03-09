/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Button,
  LogBox,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CurvedBottomBar,
  ICurvedBottomBarRef,
} from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native-size-scaling';

StatusBar.setBarStyle('dark-content');
LogBox.ignoreAllLogs();

type voidType = () => void;

const RenderScreen = ({
  onDown,
  onUp,
  onLeft,
  onCenter,
  onRight,
}: {
  onDown: voidType;
  onUp: voidType;
  onLeft: voidType;
  onCenter: voidType;
  onRight: voidType;
}) => {
  return (
    <View style={styles.screen}>
      <Button title="Mode Curved Down" onPress={onDown} />
      <Button title="Mode Curved Up" onPress={onUp} />
      <Button title="Position Left" onPress={onLeft} />
      <Button title="Position Center" onPress={onCenter} />
      <Button title="Position Right" onPress={onRight} />
    </View>
  );
};

const ThemeScreen = () => {
  const ref = useRef<ICurvedBottomBarRef>(null);
  const [type, setType] = useState<'DOWN' | 'UP'>('DOWN');
  const [position, setposition] = useState<'LEFT' | 'CENTER' | 'RIGHT'>(
    'CENTER'
  );

  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = '';

    switch (routeName) {
      case 'title1':
        icon = 'ios-home-outline';
        break;
      case 'title2':
        icon = 'apps-outline';
        break;
      case 'title3':
        icon = 'bar-chart-outline';
        break;
      case 'title4':
        icon = 'person-outline';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={23}
        color={routeName === selectedTab ? '#FF3030' : 'gray'}
      />
    );
  };

  const onDown = () => {
    setType('DOWN');
  };
  const onUp = () => {
    setType('UP');
  };
  const onLeft = () => {
    setposition('LEFT');
  };
  const onCenter = () => {
    setposition('CENTER');
  };
  const onRight = () => {
    setposition('RIGHT');
  };

  return (
    <View style={styles.container}>
      <CurvedBottomBar.Navigator
        ref={ref}
        type={type}
        circlePosition={position}
        height={55}
        circleWidth={50}
        bgColor="white"
        borderTopLeftRight
        initialRouteName="title1"
        renderCircle={({ routeName, selectedTab, navigate }) => (
          <TouchableOpacity
            style={[type === 'DOWN' ? styles.btnCircle : styles.btnCircleUp]}
            onPress={() => {
              navigate(routeName);
            }}
          >
            <Ionicons
              name="chatbubbles-outline"
              size={23}
              color={selectedTab === routeName ? 'red' : 'black'}
            />
          </TouchableOpacity>
        )}
        tabBar={({ routeName, selectedTab, navigate }) => {
          return (
            <TouchableOpacity
              onPress={() => navigate(routeName)}
              style={styles.tabbarIcon}
            >
              {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
          );
        }}
      >
        <CurvedBottomBar.Screen
          name="title1"
          position="LEFT"
          component={() => (
            <RenderScreen
              onDown={onDown}
              onUp={onUp}
              onLeft={onLeft}
              onCenter={onCenter}
              onRight={onRight}
            />
          )}
        />
        <CurvedBottomBar.Screen
          name="title2"
          component={() => (
            <RenderScreen
              onDown={onDown}
              onUp={onUp}
              onLeft={onLeft}
              onCenter={onCenter}
              onRight={onRight}
            />
          )}
          position="LEFT"
        />
        <CurvedBottomBar.Screen
          name="title0"
          component={() => (
            <RenderScreen
              onDown={onDown}
              onUp={onUp}
              onLeft={onLeft}
              onCenter={onCenter}
              onRight={onRight}
            />
          )}
          position="CIRCLE"
        />
        <CurvedBottomBar.Screen
          name="title3"
          position="RIGHT"
          component={() => (
            <RenderScreen
              onDown={onDown}
              onUp={onUp}
              onLeft={onLeft}
              onCenter={onCenter}
              onRight={onRight}
            />
          )}
        />
        <CurvedBottomBar.Screen
          name="title4"
          component={() => (
            <RenderScreen
              onDown={onDown}
              onUp={onUp}
              onLeft={onLeft}
              onCenter={onCenter}
              onRight={onRight}
            />
          )}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
};

const MainScreen = () => {
  return (
    <NavigationContainer>
      <ThemeScreen />
    </NavigationContainer>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 28,
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: '#48CEF6',
  },
  img: {
    width: 30,
    height: 30,
  },
  tabbarIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    backgroundColor: '#BFEFFF',
    flex: 1,
    justifyContent: 'center',
  },
});
