import { useAuth } from "@/context/auth";
import { firebaseAuth } from "@/service/firebase";
import React from "react";
import { Pressable, Text, View } from "react-native";

export function Header() {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return (
    <View className="h-[40px] bg-gray-400 flex flex-row justify-between px-6 items-center">
      <Text>Native App</Text>
      <View className="flex flex-row items-center gap-2">
        <Text>{user.email}</Text>

        <Pressable onPress={() => firebaseAuth.signOut()}>
          <View className="w-10 h-10 bg-gray-200 rounded-full" />
        </Pressable>
      </View>
    </View>
  );
}
