import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

type Props = {
  onDateSelect: (date: string) => void;
  selectedDate: string;
};

export default function CalendarView({ onDateSelect, selectedDate }: Props) {
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => onDateSelect(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#00adf5',
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});