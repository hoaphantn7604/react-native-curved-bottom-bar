## react-native-curved-bottom-bar
A high performance, beautiful and fully customizable curved bottom navigation bar for React Native.
## Getting started
```js
    npm install react-native-curved-bottom-bar react-native-svg --save
```
or
```js
    yarn add react-native-curved-bottom-bar react-native-svg
```

### IOS
```js
    cd ios && pod install
```

### Demo
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/navigationbar/demo.gif)


### CurvedBottomBar.Navigator

| Props              | Params               | isRequire | Description                                                             | 
| ------------------ | -------------------- | --------- | ----------------------------------------------------------------------- |
| type               | 'down' or 'up'       | Yes       | Type of the center tab item, downward curve or upward curve             |
| initialRouteName   | String               | Yes       | The name of the route to render on first load of the navigator          |
| tabBar             | () => JSX.Element    | Yes       | Function that returns a React element to display as the tab bar         |
| renderCircle       | () => JSX.Element    | Yes       | Function that returns a React element to display as the center tab item |
| circleWidth        | Number               | No        | Width of the center tab item                                            |
| style              | ViewStyle            | No        |                                                                         |
| width              | Number               | No        |                                                                         |
| height             | Number               | No        |                                                                         |
| borderTopLeftRight | Boolean              | No        |                                                                         |
| bgColor            | String               | No        |                                                                         |
| strokeWidth        | Number               | No        |                                                                         |

### CurvedBottomBar.Screen

| Props              | Params               | isRequire | Description                                                                               |
| ------------------ | -------------------- | --------- | ----------------------------------------------------------------------------------------- |
| name               | String               | Yes       | Name of the route to jump to                                                              |
| position           | left, right          | Yes       | Set position of screen to the left or right of the center tab item                        |
| component          | () => JSX.Element    | Yes       | Screen params to merge into the destination route                                         |

### Usage
```javascript
    import React, { useState } from 'react';
    import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
    import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
    import Ionicons from 'react-native-vector-icons/Ionicons';

    StatusBar.setBarStyle('dark-content');

    const ThemeScreen = props => {
        const [type, setType] = useState<'down' | 'up'>('down');

        const onClickButton = () => {
            if (type === 'up') {
                setType('down');
                alert('Change type curve down');
            } else {
                setType('up');
                alert('Change type curve up');
            }
        }

        const _renderIcon = (routeName: string, selectTab: string) => {
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
                <Ionicons name={icon} size={23} color={routeName === selectTab ? '#FF3030' : 'gray'} />
            );
        };

        return (
            <View style={styles.container}>
                <CurvedBottomBar.Navigator
                    style={[type === 'down' && {backgroundColor: '#F5F5F5'}]}
                    type={type}
                    height={60}
                    circleWidth={55}
                    bgColor="white"
                    borderTopLeftRight={true}
                    initialRouteName="title1"
                    renderCircle={() => (
                        <TouchableOpacity
                            style={[type === 'down' ? styles.btnCircle : styles.btnCircleUp]} onPress={onClickButton}
                        >
                            <Ionicons name="chatbubbles-outline" size={23} />
                        </TouchableOpacity>
                    )}
                    tabBar={({ routeName, selectTab, navigation }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation(routeName)}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        >
                            {_renderIcon(routeName, selectTab)}
                        </TouchableOpacity>
                    );
                    }}>
                    <CurvedBottomBar.Screen
                        name="title1"
                        position="left"
                        component={() => <View style={{ backgroundColor: '#BFEFFF', flex: 1 }} />}
                    />
                    <CurvedBottomBar.Screen
                        name="title2"
                        component={() => <View style={{ backgroundColor: '#FFEBCD', flex: 1 }} />}
                        position="left"
                    />
                    <CurvedBottomBar.Screen
                        name="title3"
                        component={() => <View style={{ backgroundColor: '#BFEFFF', flex: 1 }} />}
                        position="right"
                    />
                    <CurvedBottomBar.Screen
                        name="title4"
                        component={() => <View style={{ backgroundColor: '#FFEBCD', flex: 1 }} />}
                        position="right"
                    />
                </CurvedBottomBar.Navigator>
            </View>
        );
    };

    export default ThemeScreen;

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
            shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 1,
            bottom: 28
        },
        btnCircleUp: {
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E8E8E8',
            bottom: 18,
            shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 1,
        },
        imgCircle: {
            width: 30,
            height: 30,
            tintColor: '#48CEF6'
        },
        img: {
            width: 30,
            height: 30,
        }
    });

```
### Suggested Packages
- [react-native-utils-scale](https://www.npmjs.com/package/react-native-utils-scale) Provide solutions to make your app flexible for different screen sizes, different devices.
- [react-native-element-dropdown](https://www.npmjs.com/package/react-native-element-dropdown) A react-native dropdown component easy to customize for both iOS and Android.
- [react-native-element-textinput](https://www.npmjs.com/package/react-native-element-textinput) A react-native TextInput component easy to customize for both iOS and Android.
- [react-native-element-image](https://www.npmjs.com/package/react-native-element-image) Automatically calculate width or height based on input Image component for React Native.
- [react-native-element-timer](https://www.npmjs.com/package/react-native-element-timer) React Native Timer Countdown.
- [react-native-vertical-swipe-view](https://www.npmjs.com/package/react-native-vertical-swipe-view) React Native Vertical Swipe View.
- [react-native-checkbox-tree](https://www.npmjs.com/package/react-native-checkbox-tree) A simple and elegant checkbox tree for React Native.
- [react-native-webrtc-simple](https://www.npmjs.com/package/react-native-webrtc-simple) A simple and easy to use module that help in making video call for React Native.
