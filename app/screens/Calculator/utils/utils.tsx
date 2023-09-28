import { colors, MainColorName } from 'app/constants/color';
import { RenderPropsI } from 'app/screens/Calculator/Calculator';

export const getBackgroundColor = ({ item, index }: RenderPropsI) => {
  let backgroundColor = colors[MainColorName.GRAY_BLUE];
  switch (true) {
    case index === 3 || item === '=': {
      return (backgroundColor = colors[MainColorName.ORANGE]);
    }
    case isFinite(+item) || item === ',': {
      return (backgroundColor = colors[MainColorName.GREY]);
    }
  }
  return backgroundColor;
};
