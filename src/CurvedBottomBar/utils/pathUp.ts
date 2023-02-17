import * as shape from 'd3-shape';
import { scale } from 'react-native-size-scaling';

//** Path Line */
const lineUp = (width: number, height: number) => {
  const path = (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)([
    { x: width / 2, y: scale(30) },
    { x: 0, y: scale(30) },
    { x: 0, y: height },
    { x: width, y: height },
    { x: width, y: scale(30) },
    { x: width / 2, y: scale(30) },
  ]);

  return path;
};

//** Path Line Border Left Right Up */
const lineBorderUp = (width: number, height: number) => {
  const lineBorder = (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)
    .curve(shape.curveBasis)([
    // right
    { x: width / 2, y: scale(30) },
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
    { x: width / 2, y: scale(30) },
  ]);

  return lineBorder;
};

//** Path Curved Up */
const lineCurvedUp = (width: number, circleWidth: number) => {
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

  return curved;
};

export const getPathUp = (
  width: number,
  iHeight: number,
  centerWidth = 50,
  borderTopLeftRight = false
) => {
  const height = scale(iHeight);
  const circleWidth = scale(centerWidth);

  if (borderTopLeftRight) {
    return `${lineBorderUp(width, height)} ${lineCurvedUp(width, circleWidth)}`;
  } else {
    return `${lineUp(width, height)} ${lineCurvedUp(width, circleWidth)}`;
  }
};
