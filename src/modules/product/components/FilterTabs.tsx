import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface FilterTabsProps {
  selectedTab: string;
  onTabPress: (tab: string) => void;
}

const FilterTabs = ({ selectedTab, onTabPress }: FilterTabsProps) => {
  const tabs = [
    { key: 'popular', label: 'Phổ biến', icon: 'heart' },
    { key: 'bestselling', label: 'Bán chạy', icon: 'hand-left' },
    { key: 'price', label: 'Giá', icon: 'swap-vertical' },
  ];

  return (
    <View style={styles.filterTabs}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, selectedTab === tab.key && styles.activeTab]}
          onPress={() => onTabPress(tab.key)}
        >
          <Ionicons
            name={tab.icon as any}
            size={16}
            color={selectedTab === tab.key ? colors.error : colors.neutral3}
          />
          <AppText
            size={12}
            color={selectedTab === tab.key ? colors.error : colors.neutral3}
            style={styles.tabText}
          >
            {tab.label}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  filterTabs: {
    flexDirection: 'row',
    // paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral0,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 16,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: colors.mainSub1,
  },
  tabText: {
    marginLeft: 4,
    fontWeight: '500',
  },
});
