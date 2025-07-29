import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import Icons from '@/assets/icons';

const ScreenWidth = Dimensions.get('screen').width;
type Props = {
  images?: string[];
  show?: boolean;
  defaultIndex?: number;
  onClose?: () => void;
};

const GalleryViewer = ({ images, show, defaultIndex, onClose }: Props) => {
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList>(null);
  useEffect(() => {
    if (show && (defaultIndex || defaultIndex === 0)) {
      setTimeout(() => {
        listRef.current?.scrollToOffset({
          animated: true,
          offset: ScreenWidth * defaultIndex,
        });
      }, 100);
    }
  }, [defaultIndex, show]);
  return (
    <Modal
      visible={Boolean(show)}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <TouchableOpacity onPress={onClose}>
          <Icons.CloseWhite style={styles.iconClose} width={50} height={50} />
        </TouchableOpacity>
        <FlatList
          ref={listRef}
          data={images}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => String(index)}
          horizontal
          pagingEnabled
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: ScreenWidth,
                height: '100%',
              }}
              contentFit="contain"
            />
          )}
        />
        <View style={styles.iconClose} />
      </View>
    </Modal>
  );
};

export default GalleryViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000080',
  },
  iconClose: {
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
  },
});
