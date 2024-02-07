import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';

import {
  ChooseIcon,
  NotesCalendarIcon,
  SortVerticalIcon,
} from 'app/assets/icon';
import { MenuItem } from 'app/components/MenuItem/MenuItem';
import { useGetAnimationStyles } from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/hooks/useGetAnimationStyles';
import { useGetItemData } from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/hooks/useGetItemData';
import {
  StyledRightMenuDropdownWrapper,
  StyledRightMenuWrapper,
} from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/RightMenu.styled';
import {
  changeMode,
  getItemInfo,
} from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/utils/utils';
import { MenuDataTypes } from 'app/screens/Notes/types';

interface RightMenuPropsI {
  isShowAnimation: SharedValue<boolean>;
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

export function RightMenu({ isShowAnimation }: RightMenuPropsI) {
  const [indexOfItem, setIndexOfItem] = useState(-1);
  const [dropdownTop, setDropdownTop] = useState(-1);
  const isShowDropdown = useSharedValue(false);
  const sortMode = useAppSelector((state) => state.notes.sortMode);
  const dateSortMode = useAppSelector((state) => state.notes.dataSortMode);
  const { itemData } = useGetItemData({ index: indexOfItem });
  const dispatch = useAppDispatch();
  const { rightMenuWrapperAnimatedStyle, dropdownAnimatedStyle } =
    useGetAnimationStyles({
      isShowAnimation,
      isShowDropdown,
    });

  useEffect(() => {
    if (indexOfItem !== -1) {
      isShowDropdown.value = true;
      setDropdownTop(30 + indexOfItem * 50);
    } else {
      isShowDropdown.value = false;
      setDropdownTop((prevState) => prevState);
    }
  }, [indexOfItem]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderItem = ({ item, index }: RenderItemProps) => {
    const { title, Icon, type } = item;

    const menuOnPress = () => {
      if (indexOfItem === -1 && index !== 0) {
        setIndexOfItem(index);
      } else {
        setIndexOfItem(-1);
      }
    };

    const { action, leftIcon } = getItemInfo({
      index,
      type,
      mode:
        type === MenuDataTypes.DATE_SORT_ITEM_DATA ? dateSortMode : sortMode,
      title,
      menuOnPress,
      changeMode: () =>
        changeMode({
          index,
          type,
          title,
          dispatch,
          setIndexOfItem,
        }),
    });

    return (
      <MenuItem
        index={index}
        title={title}
        LeftIcon={leftIcon}
        RightIcon={Icon}
        onPress={action}
        key={title}
      />
    );
  };

  return (
    <>
      <StyledRightMenuWrapper
        style={rightMenuWrapperAnimatedStyle}
        top={40}
        right={10}
        testID={'StyledRightMenuWrapperTestID'}
      >
        <FlatList
          data={MENU_DATA}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </StyledRightMenuWrapper>
      <StyledRightMenuDropdownWrapper
        top={dropdownTop}
        right={7}
        style={dropdownAnimatedStyle}
        testID={'StyledRightMenuDropdownWrapperTestID'}
      >
        <FlatList
          data={itemData}
          renderItem={renderItem}
          scrollEnabled={false}
          testID={'FlatMenuDropdownWrapperTestID'}
        />
      </StyledRightMenuDropdownWrapper>
    </>
  );
}
