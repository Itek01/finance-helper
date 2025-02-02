import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import InterestGraphComponent from '../components/InterestGraphComponent';
import { PieChart } from 'react-native-chart-kit';
import PieChartComponent from '../components/PieChart';

const FinancialAdviceScreen = ({ route }: any) => {
  const { advice } = route.params;
  
  const transformedData = Object.values(advice.stock).map((stock: any) => ({
    name: stock.name,
    population: parseFloat(stock.amount),  // Convert "25%" to a number
  }));

  return (
    <ScrollView style={tw`flex-1 bg-gray-100 p-4`}>
      <View style={tw`bg-white rounded-xl shadow-md p-6`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>
          Your Personalized Financial Advice
        </Text>

        {/* Stocks */}
        <Text style={tw`text-xl font-semibold text-gray-700 mt-4`}>Stocks:</Text>
        {advice.stock &&
          Object.values(advice.stock).map((stock: any, index: number) => (
            <View
              key={index}
              style={tw`bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200 mt-3`}
            >
              <Text style={tw`text-lg font-bold`}>Stock: {stock.name}</Text>
              <Text style={tw`text-sm text-gray-700 mt-1`}>
                <Text style={tw`font-semibold`}>Reason:</Text> {stock.reason}
              </Text>
              <Text style={tw`text-sm text-gray-700 mt-1`}>
                <Text style={tw`font-semibold`}>Investment Amount:</Text> {stock.amount}%
              </Text>
            </View>
          ))}
        {/* Investment Strategies */}
        <PieChartComponent data={transformedData} title="Investment Breakdown" />
        <Text style={tw`text-xl font-semibold text-gray-700 mt-6`}>Investment Strategies:</Text>
        {advice.investmentStrategies &&
          advice.investmentStrategies.map((strategy: any, index: number) => (
            <View
              key={index}
              style={tw`bg-green-50 p-4 rounded-lg shadow-sm border border-green-200 mt-3`}
            >
              <Text style={tw`font-bold text-green-800`}>{strategy.strategy}</Text>
              <Text style={tw`mt-1`}>
                <Text style={tw`font-semibold`}>Description:</Text> {strategy.description}
              </Text>
              <Text>
                <Text style={tw`font-semibold`}>Strategy :</Text> {strategy.strategy}
              </Text>
              <Text>
                <Text style={tw`font-semibold`}>Expected Return:</Text> {1 + (1 / strategy.expectedReturn) + `%`}
              </Text>
            </View>
          ))}

        {/* General Advice */}
        <Text style={tw`text-xl font-semibold text-gray-700 mt-6`}>Advice:</Text>
            <View style={tw`bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200 mt-2`}>
                <Text style={tw`text-gray-700 mt-2 ml-3`}>{advice.advice ? advice.advice : ""}</Text>
            </View>

      </View>
    </ScrollView>
  );
};

export default FinancialAdviceScreen;
