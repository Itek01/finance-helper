import React, { useEffect } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import tw from 'twrnc';

const screenWidth = Dimensions.get('window').width;

// Repeating color palette (excluding the last color)
const colorPalette = [ '#0a9396', '#94d2bd', '#005f73', '#33596b'];

type PieChartData = {
  name: string;
  population: number;
};

type PieChartComponentProps = {
  data: PieChartData[];
  title?: string;
};

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, title }) => {
  const rotation = useSharedValue(0);  // Rotate from 0 to 360 degrees
  const slideAnimations = data.map(() => useSharedValue(300));  // Each item starts off-screen to the right

  useEffect(() => {
    // Animate pie chart rotation
    rotation.value = withTiming(360, {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });

    // Sequentially animate legend items using setTimeout
    data.forEach((_, index) => {
      setTimeout(() => {
        slideAnimations[index].value = withTiming(0, {
          duration: 500,
          easing: Easing.out(Easing.exp),
        });
      }, index * 300);  // Delay each item's animation by 300ms
    });
  }, []);

  // Assign colors, ensuring the last one is always #e9d8a6
  const chartDataWithColors = data.map((item, index) => ({
    ...item,
    color: index === data.length - 1 ? '#e9d8a6' : colorPalette[index % colorPalette.length],
    legendFontColor: '#000',  // Use black for legend text
    legendFontSize: 12,
  }));

  // Animated style for rotating the pie chart
  const animatedPieStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={tw`mt-10`}>
      <Text style={tw`text-2xl font-bold mb-4`}>{title || 'Investment Dashboard'}</Text>
      <View style={tw`flex-row items-center justify-center`}>
        {/* Rotating pie chart */}
        <Animated.View style={[animatedPieStyle, tw``]}>
          <PieChart
            data={chartDataWithColors}
            width={screenWidth / 2}
            height={180}
            yAxisLabel="false"
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            hasLegend={false}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="45"
            absolute
          />
        </Animated.View>

        {/* Animated legend section */}
        <View>
          {data.map((item, index) => {
            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{ translateX: slideAnimations[index].value }],
              opacity: withTiming(slideAnimations[index].value === 0 ? 1 : 0, { duration: 500 }),
            }));

            return (
              <Animated.View key={index} style={[animatedStyle, tw`flex-row items-center mb-2`]}>
                <View style={[tw`w-3 h-3 rounded-full mr-2`, { backgroundColor: chartDataWithColors[index].color }]} />
                <Text style={tw`text-sm font-medium`} numberOfLines={1}>
                  {item.name}: {item.population}%
                </Text>
              </Animated.View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default PieChartComponent;
