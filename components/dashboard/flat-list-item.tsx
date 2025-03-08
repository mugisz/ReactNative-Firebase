import { CARD_WIDTH, SPACING } from "@/constant/slider";
import { IProduct } from "@/type";
import {
  calculateDiscountedPrice,
  formatPrice,
  renderRatingStars,
} from "@/utils";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
export const FlatListItem = ({
  item,
  width,
}: {
  item: IProduct;
  width: number;
}) => {
  const router = useRouter();
  const discountedPrice = calculateDiscountedPrice(
    item.price,
    item.discountPercentage
  );
  const handleNavigateToProduct = () => {
    router.push(`/(home)/product/${item.id}`);
  };

  return (
    <View
      style={{ width: CARD_WIDTH(width), marginRight: SPACING }}
      className="rounded-2xl bg-white shadow-md overflow-hidden  h-[480px]"
    >
      <TouchableOpacity onPress={handleNavigateToProduct}>
        <View
          className={`absolute top-2 right-2 z-10 px-2 py-1 rounded-full ${
            item.availabilityStatus === "In Stock"
              ? "bg-green-100"
              : "bg-orange-100"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              item.availabilityStatus === "In Stock"
                ? "text-green-700"
                : "text-orange-700"
            }`}
          >
            {item.availabilityStatus}
          </Text>
        </View>

        <View className="w-full h-[220px] bg-gray-100">
          <Image
            source={{ uri: item.thumbnail }}
            className="w-full h-full object-cover"
            resizeMode="contain"
          />
        </View>

        <View className="p-4">
          <Text className="text-blue-600 text-xs font-semibold mb-1">
            {item.brand}
          </Text>

          <Text
            className="text-gray-800 text-lg font-bold mb-1"
            numberOfLines={1}
          >
            {item.title}
          </Text>

          <Text className="text-gray-500 text-sm mb-2" numberOfLines={2}>
            {item.description}
          </Text>

          <View className="mb-2">{renderRatingStars(item.rating)}</View>

          <View className="flex-row items-center mb-3">
            <Text className="text-gray-800 text-xl font-bold">
              {formatPrice(discountedPrice)}
            </Text>
            {item.discountPercentage > 0 && (
              <View className="flex-row items-center ml-2">
                <Text className="text-gray-400 text-sm line-through">
                  {formatPrice(item.price)}
                </Text>
                <View className="ml-2 bg-red-100 px-2 py-0.5 rounded">
                  <Text className="text-red-600 text-xs font-bold">
                    -{Math.round(item.discountPercentage)}%
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View className="flex-row flex-wrap gap-1 mb-3">
            <View className="bg-purple-100 px-2 py-0.5 rounded">
              <Text className="text-purple-600 text-xs">{item.category}</Text>
            </View>
            {item.tags.slice(0, 2).map((tag, i) => (
              <View
                key={`tag-${i}`}
                className="bg-gray-100 px-2 py-0.5 rounded"
              >
                <Text className="text-gray-600 text-xs">{tag}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity className="bg-blue-600 w-full py-2 rounded-lg items-center">
            <Text className="text-white font-bold">View IProduct</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};
