import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center" }}
      className=""
    >
      <Text className="pt-10">HELLO WORD</Text>
      <Text>{count}</Text>
      <View className="flex flex-row gap-2">
        <Pressable
          onPress={() => setCount(count + 1)}
          className="p-2 bg-black "
        >
          <Text className="text-white">Press</Text>
        </Pressable>
        <Pressable
          onPress={() => setCount(count - 1)}
          className="p-2 bg-black "
        >
          <Text className="text-white">Decrease</Text>
        </Pressable>
      </View>
    </View>
  );
}
