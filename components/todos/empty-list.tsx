import React from "react";
import { Text, View } from "react-native";

export const EmptyTodoList = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <View className="py-10 items-center">
      <Text className="text-gray-500 text-lg">{title}</Text>
      <Text className="text-gray-400 mt-2">{description}</Text>
    </View>
  );
};
