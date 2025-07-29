import { View, Modal, StyleSheet, Pressable, Dimensions } from 'react-native';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  SlideOutDown,
  runOnJS,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
const screenHeight = Dimensions.get('screen').height;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  show: boolean;
  onClose?: () => void;
  children: ReactNode;
  disableMaxHeight?: boolean;
  disableSwipeDown?: boolean;
  disableMinHeight?: boolean;
};

const BottomSheet = ({
  show,
  onClose: onCloseCallback = () => {},
  children,
  disableMaxHeight,
  disableSwipeDown,
  disableMinHeight,
}: Props) => {
  const [actualShow, setActualShow] = useState(show);
  useEffect(() => {
    if (show) {
      setActualShow(show);
    }
  }, [show]);
  const onClose = useCallback(() => {
    onCloseCallback();
    setActualShow(false);
  }, [onCloseCallback]);
  return (
    <Modal visible={actualShow} transparent statusBarTranslucent>
      <HOCBottomSheet
        show={show}
        disableMaxHeight={disableMaxHeight}
        onClose={onClose}
        disableSwipeDown={disableSwipeDown}
        disableMinHeight={disableMinHeight}
      >
        {children}
      </HOCBottomSheet>
    </Modal>
  );
};

const HOCBottomSheet = gestureHandlerRootHOC(
  ({
    show,
    children,
    disableMaxHeight,
    onClose: onCloseProp,
    disableSwipeDown,
    disableMinHeight,
  }: any) => {
    const keyboard = useAnimatedKeyboard();
    const [isOpen, setOpen] = useState(true);

    const offset = useSharedValue(screenHeight);

    useEffect(() => {
      if (show) {
        offset.value = withSpring(0, {
          damping: 15,
        });
        setOpen(true);
        return;
      }
      setOpen(false);
    }, [show, offset]);

    const pan = Gesture.Pan()
      .onChange((event) => {
        const offsetDelta = event.changeY + offset.value;

        const clamp = Math.max(0, offsetDelta);
        offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
      })
      .onFinalize(() => {
        if (offset.value < 150) {
          offset.value = withSpring(0);
        } else {
          offset.value = withTiming(screenHeight, {}, () => {
            runOnJS(onCloseProp)();
          });
        }
      });
    const translateY = useAnimatedStyle(
      () => ({
        transform: [
          {
            translateY: offset.value,
          },
        ],
      }),
      []
    );
    const contentPaddingB = useAnimatedStyle(
      () => ({ paddingBottom: keyboard.height.value }),
      []
    );

    const exiting = FadeOut.withCallback((finished) => {
      'worklet';
      if (finished) {
        runOnJS(onCloseProp)();
      }
    });
    return (
      <View style={styles.container}>
        {isOpen && (
          <>
            <AnimatedPressable
              style={styles.backdrop}
              entering={FadeIn}
              exiting={exiting}
              onPress={() => !disableSwipeDown && setOpen(false)}
            />
            <Animated.View
              style={[styles.sheetContainer, translateY]}
              exiting={SlideOutDown}
            >
              {!disableSwipeDown ? (
                <GestureDetector gesture={pan}>
                  <Animated.View style={styles.placeSwipeContainer}>
                    <View style={styles.placeSwipe} />
                  </Animated.View>
                </GestureDetector>
              ) : (
                <View style={styles.h16} />
              )}
              <Animated.View
                style={[
                  styles.contentContainer,
                  contentPaddingB,
                  disableMaxHeight && { maxHeight: undefined },
                  disableMinHeight && { minHeight: undefined },
                ]}
              >
                {children}
              </Animated.View>
            </Animated.View>
          </>
        )}
      </View>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    height: screenHeight,
  },
  sheetContainer: {
    // Padding for white background while user swipe modal to top
    backgroundColor: 'white',
    borderRadius: 24,
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    bottom: -100,
    paddingBottom: 100,
  },
  contentContainer: {
    minHeight: 300,
    maxHeight: screenHeight * 0.8, // Max height bottom sheet
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000080',
    zIndex: 1,
  },
  placeSwipeContainer: { width: '100%', paddingVertical: 12 },
  placeSwipe: {
    width: 50,
    height: 5,
    backgroundColor: '#EBEBF0',
    borderRadius: 5,
    alignSelf: 'center',
  },
  h16: {
    height: 16,
  },
});
export default BottomSheet;
