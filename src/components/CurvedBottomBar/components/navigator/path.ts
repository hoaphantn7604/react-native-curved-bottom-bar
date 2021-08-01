import * as shape from 'd3-shape';

export const getPath = (width: number, height: number, centerWidth: number, borderTopLeftRight: boolean = false) => {
  const circleWidth = centerWidth + 16;

  const line = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
      { x: (width - circleWidth) / 2 + circleWidth + 20, y: 0 },
      { x: width, y: 0 },
      { x: width, y: height },
      { x: 0, y: height },
      { x: 0, y: 0 },
      { x: (width - circleWidth) / 2 - 20, y: 0 },
    ]);

  const curved = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([

      { x: (width - circleWidth) / 2 - 20, y: 0 }, // border center left
      { x: (width - circleWidth) / 2 - 10, y: 2 },
      { x: (width - circleWidth) / 2 - 2, y: 10 },
      { x: (width - circleWidth) / 2, y: 17 },

      { x: width / 2 - circleWidth / 2 + 8, y: height / 2 + 2 },
      { x: width / 2 - 10, y: height / 2 + 10 },
      { x: width / 2, y: height / 2 + 10 },
      { x: width / 2 + 10, y: height / 2 + 10 },
      { x: width / 2 + circleWidth / 2 - 8, y: height / 2 + 2 },

      { x: (width - circleWidth) / 2 + circleWidth, y: 17 }, // border center right
      { x: (width - circleWidth) / 2 + circleWidth + 2, y: 10 },
      { x: (width - circleWidth) / 2 + circleWidth + 10, y: 2 },
      { x: (width - circleWidth) / 2 + circleWidth + 20, y: 0 },

    ], line);

  const path = `${curved} ${line}`;

  const pathBorderTopLeftRight = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
      // right
      { x: (width - circleWidth) / 2 + circleWidth + 20, y: 0 },
      { x: width - 20, y: 0 },
      { x: width - 10, y: 2 },
      { x: width - 2, y: 10 },
      { x: width, y: 20 },
      { x: width, y: height },
      { x: width, y: height },
      // bottom 
      { x: width, y: height },
      { x: 0, y: height },
      // left
      { x: 0, y: height },
      { x: 0, y: height },
      { x: 0, y: 20 },
      { x: 0 + 2, y: 10 },
      { x: 0 + 10, y: 2 },
      { x: 0 + 20, y: 0 },
      { x: (width - circleWidth) / 2 - 20, y: 0 },

      { x: (width - circleWidth) / 2 - 20, y: 0 }, // border center left
      { x: (width - circleWidth) / 2 - 10, y: 2 },
      { x: (width - circleWidth) / 2 - 2, y: 10 },
      { x: (width - circleWidth) / 2, y: 17 },

      { x: width / 2 - circleWidth / 2 + 8, y: height / 2 + 2 },
      { x: width / 2 - 10, y: height / 2 + 10 },
      { x: width / 2, y: height / 2 + 10 },
      { x: width / 2 + 10, y: height / 2 + 10 },
      { x: width / 2 + circleWidth / 2 - 8, y: height / 2 + 2 },

      { x: (width - circleWidth) / 2 + circleWidth, y: 17 }, // border center right
      { x: (width - circleWidth) / 2 + circleWidth + 2, y: 10 },
      { x: (width - circleWidth) / 2 + circleWidth + 10, y: 2 },
      { x: (width - circleWidth) / 2 + circleWidth + 20, y: 0 },

    ]);

  if (borderTopLeftRight) {
    return pathBorderTopLeftRight;
  }

  return path;
};


export const getPathUp = (width: number, height: number, circleWidth: number = 50, borderTopLeftRight: boolean = false) => {
  const line = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
      { x: width / 2 - circleWidth, y: 30 },
      { x: 0, y: 30 },
      { x: 0, y: height },
      { x: width, y: height },
      { x: width, y: 30 },
      { x: width / 2 + circleWidth, y: 30 },
    ]);

  const curved = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
      { x: width / 2 - (circleWidth + 20), y: 30 },
      { x: width / 2 - circleWidth / 1.3, y: 30 },
      { x: width / 2 - circleWidth / 2, y: 10 },
      { x: width / 2, y: 0 },
      { x: width / 2 + circleWidth / 2, y: 10 },
      { x: width / 2 + circleWidth / 1.3, y: 30 },
      { x: width / 2 + circleWidth + 20, y: 30 },
    ]);

  const pathBorderTopLeftRight = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([

      // right
      { x: width / 2 + circleWidth + 20, y: 30 },
      { x: width - 20, y: 30 },
      { x: width - 10, y: 32 },
      { x: width - 2, y: 40 },
      { x: width, y: 50 },
      { x: width, y: height },
      { x: width, y: height },
      // bottom 
      { x: width, y: height },
      { x: 0, y: height },
      // left
      { x: 0, y: height },
      { x: 0, y: height },
      { x: 0, y: 50 },
      { x: 0 + 2, y: 40 },
      { x: 0 + 10, y: 32 },
      { x: 0 + 20, y: 30 },
      { x: (width - circleWidth) / 2 - 20, y: 30 },

      { x: width / 2 - (circleWidth + 20), y: 30 },
      { x: width / 2 - circleWidth / 1.3, y: 30 },
      { x: width / 2 - circleWidth / 2, y: 10 },
      { x: width / 2, y: 0 },
      { x: width / 2 + circleWidth / 2, y: 10 },
      { x: width / 2 + circleWidth / 1.3, y: 30 },
      { x: width / 2 + circleWidth + 20, y: 30 },
    ]);

  const path = `${line} ${curved}`

  if (borderTopLeftRight) {
    return pathBorderTopLeftRight
  }

  return path
};
