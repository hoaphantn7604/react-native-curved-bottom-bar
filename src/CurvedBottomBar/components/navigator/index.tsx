/* eslint-disable no-shadow */
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Svg, { Path } from 'react-native-svg';
import { useDeviceOrientation } from '../../../useDeviceOrientation';
import { getPath, getPathUp } from './path';
import { styles } from './styles';
import type { IProps } from './model';

const defaultProps = {
  bgColor: 'gray',
  type: 'down',
  borderTopLeftRight: false,
  strokeWidth: 0,
};

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
    swipeEnabled = false,
    lazy = false,
  } = props;

  const [selectedTab, setselectedTab] = useState<string>(initialRouteName);
  const [itemLeft, setItemLeft] = useState([]);
  const [itemRight, setItemRight] = useState([]);
  const [maxWidth, setMaxWidth] = useState<any>(width);
  const children = props?.children as any[];
  const orientation = useDeviceOrientation();
  const refPageView: any = useRef(null);
  const [lazyList] = useState<Boolean[]>(
    [...Array(children.length)].map(() => {
      return false;
    })
  );

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

  const selectedTabIndex = useMemo(() => {
    const index = children.findIndex((e) => e.props?.name === initialRouteName);
    if (index >= 0) {
      return index;
    }
    return 0;
  }, [children, initialRouteName]);

  const setRouteName = useCallback(
    (name: string) => {
      setselectedTab(name);
      const index = children.findIndex((e) => e.props?.name === name);
      if (index >= 0) {
        refPageView.current.setPageWithoutAnimation(index);
      }
    },
    [children]
  );

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

  const onPageSelected = (index: number) => {
    setselectedTab(children[index].props?.name);
  };

  const tabSelected = useMemo(() => {
    const selectIndex = children.findIndex(
      (e) => e.props?.name === selectedTab
    );
    lazyList[selectIndex] = true;
    return lazyList;
  }, [children, lazyList, selectedTab]);

  const _renderTab = (item: any, index: number) => {
    if (lazy) {
      return (
        <View key={index.toString()} style={styles.flex1}>
          {item.props.renderHeader &&
            item.props.renderHeader({
              navigate: (routeName: string) => {
                setRouteName(routeName);
              },
            })}
          {tabSelected[index] &&
            item.props.component({
              navigate: (routeName: string) => {
                setRouteName(routeName);
              },
            })}
        </View>
      );
    } else {
      return (
        <View key={index.toString()} style={styles.flex1}>
          {item.props.renderHeader &&
            item.props.renderHeader({
              navigate: (routeName: string) => {
                setRouteName(routeName);
              },
            })}
          {item.props.component({
            navigate: (routeName: string) => {
              setRouteName(routeName);
            },
          })}
        </View>
      );
    }
  };

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
  if (d) {
    return (
      <View style={styles.flex1}>
        <PagerView
          ref={refPageView}
          style={styles.flex1}
          initialPage={selectedTabIndex}
          scrollEnabled={lazy ? false : swipeEnabled}
          onPageSelected={(e: { nativeEvent: { position: number } }) =>
            onPageSelected(e.nativeEvent.position)
          }
        >
          {children.map(_renderTab)}
        </PagerView>

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
  }
  return null;
});

BottomBarComponent.defaultProps = defaultProps;

export default BottomBarComponent;
