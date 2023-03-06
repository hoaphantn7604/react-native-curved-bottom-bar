/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {
  useEffect,
  useImperativeHandle,
  useState,
  useMemo,
  ReactElement,
  JSXElementConstructor,
} from 'react';
import { Dimensions, Text, View, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-scaling';
import Svg, { Path } from 'react-native-svg';
import { getPathDown } from '../../utils/pathDown';
import { getPathUp } from '../../utils/pathUp';
import { useDeviceOrientation } from '../../../useDeviceOrientation';
import type { NavigatorBottomBarProps } from './model';
import { styles } from './styles';
const { width: maxW } = Dimensions.get('window');
import { CurvedBottomBarView } from '../ShadowView';

const Tab = createBottomTabNavigator();

const BottomBarComponent: (
  props: NavigatorBottomBarProps
) => ReactElement<any, string | JSXElementConstructor<any>> | null =
  React.forwardRef((props, ref) => {
    const {
      type = 'DOWN',
      circlePosition = 'CENTER',
      style,
      width = null,
      height = 65,
      circleWidth = 50,
      bgColor = 'gray',
      initialRouteName,
      tabBar,
      renderCircle,
      borderTopLeftRight = false,
    } = props;

    const [itemLeft, setItemLeft] = useState<any[]>([]);
    const [itemRight, setItemRight] = useState<any[]>([]);
    const [maxWidth, setMaxWidth] = useState<number>(width || maxW);
    const [isShow, setIsShow] = useState(true);
    const children = props?.children as any[];
    const orientation = useDeviceOrientation();

    useImperativeHandle(ref, () => {
      return { setVisible };
    });

    const setVisible = (visible: boolean) => {
      setIsShow(visible);
    };

    useEffect(() => {
      const { width: w } = Dimensions.get('window');
      if (!width) {
        setMaxWidth(w);
      }
    }, [orientation, width]);

    const _renderButtonCenter = (focusedTab: string, navigate: any) => {
      const getTab = children.filter(
        (e: any) =>
          e?.props?.position === 'CIRCLE' || e?.props?.position === 'CENTER'
      )[0]?.props?.name;

      return renderCircle({
        routeName: getTab,
        selectedTab: focusedTab,
        navigate: (selectTab: string) => {
          if (selectTab) {
            navigate(selectTab);
          }
        },
      });
    };

    useEffect(() => {
      const arrLeft: any = children.filter(
        (item) => item?.props?.position === 'LEFT'
      );
      const arrRight: any = children.filter(
        (item) => item?.props?.position === 'RIGHT'
      );

      setItemLeft(arrLeft);
      setItemRight(arrRight);
    }, [children, initialRouteName]);

    const getCircleWidth = useMemo(() => {
      return circleWidth < 50 ? 50 : circleWidth > 60 ? 60 : circleWidth;
    }, [circleWidth]);

    const getTabbarHeight = useMemo(() => {
      return height < 50 ? 50 : height > 90 ? 90 : height;
    }, [height]);

    const d =
      type === 'DOWN'
        ? getPathDown(
            maxWidth,
            getTabbarHeight,
            getCircleWidth,
            borderTopLeftRight,
            circlePosition
          )
        : getPathUp(
            maxWidth,
            getTabbarHeight + 30,
            getCircleWidth,
            borderTopLeftRight,
            circlePosition
          );

    const renderItem = ({ color, routeName, navigate }: any) => {
      return (
        <TouchableOpacity
          key={routeName}
          style={styles.itemTab}
          onPress={() => navigate(routeName)}
        >
          <Text style={{ color: color }}>{routeName}</Text>
        </TouchableOpacity>
      );
    };

    const _renderTabIcon = (
      arr: any[],
      focusedTab: string,
      navigation: any
    ) => {
      return (
        <View style={[styles.rowLeft, { height: scale(getTabbarHeight) }]}>
          {arr.map((item: any, index) => {
            const routeName: string = item?.props?.name;

            if (tabBar === undefined) {
              return renderItem({
                routeName,
                color: focusedTab === routeName ? 'blue' : 'gray',
                navigate: navigation.navigate,
              });
            }

            return (
              <View style={styles.flex1} key={index.toString()}>
                {tabBar({
                  routeName,
                  selectedTab: focusedTab,
                  navigate: (selectTab: string) => {
                    if (selectTab !== focusedTab) {
                      navigation.navigate({
                        name: routeName,
                        merge: true,
                      });
                    }
                  },
                })}
              </View>
            );
          })}
        </View>
      );
    };

    const renderPosition = (props: any) => {
      const { state, navigation } = props;
      const focusedTab = state?.routes[state.index].name;

      if (circlePosition === 'LEFT') {
        return (
          <>
            <View style={{ marginLeft: scale(getCircleWidth) / 2 }}>
              {_renderButtonCenter(focusedTab, navigation.navigate)}
            </View>
            {_renderTabIcon(
              [...itemLeft, ...itemRight],
              focusedTab,
              navigation
            )}
          </>
        );
      }

      if (circlePosition === 'RIGHT') {
        return (
          <>
            {_renderTabIcon(
              [...itemLeft, ...itemRight],
              focusedTab,
              navigation
            )}
            <View style={{ marginRight: scale(getCircleWidth) / 2 }}>
              {_renderButtonCenter(focusedTab, navigation.navigate)}
            </View>
          </>
        );
      }

      return (
        <>
          {_renderTabIcon(itemLeft, focusedTab, navigation)}
          {_renderButtonCenter(focusedTab, navigation.navigate)}
          {_renderTabIcon(itemRight, focusedTab, navigation)}
        </>
      );
    };

    const _renderTabContainer = (props: any) => {
      return (
        <View
          style={[
            styles.main,
            { width: maxWidth },
            type === 'UP' && styles.top30,
          ]}
        >
          {renderPosition(props)}
        </View>
      );
    };

    const MyTabBar = (props: any) => {
      if (!isShow) {
        return null;
      }

      return (
        <View style={[styles.container, style]}>
          <CurvedBottomBarView style={styles.shadow}>
            <Svg
              width={maxWidth}
              height={
                scale(getTabbarHeight) + (type === 'DOWN' ? 0 : scale(30))
              }
            >
              <Path fill={bgColor} {...{ d }} />
            </Svg>
          </CurvedBottomBarView>
          {_renderTabContainer(props)}
        </View>
      );
    };

    return (
      <Tab.Navigator {...props} tabBar={MyTabBar}>
        {children?.map((e: any, index: number) => {
          return <Tab.Screen key={index.toString()} {...e.props} />;
        })}
      </Tab.Navigator>
    );
  });

export default BottomBarComponent;
