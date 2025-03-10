import { Home, ListTodo, User } from "lucide-react-native";

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

export { getIconForRoute };
