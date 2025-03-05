import React from "react";
import { Text, View } from "react-native";
import { SignInContinueItem } from "../ui";

export function SignInFooter() {
  return (
    <View className="mt-8">
      <View className="flex-row items-center mb-4">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500">or continue with</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <SignInContinueItem items={["G", "f", "In"]} />
    </View>
  );
}
