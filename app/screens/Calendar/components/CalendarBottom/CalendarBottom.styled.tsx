import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { calcHeight, calcWidth, width } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledCalendarBottomContainer = styled.View`
  height: ${calcHeight(55)}px;
  flex-direction: row;
  position: absolute;
  background-color: ${colors[MainColorName.BLUE]};
  bottom: 0;
  width: ${width}px;
  opacity: 0.9;
  padding: ${calcWidth(10)}px ${calcWidth(10)}px;
  justify-content: space-between;
`;
export const StyledFlatListContainer = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})`` as typeof FlatList;
