import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Animated, { FadeIn } from 'react-native-reanimated';
import tw from 'twrnc';

type PieChartData = {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
};

type PieChartComponentProps = {
  data: PieChartData[];
  title?: string;
};

const screenWidth = Dimensions.get('window').width;

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, title }) => {
  return (
    <Animated.View entering={FadeIn} style={tw`p-4 w-full`}>
      {title && <Text style={tw`text-lg font-bold text-center mb-2`}>{title}</Text>}
      <PieChart
        data={data}
        width={screenWidth / 2} // Smaller size for embedding in a screen
        height={160}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#f5f7ff',
          backgroundGradientTo: '#efefef',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="10"
        absolute
      />
    </Animated.View>
  );
};

export default PieChartComponent;
