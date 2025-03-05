import { firebaseAuth } from "@/service/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useSegments } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const AuthContext = React.createContext<{
  user: User | null;
  isLoading: boolean;
}>({ user: null, isLoading: true });

export const useAuth = () => React.useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const navigation = useNavigation();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage:", error);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (userData) => {
      setUser(userData);

      try {
        if (userData) {
          await AsyncStorage.setItem("user", JSON.stringify(userData));
        } else {
          await AsyncStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error saving user to AsyncStorage:", error);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      navigation.reset({
        index: 0,
        routes: [{ name: "(auth)/login" as never }],
      });
    } else if (user && inAuthGroup) {
      navigation.reset({
        index: 0,
        routes: [{ name: "(home)" as never }],
      });
    }
  }, [user, segments, isLoading, navigation]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {isLoading ? <Text>Loading...</Text> : children}
    </AuthContext.Provider>
  );
}
