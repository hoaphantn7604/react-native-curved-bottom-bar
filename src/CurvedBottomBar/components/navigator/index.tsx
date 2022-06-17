/* eslint-disable no-shadow */
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
import type { NavigatorBottomBarProps } from './model';
import { getPath, getPathUp } from './path';
import { styles } from './styles';
const { width: maxW } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const BottomBarComponent = React.forwardRef<any, NavigatorBottomBarProps>(
  (props, ref) => {
    const SVG: any = Svg;
    const PATH: any = Path;
    const {
      type = 'down',
      style,
      width = null,
      height = 65,
      circleWidth = 50,
      bgColor = 'gray',
      initialRouteName,
      tabBar,
      renderCircle,
      borderTopLeftRight = false,
      strokeWidth = 0,
    } = props;

    const [selectedTab, setselectedTab] = useState<string>(initialRouteName);
    const [itemLeft, setItemLeft] = useState<any[]>([]);
    const [itemRight, setItemRight] = useState<any[]>([]);
    const [maxWidth, setMaxWidth] = useState<number>(width || maxW);
    const children = props?.children as any[];
    const orientation = useDeviceOrientation();

    useImperativeHandle(ref, () => {
      return {};
    });

    useEffect(() => {
      const { width: w } = Dimensions.get('window');
      if (!width) {
        setMaxWidth(w);
      }
    }, [orientation, width]);

    const _renderButtonCenter = (navigate: any) => {
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
                        navigate: (selectTab: string) => {
                          if (selectTab !== selectedTab) {
                            navigation.navigate({
                              name: routeName,
                              merge: true,
                            });
                            setRouteName(selectTab);
                          }
                        },
                      })}
                    </View>
                  );
                })}
              </View>
              {_renderButtonCenter(navigation.navigate)}
              <View style={[styles.rowRight, { height: height }]}>
                {itemRight.map((item: any, index) => {
                  const routeName = item?.props?.name;
                  return (
                    <View style={styles.flex1} key={index}>
                      {tabBar({
                        routeName,
                        selectedTab: selectedTab,
                        navigate: (selectTab: string) => {
                          if (selectTab !== selectedTab) {
                            navigation.navigate({
                              name: routeName,
                              merge: true,
                            });
                            setRouteName(selectTab);
                          }
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
        {children?.map((e: any) => {
          return <Tab.Screen {...e.props} />;
        })}
      </Tab.Navigator>
    );
  }
);

export default BottomBarComponent;
