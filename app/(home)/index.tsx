import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(home)/dashboard");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return <View style={{ flex: 1 }} />;
}
