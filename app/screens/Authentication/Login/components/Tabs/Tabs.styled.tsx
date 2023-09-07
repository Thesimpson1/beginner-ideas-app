import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { calcWidth } from 'app/utils/scaling-system';
import { colors } from 'app/constants/color';

export const StyledTabsContainer = styled.View`
  margin: 0 ${calcWidth(70)}px 5px;
`;
export const StyledFlatListContainer = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})`` as typeof FlatList;
export const StyledButtonWrapper = styled.View<{
  isCurrentIndex?: boolean;
}>`
  border-bottom-width: ${({ isCurrentIndex }) => (isCurrentIndex ? 2 : 0)}px;
  border-color: ${colors.WHITE};
`;
