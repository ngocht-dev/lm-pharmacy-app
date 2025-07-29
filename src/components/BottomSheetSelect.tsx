import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AppText from './AppText';
import AppTextInput from './AppTextInput';
import AppTouchable from './AppTouchable';
import BottomSheet from './BottomSheet';

export interface Option {
  label: string;
  value: string;
}

interface BottomSheetSelectProps {
  show: boolean;
  onClose: () => void;
  options: Option[];
  value?: string;
  onValueChange: (value: string) => void;
  title?: string;
  searchable?: boolean;
}

const BottomSheetSelect: React.FC<BottomSheetSelectProps> = ({
  show,
  onClose,
  options,
  value,
  onValueChange,
  title = 'Select an option',
  searchable = false,
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      ),
    [options, searchText]
  );

  const handleClose = () => {
    setSearchText('');
    onClose();
  };

  return (
    <BottomSheet show={show} onClose={handleClose}>
      <View style={styles.container}>
        <AppText style={styles.title}>{title}</AppText>
        <View style={styles.spacing} />
        {searchable && (
          <AppTextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search..."
            containerStyle={styles.searchInput}
          />
        )}
        <FlatList
          data={filteredOptions}
          keyExtractor={(item) => item.label + item.value}
          style={searchable && { height: '100%' }}
          renderItem={({ item }) => (
            <AppTouchable
              style={[
                styles.option,
                value === item.value && styles.selectedOption,
              ]}
              onPress={() => {
                onValueChange(item.value);
                handleClose();
              }}
            >
              <AppText
                style={[
                  styles.optionText,
                  value === item.value && styles.selectedOptionText,
                ]}
              >
                {item.label}
              </AppText>
            </AppTouchable>
          )}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  spacing: {
    height: 16,
  },
  searchInput: {
    marginBottom: 16,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedOptionText: {
    color: '#FFF',
  },
});

export default BottomSheetSelect;
