type DirectionProps = {
  x: number;
  y: number;
};

export const directions = {
  N: ({ x, y }: DirectionProps) => ({ x, y: y - 1 }),
  S: ({ x, y }: DirectionProps) => ({ x, y: y + 1 }),

  W: ({ x, y }: DirectionProps) => ({ x: x - 1, y }),
  E: ({ x, y }: DirectionProps) => ({ x: x + 1, y }),

  NE: ({ x, y }: DirectionProps) => ({ x: x + 1, y: y - 1 }),
  SW: ({ x, y }: DirectionProps) => ({ x: x - 1, y: y + 1 }),

  SE: ({ x, y }: DirectionProps) => ({ x: x + 1, y: y + 1 }),
  NW: ({ x, y }: DirectionProps) => ({ x: x - 1, y: y - 1 }),
};
