/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import {
  CurvedBottomBar,
  ICurvedBottomBarRef,
} from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native-size-scaling';

StatusBar.setBarStyle('dark-content');

type voidType = () => void;

const Button = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.titleButton}>{title}</Text>
    </TouchableOpacity>
  );
};

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
      <Text style={styles.title}>React Native Curved Bottom Bar</Text>
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
      case 'Tab1':
        icon = 'ios-home-outline';
        break;
      case 'Tab2':
        icon = 'apps-outline';
        break;
      case 'Tab3':
        icon = 'bar-chart-outline';
        break;
      case 'Tab4':
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
        shadowStyle={styles.shawdow}
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
          name="Tab1"
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
          name="Tab2"
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
          name="TabCenter"
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
          name="Tab3"
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
          name="Tab4"
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
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
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
  title: {
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 50,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'white',
    margin: 8,
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  titleButton: {
    fontWeight: 'bold',
  },
});
