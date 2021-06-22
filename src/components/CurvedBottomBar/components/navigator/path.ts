import * as shape from 'd3-shape';

export const getPath = (width: number, height: number, centerWidth: number, borderTopLeftRight: boolean = false) => {
  const circleWidth = centerWidth + 16;
  const left = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
    { x: 0, y: 0 },
    // { x: width, y: 0 },
  ]);

  const borderTopLeft = borderTopLeftRight ? [
    { x: 0 - 10, y: 0 }, // end left
    { x: 0 - 10, y: height },
    { x: 0, y: height },

    { x: 0, y: 20 }, // border left
    { x: 0 + 2, y: 10},
    { x: 0 + 10, y: 2},
    { x: 0 + 20, y: 0 },
  ] : [];

  const borderTopRigth = borderTopLeftRight ? [
    { x: width - 20, y: 0 }, //border right
    { x: width - 10, y: 2 },
    { x: width - 2, y: 10 },
    { x: width, y: 20 },
    { x: width, y: 0 },

    { x: width, y: height }, // end left
    { x: width + 10, y: height },
    { x: width + 10, y: 0 },
  ]: [];

  const tab = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
    ...borderTopLeft,

    { x: (width - circleWidth) / 2 - 20, y: 0 }, // border center left
    { x: (width - circleWidth) / 2 - 10, y: 2 },
    { x: (width - circleWidth) / 2 - 2, y: 10 },
    { x: (width - circleWidth) / 2, y: 17 },

    {x: width / 2 - circleWidth / 2 + 8 , y: height / 2 + 2},
    {x: width / 2 - 10, y: height / 2 + 10},
    {x: width / 2, y: height / 2 + 10},
    {x: width / 2 + 10, y: height / 2 + 10},
    {x: width / 2 + circleWidth / 2 - 8, y: height / 2 + 2},

    { x: (width - circleWidth) / 2 + circleWidth, y: 17 }, // border center right
    { x: (width - circleWidth) / 2 + circleWidth + 2, y: 10 },
    { x: (width - circleWidth) / 2 + circleWidth + 10, y: 2 },
    { x: (width - circleWidth) / 2 + circleWidth + 20, y: 0 },
    
     ...borderTopRigth
  ]);

  const right = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
    { x: width + circleWidth, y: 0 },
    { x: width * 2, y: 0 },
    { x: width * 2, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
  ]);
  return `${left} ${tab} ${right}`;
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

  const curve = shape
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

  const borderLeft = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
      { x: 0, y: circleWidth - 5 },
      { x: 5, y: 35 },
      { x: 20, y: 30 },
    ]);

  const borderRight = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
      { x: width, y: circleWidth - 5 },
      { x: width - 5, y: 35 },
      { x: width - 20, y: 30 },
    ]);


  const lineWidth = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
      { x: width - 20, y: 30 },
      { x: 20, y: 30 },
    ]);

  const lineContent = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
      { x: 0, y: circleWidth - 5 },
      { x: 0, y: height },
      {x:width, y: height},
      { x: width, y: circleWidth - 5 },
      { x: width - 20, y: 30 },
      { x: 20, y: 30 },
    ]);

  if (!borderTopLeftRight) {
    return `${line} ${curve}`;
  } else {
    return `${lineContent} ${borderRight} ${lineWidth} ${borderLeft} ${curve}`;
  }
};
