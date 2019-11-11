import { DEFAULT_GRID_SIZE, PAGE_WIDTH, PAGE_HEIGHT, COMPONENT_DEFAULT_WIDTH, COMPONENT_DEFAULT_HEIGHT } from '@/constant';

export const processCoordinate = (param: any) => {
  let {x, y}: any = param;

  if (x < 0) {
    x = 0;
  } else if (x > PAGE_WIDTH - COMPONENT_DEFAULT_WIDTH) {
    x = PAGE_WIDTH - COMPONENT_DEFAULT_WIDTH;
  }

  if (y < 0) {
    y = 0;
  } else if (y > PAGE_HEIGHT - COMPONENT_DEFAULT_HEIGHT) {
    y = PAGE_HEIGHT - COMPONENT_DEFAULT_HEIGHT;
  }

  const surplus = {
    x: !x ? x : x % DEFAULT_GRID_SIZE,
    y: !y ? y : y % DEFAULT_GRID_SIZE,
  };

  return {
    x: roundCoordinate(x, surplus.x),
    y: roundCoordinate(y, surplus.y),
  };
};

const roundCoordinate = (value: any, surplus: any) => {
  const threshold = DEFAULT_GRID_SIZE / 2;
  if (surplus) {
    if (surplus < threshold) {
      return value - surplus;
    }
    return value + (DEFAULT_GRID_SIZE - surplus);
  }
  return value;
};
