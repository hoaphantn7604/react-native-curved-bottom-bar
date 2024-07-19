import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { CurvedBottomBarView } from '../ShadowView';
import { CurvedView } from './model';

const CurvedContainer: CurvedView = (props) => {
  const { style, width, height, bgColor, path, strokeColor, strokeWidth } =
    props;

  return (
    <CurvedBottomBarView style={style}>
      <Svg width={width} height={height}>
        <Path
          fill={bgColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          {...{ d: path }}
        />
      </Svg>
    </CurvedBottomBarView>
  );
};

export const CurvedViewComponent: CurvedView = React.memo(CurvedContainer);
