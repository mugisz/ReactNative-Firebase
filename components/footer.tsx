import ROUTES from "@/constant/route";
import { useAuth, useCartStore } from "@/store";
import { AppRoutePath } from "@/type";
import { getIconForRoute } from "@/utils";
import { Link, usePathname } from "expo-router";
import { Pressable, SafeAreaView } from "react-native";

export function Footer() {
  const { user } = useAuth();
  const { isOpen } = useCartStore();

  const pathname = usePathname();
  if (!user) {
    return null;
  }

  const isActive = (path: string): boolean => {
    return pathname === path || pathname.startsWith(path);
  };

  return (
    <SafeAreaView className="flex flex-row items-center justify-evenly py-4 shadow-sm  ">
      {!isOpen && user
        ? ROUTES?.map((route) => {
            const active = isActive(route.name);
            return (
              <Link href={route.path as AppRoutePath} asChild key={route.name}>
                <Pressable
                  className={`p-3 rounded-full transition-colors  ${
                    active ? "bg-blue-50" : ""
                  }`}
                >
                  {getIconForRoute(route.name, active)}
                </Pressable>
              </Link>
            );
          })
        : null}
    </SafeAreaView>
  );
}
