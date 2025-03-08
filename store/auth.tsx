import { firebaseAuth } from "@/service/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useSegments } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export const useAuthSetup = () => {
  const { setUser, setIsLoading } = useAuthStore();
  const navigation = useNavigation();
  const segments = useSegments();

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
  }, [setUser]);

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
  }, [setUser, setIsLoading]);

  useEffect(() => {
    const { user, isLoading } = useAuthStore.getState();
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
        routes: [{ name: "(home)/dashboard" as never }],
      });
    }
  }, [
    segments,
    navigation,
    useAuthStore.getState().user,
    useAuthStore.getState().isLoading,
  ]);
};

export const useAuth = () => {
  const { user, isLoading } = useAuthStore();
  return { user, isLoading };
};
