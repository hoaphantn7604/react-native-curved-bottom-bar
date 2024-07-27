import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { CurvedBottomBarView } from '../ShadowView';
import { CurvedView } from './model';

const CurvedContainer: CurvedView = (props) => {
  const { style, width, height, bgColor, path, borderColor, borderWidth } =
    props;

  const border =
    borderWidth && borderWidth > 0
      ? { stroke: borderColor, strokeWidth: borderWidth }
      : {};

  return (
    <CurvedBottomBarView style={style}>
      <Svg width={width} height={height}>
        <Path fill={bgColor} {...{ d: path }} {...border} />
      </Svg>
    </CurvedBottomBarView>
  );
};

export const CurvedViewComponent: CurvedView = React.memo(CurvedContainer);
