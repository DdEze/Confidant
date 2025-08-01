import { useEntries } from '@/context/EntriesContext';
import { format, parseISO, startOfWeek } from 'date-fns';
import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
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
    <ScrollView>
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          Entradas esta semana
        </Text>
        <BarChart
          data={{
            labels: weeklyStats.labels,
            datasets: [{ data: weeklyStats.data }],
          }}
          width={Dimensions.get('window').width - 30}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForBackgroundLines: {
              strokeDasharray: '',
            },
          }}
          style={{
            borderRadius: 8,
            marginVertical: 8,
          }}
        />
      </View>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          Emojis más usados
        </Text>
        <PieChart
          data={emojiData}
          width={Dimensions.get('window').width - 30}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
        />
      </View>
    </ScrollView>
  );
}