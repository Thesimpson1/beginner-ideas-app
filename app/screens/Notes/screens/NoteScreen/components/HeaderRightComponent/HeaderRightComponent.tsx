import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { MenuWithDotsIcon } from 'app/assets/icon';
import { RightMenu } from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/RightMenu';
import {
  StyledHeaderRightComponentWrapper,
  StyledMenuIcon,
  StyledShadowModalWrapper,
} from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/HeaderRightComponent.styled';

const Icon = () => <MenuWithDotsIcon testID={'MenuWithDotsIconTestID'} />;
export interface HeaderRightComponentPropsI {
  isCloseRightMenu: boolean;
  setIsCloseRightMenu: Dispatch<SetStateAction<boolean>>;
}
export const HeaderRightComponent = ({
  isCloseRightMenu,
  setIsCloseRightMenu,
}: HeaderRightComponentPropsI) => {
  const [isVisible, setIsVisible] = useState(false);
  const isShowAnimation = useSharedValue(false);

  useEffect(() => {
    if (isVisible && !isCloseRightMenu) {
      isShowAnimation.value = true;
    } else {
      isShowAnimation.value = false;
    }
  }, [isVisible, isCloseRightMenu]); // eslint-disable-line react-hooks/exhaustive-deps
  const onPress = () => {
    setIsVisible(!isVisible);
    setIsCloseRightMenu(false);
  };
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isShowAnimation.value ? 0.3 : 1, { duration: 200 }),
    };
  });

  return (
    <StyledHeaderRightComponentWrapper
      testID={'StyledHeaderRightComponentWrapperTestID'}
    >
      <StyledMenuIcon onPress={onPress} testID={'StyledMenuIconTestID'}>
        <Animated.View style={animatedButtonStyle} testID={'AnimatedTestID'}>
          <Icon />
        </Animated.View>
      </StyledMenuIcon>
      <RightMenu isShowAnimation={isShowAnimation} />
      <StyledShadowModalWrapper
        onPress={() => setIsVisible(false)}
        isVisible={isVisible}
        testID={'StyledShadowModalWrapperTestID'}
      />
    </StyledHeaderRightComponentWrapper>
  );
};
