import ROUTES from "@/constant/route";
import { useAuth } from "@/context/auth";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function Footer() {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return (
    <View className="flex flex-row items-center rounded-full justify-center gap-2 bg-gray-200 py-5 ">
      {ROUTES?.map((route) => (
        <Link href={route.path || ""} asChild key={route.name}>
          <Pressable className="p-2 bg-white rounded">
            <Text> {route.name}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
