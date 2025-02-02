import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Path, Circle, Line, G, Text as TextSVG} from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';
import * as d3 from 'd3-shape';
import tw from 'twrnc';

const { width } = Dimensions.get('window');
const GRAPH_WIDTH = width * 0.9;
const GRAPH_HEIGHT = 200;
const AXIS_PADDING = 20;

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface InterestGraphProps {
  principal: number;
  rate: number;
  years: number;
  title?: string;
}

const InterestGraphComponent: React.FC<InterestGraphProps> = ({ principal, rate, years, title }) => {
  const progress = useSharedValue(0);

  // Generate data points for compound interest growth
  const data = Array.from({ length: years + 1 }, (_, year) => ({
    year,
    value: principal * Math.pow(1 + rate / 1, year),
  }));

  const maxYValue = Math.max(...data.map((point) => point.value));

  useEffect(() => {
    // Animate the drawing of the graph
    progress.value = withTiming(1, {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  // D3 line generator for the graph path
  const lineGenerator = d3
    .line<{ year: number; value: number }>()
    .x((d) => (d.year / years) * GRAPH_WIDTH)
    .y((d) => GRAPH_HEIGHT - (d.value / maxYValue) * GRAPH_HEIGHT)
    .curve(d3.curveMonotoneX);  // Smooth curve for the line

  // D3 area generator for the filled area
  const areaGenerator = d3
    .area<{ year: number; value: number }>()
    .x((d) => (d.year / years) * GRAPH_WIDTH)
    .y0(GRAPH_HEIGHT)  // Start filling from the bottom of the graph
    .y1((d) => GRAPH_HEIGHT - (d.value / maxYValue) * GRAPH_HEIGHT)
    .curve(d3.curveMonotoneX);

  const animatedLineProps = useAnimatedProps(() => ({
    d: lineGenerator(data.slice(0, Math.ceil(progress.value * data.length))) || '',
  }));

  const animatedAreaProps = useAnimatedProps(() => ({
    d: areaGenerator(data.slice(0, Math.ceil(progress.value * data.length))) || '',
  }));

  return (
    <View style={tw`mt-10 items-center`}>
      {title && <Text style={tw`text-2xl font-bold mb-4`}>{title}</Text>}

      <Svg width={GRAPH_WIDTH + AXIS_PADDING * 2} height={GRAPH_HEIGHT + AXIS_PADDING * 2}>
        {/* X and Y axes */}
        <G translateX={AXIS_PADDING} translateY={AXIS_PADDING}>
          {/* Y-axis */}
          <Line x1={0} y1={0} x2={0} y2={GRAPH_HEIGHT} stroke="black" strokeWidth={1} />
          {/* X-axis */}
          <Line x1={0} y1={GRAPH_HEIGHT} x2={GRAPH_WIDTH} y2={GRAPH_HEIGHT} stroke="black" strokeWidth={1} />

          {/* Y-axis label */}
          <TextSVG
            x={-10}
            y={0}
            fill="black"
            fontSize="10"
            textAnchor="middle"
            transform="rotate(-90, -20, 100)"
          >
            Money
          </TextSVG>

          {/* X-axis label */}
          <TextSVG x={GRAPH_WIDTH / 2} y={GRAPH_HEIGHT + 15} fill="black" fontSize="10" textAnchor="middle">
            Time
          </TextSVG>

          {/* Animated area fill */}
          <AnimatedPath
            animatedProps={animatedAreaProps}
            fill="rgba(21, 94, 117, 0.3)"  // Semi-transparent green fill
          />

          {/* Animated line path */}
          <AnimatedPath
            animatedProps={animatedLineProps}
            fill="none"
            stroke="#00838F"
            strokeWidth={10}
          />

          {/* Data points */}
          {data.map((point, index) => (
            <Circle
              key={index}
              cx={(point.year / years) * GRAPH_WIDTH}
              cy={GRAPH_HEIGHT - (point.value / maxYValue) * GRAPH_HEIGHT}
              r={4}
              fill="#00838F"
            />
          ))}
        </G>
      </Svg>

      {/* Animated legend section */}
      <View style={tw`mt-4`}>
        {data.map((point, index) => {
          const slideInValue = useSharedValue(300);  // Slide from off-screen

          useEffect(() => {
            setTimeout(() => {
              slideInValue.value = withTiming(0, {
                duration: 150,
                easing: Easing.out(Easing.exp),
              });
            }, index * 150);  // Delay each item by 300ms
          }, []);

          const animatedStyle = useAnimatedProps(() => ({
            transform: [{ translateX: slideInValue.value }],
            opacity: withTiming(slideInValue.value === 0 ? 1 : 0, { duration: 500 }),
          }));

          return (
            <Animated.View key={index} style={[animatedStyle, tw`flex-row items-center mb-2`]}>
              <Text style={tw`text-sm font-medium`}>
                Year {point.year}: ${point.value.toFixed(2)}
              </Text>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

export default InterestGraphComponent;
