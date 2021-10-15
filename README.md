## react-native-curved-bottom-bar
A high performance, beautiful and fully customizable curved bottom navigation bar for React Native.
Implemented using [react-native-svg](https://github.com/react-native-svg/react-native-svg) and [react-native-pager-view](https://github.com/callstack/react-native-pager-view).
## Getting started
```js
    npm install react-native-curved-bottom-bar --save
```
or
```js
    yarn add react-native-curved-bottom-bar
```
Now we need to install [react-native-svg](https://github.com/react-native-svg/react-native-svg) and [react-native-pager-view](https://github.com/callstack/react-native-pager-view).

```js
    npm install react-native-svg react-native-pager-view --save
```
or
```js
    yarn add react-native-svg react-native-pager-view
```


#### Source code demo
[react-native-template-components](https://github.com/hoaphantn7604/react-native-template-components) A beautiful template for React Native.
### Demo
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/navigationbar/demo.gif)


### CurvedBottomBar.Navigator

| Props              | Params                                              | isRequire | Description                                                             | 
| ------------------ | --------------------------------------------------- | --------- | ----------------------------------------------------------------------- |
| type               | 'down' or 'up'                                      | Yes       | Type of the center tab item, downward curve or upward curve             |
| initialRouteName   | String                                              | Yes       | The name of the route to render on first load of the navigator          |
| tabBar             | ({ routeName, selectTab, navigate }) => JSX.Element | Yes       | Function that returns a React element to display as the tab bar         |
| renderCircle       | ({ selectTab, navigate }) => JSX.Element            | Yes       | Function that returns a React element to display as the center tab item |
| circleWidth        | Number                                              | No        | Customize width of the center tab item. Minimum is 50px                 |
| style              | ViewStyle                                           | No        | Styling for container view                                              |
| width              | Number                                              | No        | Customize width for container view                                      |
| height             | Number                                              | No        | Customize height for container view                                     |
| borderTopLeftRight | Boolean                                             | No        | Border radius top left and top right of container view                  |
| bgColor            | String                                              | No        | Background color of container view                                      |
| strokeWidth        | Number                                              | No        | Border width of container view                                          |
| swipeEnabled       | Boolean                                             | No        | Indicating whether to enable swipe gestures                             |
| lazy               | Boolean                                             | No        | If "lazy" is true then "swipeEnabled" is disabled                       |

### Method

| API                | Params               | Description                                                             | 
| ------------------ | -------------------- | ----------------------------------------------------------------------- |
| navigate           | () => void           | Navigate to a tabbar                                                    |
| getRouteName       | String               | Return route name                                                       |

### CurvedBottomBar.Screen

| Props              | Params                        | isRequire | Description                                                                               |
| ------------------ | ----------------------------- | --------- | ----------------------------------------------------------------------------------------- |
| name               | String                        | Yes       | Name of the route to jump to                                                              |
| position           | left, right, center           | Yes       | Set position of screen to the left or right of the center button. Use type "center" only when you want the center button is a tabview                      |
| component          | ({ navigate }) => JSX.Element | Yes       | Screen params to merge into the destination route                                         |

### Usage
```javascript
    import React, { useState, useRef } from 'react';
    import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
    import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
    import Ionicons from 'react-native-vector-icons/Ionicons';

    StatusBar.setBarStyle('dark-content');

    const ThemeScreen = props => {
        const ref = useRef();
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
                    ref={ref}
                    style={[type === 'down' && {backgroundColor: '#F5F5F5'}]}
                    type={type}
                    height={60}
                    circleWidth={55}
                    bgColor="white"
                    borderTopLeftRight={true}
                    initialRouteName="title1"
                    renderCircle={({ selectTab, navigate }) => (
                        <TouchableOpacity
                            style={[type === 'down' ? styles.btnCircle : styles.btnCircleUp]} onPress={onClickButton}
                        >
                            <Ionicons name="chatbubbles-outline" size={23} />
                        </TouchableOpacity>
                    )}
                    tabBar={({ routeName, selectTab, navigate }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigate(routeName)}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        >
                            {_renderIcon(routeName, selectTab)}
                        </TouchableOpacity>
                    );
                    }}>
                    <CurvedBottomBar.Screen
                        name="title1"
                        position="left"
                        component={({ navigate }) => <View style={{ backgroundColor: '#BFEFFF', flex: 1 }} />}
                    />
                    <CurvedBottomBar.Screen
                        name="title2"
                        component={({ navigate }) => <View style={{ backgroundColor: '#FFEBCD', flex: 1 }} />}
                        position="left"
                    />
                    <CurvedBottomBar.Screen
                        name="title3"
                        component={({ navigate }) => <View style={{ backgroundColor: '#BFEFFF', flex: 1 }} />}
                        position="right"
                    />
                    <CurvedBottomBar.Screen
                        name="title4"
                        component={({ navigate }) => <View style={{ backgroundColor: '#FFEBCD', flex: 1 }} />}
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