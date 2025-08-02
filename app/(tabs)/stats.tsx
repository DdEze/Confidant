import { useEntries } from '@/context/EntriesContext';
import { format, parseISO, startOfWeek } from 'date-fns';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

export default function StatsScreen() {
  const { entries } = useEntries();

  const weeklyData = () => {
    const grouped: Record<string, number> = {};

    entries.forEach((entry) => {
      const date = parseISO(entry.date);
      const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // lunes
      const label = format(weekStart, 'dd/MM');
      grouped[label] = (grouped[label] || 0) + 1;
    });

    const labels = Object.keys(grouped);
    const data = labels.map((label) => grouped[label]);

    return { labels, data };
  };

  const weeklyStats = weeklyData();

  const emojiMap: Record<string, number> = {};
  entries.forEach((entry) => {
    if (entry.emoji) {
      emojiMap[entry.emoji] = (emojiMap[entry.emoji] || 0) + 1;
    }
  });

  const sorted = Object.entries(emojiMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const emojiData = sorted.map(([emoji, count], index) => ({
    name: emoji,
    emoji,
    population: count,
    color: `hsl(${index * 72}, 70%, 50%)`,
    legendFontColor: '#333',
    legendFontSize: 14,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Entradas esta semana</Text>
        <BarChart
          data={{
            labels: weeklyStats.labels,
            datasets: [{ data: weeklyStats.data }],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Emojis más usados</Text>
        <PieChart
          data={emojiData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
          style={{ marginVertical: 8 }}
        />
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: '#f8edf7ff',
  backgroundGradientFrom: '#f8edf7ff',
  backgroundGradientTo: '#f8edf7ff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    strokeDasharray: '',
  },
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#a389a0ff',
    alignItems: 'center',
  },
  chartCard: {
    width: '100%',
    backgroundColor: '#f8edf7ff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
    fontStyle: 'italic',
  },
  chartStyle: {
    borderRadius: 16,
  },
});