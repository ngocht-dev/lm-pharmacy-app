import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const FilterButtons = () => {
  const filterButtons = [
    { label: 'Lọc', icon: 'filter', iconType: 'Ionicons' },
    { label: 'Siêu Tốc 1H', icon: 'time', iconType: 'Ionicons' },
    {
      label: 'Freeship',
      icon: 'truck-delivery',
      iconType: 'MaterialCommunityIcons',
    },
    { label: 'Tặng', icon: 'gift', iconType: 'Ionicons' },
  ];

  const renderIcon = (icon: string, iconType: string) => {
    if (iconType === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons
          name={icon as any}
          size={16}
          color={colors.neutral3}
        />
      );
    }
    return <Ionicons name={icon as any} size={16} color={colors.neutral3} />;
  };

  return (
    <View style={styles.filterButtons}>
      {filterButtons.map((button, index) => (
        <TouchableOpacity key={index} style={styles.filterButton}>
          {renderIcon(button.icon, button.iconType)}
          <AppText
            size={12}
            color={colors.neutral3}
            style={styles.filterButtonText}
          >
            {button.label}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterButtons;

const styles = StyleSheet.create({
  filterButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral0,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: colors.neutral0,
  },
  filterButtonText: {
    marginLeft: 4,
  },
});
