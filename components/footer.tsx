import ROUTES from "@/constant/route";
import { useAuth } from "@/store";
import { AppRoutePath } from "@/type";
import { Link, usePathname } from "expo-router";
import { Home, ListTodo, User } from "lucide-react-native";
import { Pressable, View } from "react-native";

export function Footer() {
  const { user } = useAuth();
  const pathname = usePathname();
  if (!user) {
    return null;
  }

  const isActive = (path: string): boolean => {
    return pathname === path || pathname.startsWith(path);
    return true;
  };

  const getIconForRoute = (routeName: string, isActive: boolean) => {
    const activeColor = "#3b82f6";
    const inactiveColor = "#6b7280";
    const size = 24;
    const color = isActive ? activeColor : inactiveColor;

    switch (routeName.toLowerCase()) {
      case "/dashboard":
        return <Home color={color} size={size} />;
      case "/todos":
        return <ListTodo color={color} size={size} />;
      case "/profile":
        return <User color={color} size={size} />;
      default:
        return <Home color={color} size={size} />;
    }
  };

  return (
    <View className="flex flex-row items-center justify-evenly bg-white py-4 shadow-md border-t border-gray-200">
      {ROUTES?.map((route) => {
        const active = isActive(route.name);
        return (
          <Link href={route.path as AppRoutePath} asChild key={route.name}>
            <Pressable
              className={`p-3 rounded-full ${active ? "bg-blue-50" : ""}`}
            >
              {getIconForRoute(route.name, active)}
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}
