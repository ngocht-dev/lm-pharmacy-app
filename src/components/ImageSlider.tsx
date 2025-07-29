import colors from '@/constants/colors';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import AppText from './AppText';
import GalleryViewer from './GalleryViewer';

const ImageSlider = ({
  images,
  containerStyle,
  imageStyle,
}: {
  images: Array<string>;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
}) => {
  const [position, setPosition] = useState(0);
  const [componentWidth, setComponentWidth] = useState(0);
  const [showIndex, setShowIndex] = useState<number | undefined>(undefined);
  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setComponentWidth(width);
  };

  const renderImage = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <TouchableOpacity
        onPress={() => {
          setShowIndex(index);
        }}
        activeOpacity={0.8}
      >
        <Image
          key={index}
          source={{ uri: item }}
          style={[
            styles.image,
            imageStyle ? imageStyle : {},
            { width: componentWidth },
          ]}
        />
      </TouchableOpacity>
    ),
    [componentWidth, imageStyle]
  );

  const handleOnMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const newPosition = Math.min(
        Math.floor(
          (event.nativeEvent.contentOffset.x + componentWidth / 2) /
            componentWidth
        ),
        images.length
      );
      if (newPosition !== position) {
        setPosition(newPosition);
      }
    },
    [componentWidth, images.length, position]
  );

  return (
    <View onLayout={onLayout} style={[containerStyle ? containerStyle : {}]}>
      <FlatList
        data={images}
        scrollEventThrottle={16}
        pagingEnabled={true}
        horizontal={true}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderImage}
        contentContainerStyle={containerStyle}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleOnMomentumScrollEnd}
      />
      <View style={[styles.navigation]}>
        <AppText size={14} color={colors.neutral0}>
          {`${position + 1}/${images.length}`}
        </AppText>
      </View>

      <GalleryViewer
        show={showIndex !== undefined}
        defaultIndex={showIndex}
        images={images}
        onClose={() => setShowIndex(undefined)}
      />
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  navigation: {
    position: 'absolute',
    bottom: 30,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
