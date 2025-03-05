import { SignInFooter } from "@/components";
import { AuthFooterProps } from "@/type";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const AuthFooter: React.FC<AuthFooterProps> = ({
  isLogin,
  onToggleMode,
}) => {
  return (
    <>
      <View className="flex-row justify-center mt-8">
        <Text className="text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Text>
        <TouchableOpacity className="ml-1" onPress={onToggleMode}>
          <Text className="text-blue-600 font-medium">
            {isLogin ? "Sign Up" : "Sign In"}
          </Text>
        </TouchableOpacity>
      </View>

      {isLogin && <SignInFooter />}
    </>
  );
};
