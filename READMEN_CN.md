![](https://github.com/hoaphantn7604/file-upload/blob/master/document/navigationbar/react-native-curved-bottom-bar-demo.png)

# react-native-curved-bottom-bar
一个美观，高性能且可以自定义的 React Native 底部导航栏。
使用 [react-native-svg](https://github.com/react-native-svg/react-native-svg) 和 [@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator).

```js
如果你喜欢这个库，请给我们一颗Star，你会成为我们生活中的一缕阳光:) 
```

### 免费的 React Native 模板
一个好看的[React Native 模板](https://github.com/hoaphantn7604/react-native-template-components).
## 开始
```js
npm install react-native-curved-bottom-bar --save
```
或
```js
yarn add react-native-curved-bottom-bar
```
然后需要安装 [react-native-svg](https://github.com/react-native-svg/react-native-svg) 和 [@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator).

## 示例

[<img src="https://github.com/hoaphantn7604/file-upload/blob/master/document/navigationbar/react-native-curved-bottom-bat-thumbnail.jpg">](https://youtu.be/FIuhT2QYie8)


<br />

![](https://github.com/hoaphantn7604/file-upload/blob/master/document/navigationbar/react-native-curved-bottom-bar.gif)


### CurvedBottomBar.Navigator

| 名称              | 参数                                                | 是否必须 | 描述                                                       |
|--------------------|-------------------------------------------------------| --------- |-------------------------------------------------------------------|
| type               | 'DOWN' or 'UP'                                        | 是       | 中间选项卡项目的类型，向下曲线或向上曲线       |
| circlePosition     | 'CENTER' or 'LEFT' or 'RIGHT'                         | 否        | 圆圈按钮位置                                         |
| initialRouteName   | String                                                | 是       | 首次加载导航器时要渲染的路由的名称    |
| tabBar             | ({ routeName, selectedTab, navigate }) => JSX.Element | 是       | 返回 React 元素以显示为选项卡栏的函数   |
| renderCircle       | ({ routeName, selectedTab, navigate }) => JSX.Element | 是       | 返回 React 元素以显示为中心选项卡项的函数 |
| circleWidth        | Number                                                | 否        | 自定义中心选项卡项的宽度。最小为 50 像素，最大为 60 像素 |
| style              | ViewStyle                                             | 否        | 容器的样式                                       |
| shadowStyle        | ViewStyle                                             | 否        | 阴影的样式                                   |
| width              | Number                                                | 否        | 自定义容器的宽度                              |
| height             | Number                                                | 否        |自定义容器的高度，最小值为 50 像素，最大值为 90 像素 |
| borderTopLeftRight | Boolean                                               | 否        | 容器左上角和右上角的边框半径            |
| borderColor        | String                                                | 否        | 边框颜色                                                     |
| borderWidth        | Number                                                | 否        | 边框宽度                                                 |
| bgColor            | String                                                | 否        | 容器的背景色                               |


### CurvedBottomBar.Screen（弯曲底部栏）

| 名称              | 参数                                                | 是否必须 | 描述                                                                                  |
| ------------------ | ----------------------------- | --------- | ----------------------------------------------------------------------------------------- |
| name               | String                        | 是       | 要跳转到的路由名称                                                              |
| position           | 'LEFT' or 'RIGHT' or 'CIRCLE' | 是       | 将tabbar图标的位置设置为圆圈按钮的左侧或右侧。仅当您希望圆圈按钮是选项卡视图时，才使用类型 “CIRCLE” |
| component          | (props) => JSX.Element        | 是       | 筛选要合并到目标路由中的参数                                         |

### API
| 函数           | 参数                        | 描述                                                                               |
| ------------------ | ----------------------------- | ----------------------------------------------------------------------------------------- |
| setVisible         | Boolean                       | 用于隐藏/显示标签栏。例如：ref.current.setVisible（false）                        |

### 在Expo中使用
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/navigationbar/react-native-curved-bottom-bar-1.png)
```js
import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';

const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};

export default function App() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'title1':
        icon = 'ios-home-outline';
        break;
      case 'title2':
        icon = 'settings-outline';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? 'black' : 'gray'}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="title1"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert('Click Action')}
            >
              <Ionicons name={'apps-sharp'} color="gray" size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="title1"
          position="LEFT"
          component={() => <Screen1 />}
        />
        <CurvedBottomBarExpo.Screen
          name="title2"
          component={() => <Screen2 />}
          position="RIGHT"
        />
      </CurvedBottomBarExpo.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 30,
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
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});

```

### 在RN中使用
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/navigationbar/react-native-curved-bottom-bar-2.png)
```js
import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';

const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};

export default function App() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'title1':
        icon = 'ios-home-outline';
        break;
      case 'title2':
        icon = 'settings-outline';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? 'black' : 'gray'}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer>
      <CurvedBottomBar.Navigator
        type="UP"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="title1"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert('Click Action')}
            >
              <Ionicons name={'apps-sharp'} color="gray" size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBar.Screen
          name="title1"
          position="LEFT"
          component={() => <Screen1 />}
        />
        <CurvedBottomBar.Screen
          name="title2"
          component={() => <Screen2 />}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
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
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});

```
<br />

[<img src="https://github.com/hoaphantn7604/file-upload/blob/master/document/profile/hoa_phan_dev_banner.png">](https://github.com/hoaphantn7604)
