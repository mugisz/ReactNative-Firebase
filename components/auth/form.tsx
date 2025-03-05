import { AuthFormProps } from "@/type";
import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const AuthForm: React.FC<AuthFormProps> = ({
  formData,
  setFormData,
  isLogin,
  loading,
  onSubmit,
}) => {
  return (
    <View className="space-y-5">
      <View className="space-y-2">
        <Text className="text-gray-700 text-sm font-medium ml-1">Email</Text>
        <TextInput
          placeholder="your.email@example.com"
          value={formData.email || ""}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          className="bg-gray-100 rounded-xl px-4 py-3 text-gray-800"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View className="space-y-2">
        <Text className="text-gray-700 text-sm font-medium ml-1">Password</Text>
        <TextInput
          placeholder="Enter your password"
          value={formData.password || ""}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          className="bg-gray-100 rounded-xl px-4 py-3 text-gray-800"
        />
      </View>

      {!isLogin && (
        <View className="space-y-2">
          <Text className="text-gray-700 text-sm font-medium ml-1">
            Confirm Password
          </Text>
          <TextInput
            placeholder="Re-enter your password"
            value={formData.confirmPassword || ""}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
            className="bg-gray-100 rounded-xl px-4 py-3 text-gray-800"
          />
        </View>
      )}

      {isLogin && (
        <TouchableOpacity>
          <Text className="text-blue-600 text-right text-sm font-medium">
            Forgot Password?
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={onSubmit}
        className={`rounded-xl py-4 flex items-center justify-center mt-4 ${
          formData.email && formData.password ? "bg-blue-600" : "bg-blue-400"
        }`}
        disabled={
          loading ||
          !formData.email ||
          !formData.password ||
          (!isLogin && !formData.confirmPassword)
        }
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">
            {isLogin ? "Login" : "Register"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
