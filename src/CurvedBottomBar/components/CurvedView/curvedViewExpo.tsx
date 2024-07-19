import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { CurvedView } from './model';

const CurvedContainer: CurvedView = (props) => {
  const { style, width, height, bgColor, path, strokeColor, strokeWidth } =
    props;

  return (
    <View style={style}>
      <Svg width={width} height={height}>
        <Path
          fill={bgColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          {...{ d: path }}
        />
      </Svg>
    </View>
  );
};

export const CurvedViewExpoComponent: CurvedView = React.memo(CurvedContainer);
