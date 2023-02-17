import * as shape from 'd3-shape';
import { scale } from 'react-native-size-scaling';

//** Path Line */
const line = (width: number, height: number) => {
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
const lineBorder = (width: number, height: number) => {
  const border = (shape as any)
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

  return border;
};

//** Path Line Border Left Right Down */
const lineBorderLeft = (width: number, height: number) => {
  const border = (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)
    .curve(shape.curveBasis)([
    // right
    { x: width, y: scale(30) },
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

  return border;
};

//** Path Line Border Left Right Down */
const lineBorderRight = (width: number, height: number) => {
  const border = (shape as any)
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
    { x: 0, y: scale(30) },
  ]);

  return border;
};

//** Path Curved Up */
const lineCurved = (iPosition: number, circle: number) => {
  const position = iPosition;
  const circleWidth = circle + position;
  const trim = (position + circleWidth) / 2;

  const curved = (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)
    .curve(shape.curveBasis)([
    { x: position - scale(50), y: scale(30) },
    { x: position - scale(8), y: scale(30) },
    { x: position - scale(3), y: scale(10) },

    { x: trim, y: 0 },

    { x: circleWidth + scale(3), y: scale(10) },
    { x: circleWidth + scale(8), y: scale(30) },
    { x: circleWidth + scale(50), y: scale(30) },
  ]);

  return curved;
};

export const getPathUp = (
  width: number,
  iHeight: number,
  centerWidth = 50,
  borderTopLeftRight = false,
  position: 'CENTER' | 'LEFT' | 'RIGHT'
) => {
  const height = scale(iHeight);
  const circleWidth = scale(centerWidth);

  if (borderTopLeftRight && position === 'LEFT') {
    return `${lineBorderRight(width, height)} ${lineCurved(
      circleWidth / 1.7,
      circleWidth
    )}`;
  }

  if (borderTopLeftRight && position === 'RIGHT') {
    return `${lineBorderLeft(width, height)} ${lineCurved(
      width - circleWidth * 1.6,
      circleWidth
    )}`;
  }

  if (borderTopLeftRight && position === 'CENTER') {
    return `${lineBorder(width, height)} ${lineCurved(
      width / 2 - circleWidth / 2,
      circleWidth
    )}`;
  }

  if (position === 'LEFT') {
    return `${line(width, height)} ${lineCurved(
      circleWidth / 1.7,
      circleWidth
    )}`;
  }

  if (position === 'RIGHT') {
    return `${line(width, height)} ${lineCurved(
      width - circleWidth * 1.6,
      circleWidth
    )}`;
  }

  return `${line(width, height)} ${lineCurved(
    width / 2 - circleWidth / 2,
    circleWidth
  )}`;
};
