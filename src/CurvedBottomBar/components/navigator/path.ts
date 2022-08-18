import * as shape from 'd3-shape';
import { scale } from 'react-native-size-scaling';

export const getPath = (
  width: number,
  iHeight: number,
  centerWidth: number,
  borderTopLeftRight = false
) => {
  const height = scale(iHeight);
  const circleWidth = scale(centerWidth) + scale(16);

  const line: any = (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)([
    { x: (width - circleWidth) / 2 + circleWidth + scale(20), y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
    { x: (width - circleWidth) / 2 - scale(20), y: 0 },
  ]);

  const curved = (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)
    .curve(shape.curveBasis)(
    [
      { x: (width - circleWidth) / 2 - scale(20), y: 0 }, // border center left
      { x: (width - circleWidth) / 2 - scale(10), y: scale(2) },
      { x: (width - circleWidth) / 2 - scale(2), y: scale(10) },
      { x: (width - circleWidth) / 2, y: scale(17) },

      { x: width / 2 - circleWidth / 2 + scale(8), y: height / 2 + scale(2) },
      { x: width / 2 - scale(10), y: height / 2 + scale(10) },
      { x: width / 2, y: height / 2 + scale(10) },
      { x: width / 2 + scale(10), y: height / 2 + scale(10) },
      { x: width / 2 + circleWidth / 2 - scale(8), y: height / 2 + scale(2) },

      { x: (width - circleWidth) / 2 + circleWidth, y: scale(17) }, // border center right
      { x: (width - circleWidth) / 2 + circleWidth + scale(2), y: scale(10) },
      { x: (width - circleWidth) / 2 + circleWidth + scale(10), y: scale(2) },
      { x: (width - circleWidth) / 2 + circleWidth + scale(20), y: 0 },
    ],
    line
  );

  const path = `${curved} ${line}`;

  const pathBorderTopLeftRight = (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)
    .curve(shape.curveBasis)([
    // right
    { x: (width - circleWidth) / 2 + circleWidth + scale(20), y: 0 },
    { x: width - scale(20), y: 0 },
    { x: width - scale(10), y: scale(2) },
    { x: width - scale(2), y: scale(10) },
    { x: width, y: scale(20) },
    { x: width, y: height },
    { x: width, y: height },
    // bottom
    { x: width, y: height },
    { x: 0, y: height },
    // left
    { x: 0, y: height },
    { x: 0, y: height },
    { x: 0, y: scale(20) },
    { x: 0 + scale(2), y: scale(10) },
    { x: 0 + scale(10), y: scale(2) },
    { x: 0 + scale(20), y: 0 },
    { x: (width - circleWidth) / 2 - scale(20), y: 0 },

    { x: (width - circleWidth) / 2 - scale(20), y: 0 }, // border center left
    { x: (width - circleWidth) / 2 - scale(10), y: scale(2) },
    { x: (width - circleWidth) / 2 - scale(2), y: scale(10) },
    { x: (width - circleWidth) / 2, y: scale(17) },

    { x: width / 2 - circleWidth / 2 + scale(8), y: height / 2 + scale(2) },
    { x: width / 2 - scale(10), y: height / 2 + scale(10) },
    { x: width / 2, y: height / 2 + scale(10) },
    { x: width / 2 + scale(10), y: height / 2 + scale(10) },
    { x: width / 2 + circleWidth / 2 - scale(8), y: height / 2 + scale(2) },

    { x: (width - circleWidth) / 2 + circleWidth, y: scale(17) }, // border center right
    { x: (width - circleWidth) / 2 + circleWidth + scale(2), y: scale(10) },
    { x: (width - circleWidth) / 2 + circleWidth + scale(10), y: scale(2) },
    { x: (width - circleWidth) / 2 + circleWidth + scale(20), y: 0 },
  ]);

  if (borderTopLeftRight) {
    return pathBorderTopLeftRight;
  }

  return path;
};

export const getPathUp = (
  width: number,
  iHeight: number,
  centerWidth = 50,
  borderTopLeftRight = false
) => {
  const height = scale(iHeight);
  const circleWidth = scale(centerWidth);

  const line = (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)([
    { x: width / 2 - circleWidth, y: scale(30) },
    { x: 0, y: scale(30) },
    { x: 0, y: height },
    { x: width, y: height },
    { x: width, y: scale(30) },
    { x: width / 2 + circleWidth, y: scale(30) },
  ]);

  const curved = (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)
    .curve(shape.curveBasis)([
    { x: width / 2 - (circleWidth + scale(20)), y: scale(30) },
    { x: width / 2 - circleWidth / 1.3, y: scale(30) },
    { x: width / 2 - circleWidth / 2, y: scale(10) },
    { x: width / 2, y: 0 },
    { x: width / 2 + circleWidth / 2, y: scale(10) },
    { x: width / 2 + circleWidth / 1.3, y: scale(30) },
    { x: width / 2 + circleWidth + scale(20), y: scale(30) },
  ]);

  const pathBorderTopLeftRight = (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)
    .curve(shape.curveBasis)([
    // right
    { x: width / 2 + circleWidth + scale(20), y: scale(30) },
    { x: width - scale(20), y: scale(30) },
    { x: width - scale(10), y: scale(32) },
    { x: width - scale(2), y: scale(40) },
    { x: width, y: scale(50) },
    { x: width, y: height },
    { x: width, y: height },
    // bottom
    { x: width, y: height },
    { x: 0, y: height },
    // left
    { x: 0, y: height },
    { x: 0, y: height },
    { x: 0, y: scale(50) },
    { x: 0 + scale(2), y: scale(40) },
    { x: 0 + scale(10), y: scale(32) },
    { x: 0 + scale(20), y: scale(30) },
    { x: (width - circleWidth) / 2 - scale(20), y: scale(30) },

    { x: width / 2 - (circleWidth + scale(20)), y: scale(30) },
    { x: width / 2 - circleWidth / 1.3, y: scale(30) },
    { x: width / 2 - circleWidth / 2, y: scale(10) },
    { x: width / 2, y: 0 },
    { x: width / 2 + circleWidth / 2, y: scale(10) },
    { x: width / 2 + circleWidth / 1.3, y: scale(30) },
    { x: width / 2 + circleWidth + scale(20), y: scale(30) },
  ]);

  const path = `${line} ${curved}`;

  if (borderTopLeftRight) {
    return pathBorderTopLeftRight;
  }

  return path;
};
