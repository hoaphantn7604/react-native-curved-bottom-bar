import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useDeviceOrientation } from '../../../useDeviceOrientation';
import type { IProps } from './model';
import { getPath, getPathUp } from './path';
import { styles } from './styles';

const defaultProps = {
  bgColor: 'gray',
  type: 'down',
  borderTopLeftRight: false,
  strokeWidth: 0,
};

const Tab = createBottomTabNavigator();

const BottomBarComponent = React.forwardRef<any, IProps>((props, ref) => {
  const SVG: any = Svg;
  const PATH: any = Path;
  const {
    type,
    style,
    width = null,
    height = 65,
    circleWidth = 50,
    bgColor,
    initialRouteName,
    tabBar,
    renderCircle,
    borderTopLeftRight,
    strokeWidth,
  } = props;

  const [selectedTab, setselectedTab] = useState<string>(initialRouteName);
  const [itemLeft, setItemLeft] = useState([]);
  const [itemRight, setItemRight] = useState([]);
  const [maxWidth, setMaxWidth] = useState<any>(width);
  const children = props?.children as any[];
  const orientation = useDeviceOrientation();

  useImperativeHandle(ref, () => {
    return { navigate: navigate, getRouteName: selectedTab };
  });

  const navigate = (routeName: string) => {
    setRouteName(routeName);
  };

  useEffect(() => {
    const { width: w } = Dimensions.get('window');
    if (!width) {
      setMaxWidth(w);
    }
  }, [orientation, width]);

  const _renderButtonCenter = () => {
    return renderCircle({ selectedTab, navigate });
  };

  const setRouteName = useCallback((name: string) => {
    setselectedTab(name);
  }, []);

  useEffect(() => {
    const arrLeft: any = children.filter(
      (item) => item?.props?.position === 'left'
    );
    const arrRight: any = children.filter(
      (item) => item?.props?.position === 'right'
    );

    setItemLeft(arrLeft);
    setItemRight(arrRight);
    setRouteName(initialRouteName);
  }, [children, initialRouteName, setRouteName]);

  const d =
    type === 'down'
      ? getPath(
          maxWidth,
          height,
          circleWidth >= 50 ? circleWidth : 50,
          borderTopLeftRight
        )
      : getPathUp(
          maxWidth,
          height + 30,
          circleWidth >= 50 ? circleWidth : 50,
          borderTopLeftRight
        );

  const MyTabBar = (props: any) => {
    const { navigation } = props;
    return (
      <View>
        <View style={[styles.container, style]}>
          <SVG width={maxWidth} height={height + (type === 'down' ? 0 : 30)}>
            <PATH
              fill={bgColor}
              stroke="#DDDDDD"
              strokeWidth={strokeWidth}
              {...{ d }}
            />
          </SVG>
          <View
            style={[
              styles.main,
              { width: maxWidth },
              type === 'up' && styles.top30,
            ]}
          >
            <View style={[styles.rowLeft, { height: height }]}>
              {itemLeft.map((item: any, index) => {
                const routeName: string = item?.props?.name;

                return (
                  <View style={styles.flex1} key={index}>
                    {tabBar({
                      routeName,
                      selectedTab: selectedTab,
                      navigate: (selectedTab: string) => {
                        navigation.navigate({ name: routeName, merge: true });
                        setRouteName(selectedTab);
                      },
                    })}
                  </View>
                );
              })}
            </View>
            {_renderButtonCenter()}
            <View style={[styles.rowRight, { height: height }]}>
              {itemRight.map((item: any, index) => {
                const routeName = item?.props?.name;
                return (
                  <View style={styles.flex1} key={index}>
                    {tabBar({
                      routeName,
                      selectedTab: selectedTab,
                      navigate: (selectedTab: string) => {
                        navigation.navigate({ name: routeName, merge: true });
                        setRouteName(selectedTab);
                      },
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Tab.Navigator {...props} tabBar={MyTabBar}>
      {children?.map((e) => {
        return <Tab.Screen {...e.props} />;
      })}
    </Tab.Navigator>
  );
});

BottomBarComponent.defaultProps = defaultProps;

export default BottomBarComponent;
