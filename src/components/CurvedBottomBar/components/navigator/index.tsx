import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useDeviceOrientation } from '../../../useDeviceOrientation';
import { getPath, getPathUp } from './path';
import { styles } from './styles';
import { NavigatorBottomBar } from './type';

const defaultProps = {
  bgColor: 'gray',
  type: 'down',
  borderTopLeftRight: false,
  strokeWidth: 0
};

const BottomBarComponent: NavigatorBottomBar = (props) => {
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
    strokeWidth
  } = props;

  const [selectTab, setSelectTab] = useState<string>(initialRouteName);
  const [itemLeft, setItemLeft] = useState([]);
  const [itemRight, setItemRight] = useState([]);
  const [maxWidth, setMaxWidth] = useState<any>(width);
  const [maxHeight, setMaxHeight] = useState<any>(Dimensions.get('window').height);
  const children = props?.children as any[];
  const orientation = useDeviceOrientation();
  const ref: any = useRef(null);

  useEffect(() => {
    const { width: w, height: h } = Dimensions.get('window');
    if (!width) {
      setMaxWidth(w);
    }
    setMaxHeight(h);

    setTimeout(() => {
      setRouteName(selectTab);
    }, 300);
  }, [orientation])

  const _renderButtonCenter = () => {
    return renderCircle();
  };

  useEffect(() => {
    const arrLeft: any = children.filter((item) => item.props.position === 'left');
    const arrRight: any = children.filter((item) => item.props.position === 'right');

    setItemLeft(arrLeft);
    setItemRight(arrRight);

    setRouteName(initialRouteName);
  }, []);

  const setRouteName = (name: string) => {
    setSelectTab(name);
    const index = children.findIndex(e => e.props.name == name);
    if (index >= 0) {
      ref.current.scrollToIndex({ index: index, animated: false });
    }
  };

  const d = type === 'down' ? getPath(maxWidth, height, circleWidth >= 50 ? circleWidth : 50, borderTopLeftRight) : getPathUp(maxWidth, height + 30, circleWidth >= 50 ? circleWidth : 50, borderTopLeftRight);
  if (d) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: maxHeight, width: maxWidth, backgroundColor: 'white' }}>
          <FlatList
            ref={ref}
            style={{ flex: 1 }}
            data={children}
            keyExtractor={(e, i) => i.toString()}
            extraData={orientation}
            horizontal
            scrollEnabled={false}
            renderItem={({ item, index }) => <View style={{ width: maxWidth, height: maxHeight }} key={index}>{item.props.component()}</View>}
          />
        </View>

        <View style={[styles.container, style]}>
          <Svg width={maxWidth} height={height + (type === 'down' ? 0 : 30)}>
            <Path fill={bgColor} stroke="#DDDDDD" strokeWidth={strokeWidth} {...{ d }} />
          </Svg>
          <View style={[styles.main, { width: maxWidth }, type === 'up' && { top: 30 }]}>
            <View style={[styles.rowLeft, { height: height }]}>
              {itemLeft.map((item: any, index) => {
                const routeName: string = item.props.name;

                return (
                  <View style={{ flex: 1 }} key={index}>
                    {tabBar({
                      routeName,
                      selectTab: selectTab,
                      navigation: (selectTab: string) => {
                        setRouteName(selectTab);
                      },
                    })}
                  </View>
                );
              })}
            </View>
            {_renderButtonCenter()}
            <View style={[styles.rowRight, { height: height }]}>
              {itemRight.map((item: any, index) => {
                const routeName = item.props.name;
                return (
                  <View style={{ flex: 1 }} key={index}>
                    {tabBar({
                      routeName,
                      selectTab: selectTab,
                      navigation: (selectTab: string) => {
                        setRouteName(selectTab);
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
};

BottomBarComponent.defaultProps = defaultProps;

export default BottomBarComponent;
