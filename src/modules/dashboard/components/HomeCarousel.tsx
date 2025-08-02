import colors from '@/constants/colors';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';

interface HomeCarouselProps {
  images: string[];
}

const HomeCarousel = ({ images }: HomeCarouselProps) => {
  return (
    <View style={styles.carouselContainer}>
      <Swiper
        style={styles.swiper}
        showsPagination={true}
        paginationStyle={styles.pagination}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        autoplay={true}
        autoplayTimeout={3}
        loop={true}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: image }} style={styles.carouselImage} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default HomeCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    height: 180,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  swiper: {
    height: 180,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  pagination: {
    bottom: 8,
  },
  dot: {
    backgroundColor: colors.neutral2,
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 4,
    marginRight: 4,
  },
  activeDot: {
    backgroundColor: colors.white,
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 4,
    marginRight: 4,
  },
});
