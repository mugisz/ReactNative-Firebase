import { Footer } from "@/components";
import { useAuthSetup, useAuthStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import "../global.css";
export default function RootLayout() {
  const queryClient = new QueryClient();
  const { user, isLoading } = useAuthStore();

  useAuthSetup();

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <SafeAreaView className="flex-1">
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
              presentation: "card",
            }}
          >
            <Stack.Screen name="(home)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(home)/product/[id]" />
          </Stack>
          <Footer />
        </SafeAreaView>
      )}
    </QueryClientProvider>
  );
}
