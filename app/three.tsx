import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function MyComponent() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/(home)/homes");
  };

  return (
    <View className="flex-1 items-center justify-center p-2 bg-red-400">
      <Pressable onPress={handlePress}>
        <Text>Go to Settings</Text>
      </Pressable>
    </View>
  );
}
