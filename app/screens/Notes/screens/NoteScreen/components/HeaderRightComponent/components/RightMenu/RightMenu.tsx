import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { setDataSortMode, setSortMode } from 'app/redux/notes/slice';

import {
  ChooseIcon,
  NotesCalendarIcon,
  SortVerticalIcon,
} from 'app/assets/icon';
import { calcHeight, calcWidth } from 'app/utils/scaling-system';
import { MenuItem } from 'app/components/MenuItem/MenuItem';
import { useGetItemData } from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/hooks/useGetItemData';
import {
  StyledRightMenuDropdownWrapper,
  StyledRightMenuWrapper,
} from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/RightMenu.styled';
import {
  getItemInfo,
  setAnimationOpacity,
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
const MENU_HEIGHT = calcHeight(50) * 3;
const MENU_WIDTH = calcWidth(200);
export function RightMenu({ isShowAnimation }: RightMenuPropsI) {
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
      setDropdownTop(30 + indexOfItem * 50);
    } else {
      isShowDropdown.value = false;
      setDropdownTop((prevState) => prevState);
    }
  }, [indexOfItem]); // eslint-disable-line react-hooks/exhaustive-deps
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
      opacity: withTiming(
        setAnimationOpacity({
          isShowAnimation: isShowAnimation.value,
          isShowDropdown: isShowDropdown.value,
        }),
        { duration: 200 }
      ),
      transform: [
        {
          scale: withTiming(isShowDropdown.value ? 0.95 : 1, {
            duration: 200,
          }),
        },
      ],
    };
  });

  const dropdownAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isShowDropdown.value ? MENU_HEIGHT : 0, {
        duration: 500,
      }),
      opacity: withTiming(isShowDropdown.value ? 1 : 0, { duration: 500 }),
    };
  });
  const renderItem = ({ item, index }: RenderItemProps) => {
    const { title, Icon, type } = item;

    const menuOnPress = () => {
      if (indexOfItem === -1 && index !== 0) {
        setIndexOfItem(index);
      } else {
        setIndexOfItem(-1);
      }
    };
    const changeMode = () => {
      setIndexOfItem(-1);
      if (index !== 0) {
        if (type === MenuDataTypes.DATE_SORT_ITEM_DATA) {
          if (title === 'Off') {
            dispatch(setSortMode('By names'));
          }
          if (title === 'On') {
            dispatch(setSortMode('By creating date'));
          }
          dispatch(setDataSortMode(title));
        } else {
          if (title === 'By names') {
            dispatch(setDataSortMode('Off'));
          }
          if (title === 'By creating date') {
            dispatch(setDataSortMode('On'));
          }
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
      >
        <FlatList
          data={itemData}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </StyledRightMenuDropdownWrapper>
    </>
  );
}
