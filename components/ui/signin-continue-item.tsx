import { Text, TouchableOpacity, View } from "react-native";

export function SignInContinueItem({ items }: { items: string[] }) {
  return (
    <View className="flex-row justify-center gap-4">
      {items?.map((item) => (
        <TouchableOpacity
          key={item}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100"
        >
          <Text className="text-xl">{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
