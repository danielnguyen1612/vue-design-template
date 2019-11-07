import { DEFAULT_GRID_SIZE } from '@/constant';

export const processCoordinate = (param: any) => {
  const surplus = param % DEFAULT_GRID_SIZE;
  const threshold = DEFAULT_GRID_SIZE / 2;
  if (surplus) {
      if (surplus < threshold) {
          return param - surplus;
      }
      return param + (DEFAULT_GRID_SIZE - surplus);
  }
  return param;
};
