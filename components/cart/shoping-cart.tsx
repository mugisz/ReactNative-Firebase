import { useCartStore } from "@/store";
import { ShoppingCart } from "lucide-react-native";
import { Dimensions, Pressable } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export const AnimatedShoppingCart = () => {
  const { isOpen, setIsOpen } = useCartStore();

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const activeIndex = 0;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: interpolate(
        opacity.value,
        [0, 1],
        [0.6, activeIndex === 0 ? 1 : 0],
        Extrapolate.CLAMP
      ),
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 10, stiffness: 150 });
    opacity.value = withTiming(0.8, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    opacity.value = withTiming(1, { duration: 200 });
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => setIsOpen(!isOpen)}
    >
      <Animated.View className="pr-6" style={[animatedStyle]}>
        <ShoppingCart color="gray" />
      </Animated.View>
    </Pressable>
  );
};
