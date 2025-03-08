import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface LoadingIndicatorProps {
  fullScreen?: boolean;
  title: string;
}

export const LoadingIndicator = ({
  fullScreen = true,
  title,
}: LoadingIndicatorProps) => {
  if (!fullScreen) {
    return <ActivityIndicator size="small" color="#3b82f6" className="my-4" />;
  }

  return (
    <View className="py-10 items-center">
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text className="mt-4 text-gray-500">{title}</Text>
    </View>
  );
};
