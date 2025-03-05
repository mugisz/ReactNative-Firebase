import { Footer, Header } from "@/components";
import { AuthProvider } from "@/context/auth";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import "../global.css";
export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView className="flex-1 bg-transparent">
        <Header />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            presentation: "card",
          }}
        >
          <Stack.Screen name="(home)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="three" />
        </Stack>
        <SafeAreaView className="absolute bottom-0 left-0 right-0 bg-white z-10">
          <Footer />
        </SafeAreaView>
      </SafeAreaView>
    </AuthProvider>
  );
}
