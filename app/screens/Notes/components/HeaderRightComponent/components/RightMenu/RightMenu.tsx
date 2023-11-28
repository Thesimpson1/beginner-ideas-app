import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { setDataSortMode, setSortMode } from 'app/redux/notes/slice';

import {
  ChooseIcon,
  NotesCalendarIcon,
  RightArrowWhiteIcon,
  SortVerticalIcon,
} from 'app/assets/icon';
import { calcHeight, calcWidth } from 'app/utils/scaling-system';
import { MenuItem } from 'app/components/MenuItem/MenuItem';
import { useGetItemData } from 'app/screens/Notes/components/HeaderRightComponent/components/RightMenu/hooks/useGetItemData';
import { StyledRightMenuWrapper } from 'app/screens/Notes/components/HeaderRightComponent/components/RightMenu/RightMenu.styled';
import {
  getItemInfo,
  setIndex,
} from 'app/screens/Notes/components/HeaderRightComponent/components/RightMenu/utils/utils';
import { MenuDataTypes } from 'app/screens/Notes/types';

interface RightMenuPropsI {
  isShowAnimation: SharedValue<boolean>;
  isVisible: boolean;
}
export interface ItemDataItemI {
  title: string;
  Icon?: () => React.JSX.Element;
  type?: MenuDataTypes;
}
interface RenderItemProps {
  index: number;
  item: ItemDataItemI;
}

const MENU_DATA = [
  {
    title: 'Choose note',
    Icon: () => <ChooseIcon testID={'ChooseIconTestID'} />,
    type: MenuDataTypes.MAIN_MENU_DATA,
  },
  {
    title: 'Sort',
    Icon: () => <SortVerticalIcon testID={'SortVerticalIconTestID'} />,
    type: MenuDataTypes.MAIN_MENU_DATA,
  },
  {
    title: 'Date sort',
    Icon: () => <NotesCalendarIcon testID={'NotesCalendarIconTestID'} />,
    type: MenuDataTypes.MAIN_MENU_DATA,
  },
];
const MENU_HEIGHT = calcHeight(50) * 3;
const MENU_WIDTH = calcWidth(200);
export function RightMenu({ isShowAnimation, isVisible }: RightMenuPropsI) {
  const [indexOfItem, setIndexOfItem] = useState(-1);
  const [dropdownTop, setDropdownTop] = useState(-1);
  const isShowDropdown = useSharedValue(false);
  const sortMode = useAppSelector((state) => state.notes.sortMode);
  const dateSortMode = useAppSelector((state) => state.notes.dataSortMode);
  const { itemData } = useGetItemData({ index: indexOfItem });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (indexOfItem !== -1) {
      isShowDropdown.value = true;
      setDropdownTop(indexOfItem * calcHeight(35));
    } else {
      isShowDropdown.value = false;
      setDropdownTop((prevState) => prevState);
    }
  }, [indexOfItem]); // eslint-disable-line react-hooks/exhaustive-deps
  console.log('1111', dropdownTop)
  const rightMenuWrapperAnimatedStyle = useAnimatedStyle(() => {
    if (!isShowAnimation.value) {
      isShowDropdown.value = false;
    }
    return {
      height: withTiming(isShowAnimation.value ? MENU_HEIGHT : 0, {
        duration: 200,
      }),
      width: withTiming(isShowAnimation.value ? MENU_WIDTH : 0, {
        duration: 200,
      }),
      opacity: withTiming(isShowAnimation.value ? 1 : 0, { duration: 200 }),
    };
  });
  const dropdownAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isShowDropdown.value ? MENU_HEIGHT : 0, {
        duration: 1000,
      }),
      opacity: withTiming(isShowDropdown.value ? 1 : 0, { duration: 1000 }),
    };
  });

  const renderItem = ({ item, index }: RenderItemProps) => {
    const { title, Icon, type } = item;
    const menuOnPress = () =>
      setIndexOfItem((prevState) => setIndex({ prevState, index }));
    const changeMode = () => {
      setIndexOfItem(-1);
      if (index !== 0) {
        if (type === MenuDataTypes.DATE_SORT_ITEM_DATA) {
          dispatch(setDataSortMode(title));
        } else {
          dispatch(setSortMode(title));
        }
      }
    };

    const { action, leftIcon } = getItemInfo({
      index,
      type,
      mode:
        type === MenuDataTypes.DATE_SORT_ITEM_DATA ? dateSortMode : sortMode,
      title,
      menuOnPress,
      changeMode,
    });

    return (
      <MenuItem
        index={index}
        title={title}
        LeftIcon={leftIcon}
        RightIcon={Icon}
        onPress={action}
      />
    );
  };

  return (
    <StyledRightMenuWrapper
      style={rightMenuWrapperAnimatedStyle}
      top={40}
      right={10}
    >
      <FlatList
        data={MENU_DATA}
        renderItem={renderItem}
        scrollEnabled={false}
      />
      <StyledRightMenuWrapper
        top={dropdownTop}
        right={10}
        style={dropdownAnimatedStyle}
      >
        <FlatList
          data={itemData}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </StyledRightMenuWrapper>
    </StyledRightMenuWrapper>
  );
}
