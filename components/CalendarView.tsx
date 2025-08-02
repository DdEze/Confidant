import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

type Props = {
  onDateSelect: (date: string) => void;
  selectedDate: string;
  markedDates?: { [date: string]: any };
};

export default function CalendarView({ onDateSelect, selectedDate, markedDates = {} }: Props) {
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => onDateSelect(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#e4a3dcff',
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