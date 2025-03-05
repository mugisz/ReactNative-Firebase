import { AuthHeaderProps } from "@/type";
import React from "react";
import { Text, View } from "react-native";

export const AuthHeader: React.FC<AuthHeaderProps> = ({ isLogin }) => {
  return (
    <View className="mb-10 items-center">
      <Text className="text-3xl font-bold text-gray-800 mb-2">
        {isLogin ? "Welcome Back" : "Create Account"}
      </Text>
      <Text className="text-gray-500 text-center">
        {isLogin
          ? "Sign in to your account to continue"
          : "Register a new account to get started"}
      </Text>
    </View>
  );
};
