import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { MenuWithDotsIcon } from 'app/assets/icon';
import { RightMenu } from 'app/screens/Notes/components/HeaderRightComponent/components/RightMenu/RightMenu';
import {
  StyledHeaderRightComponentWrapper,
  StyledMenuIcon,
} from 'app/screens/Notes/components/HeaderRightComponent/HeaderRightComponent.styled';

const Icon = () => <MenuWithDotsIcon testID={'MenuWithDotsIconTestID'} />;
export const HeaderRightComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isShowAnimation = useSharedValue(false);
  useEffect(() => {
    if (isVisible) {
      isShowAnimation.value = true;
    } else {
      isShowAnimation.value = false;
    }
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps
  const onPress = () => {
    setIsVisible(!isVisible);
  };
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isShowAnimation.value ? 0.3 : 1, { duration: 200 }),
    };
  });
  return (
    <StyledHeaderRightComponentWrapper>
      <StyledMenuIcon onPress={onPress}>
        <Animated.View style={animatedButtonStyle}>
          <Icon />
        </Animated.View>
      </StyledMenuIcon>
      <RightMenu isShowAnimation={isShowAnimation} />
    </StyledHeaderRightComponentWrapper>
  );
};
