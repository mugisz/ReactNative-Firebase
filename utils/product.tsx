import { Text, View } from "react-native";

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
) => {
  const discountAmount = (price * discountPercentage) / 100;
  return price - discountAmount;
};

const renderRatingStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <View className="flex-row">
      {[...Array(fullStars)].map((_, i) => (
        <Text key={`full-${i}`} className="text-yellow-500 text-lg">
          ★
        </Text>
      ))}
      {halfStar && <Text className="text-yellow-500 text-lg">★</Text>}
      {[...Array(emptyStars)].map((_, i) => (
        <Text key={`empty-${i}`} className="text-gray-300 text-lg">
          ★
        </Text>
      ))}
      <Text className="text-gray-500 text-xs ml-1 mt-1">
        ({rating.toFixed(1)})
      </Text>
    </View>
  );
};

export { calculateDiscountedPrice, formatPrice, renderRatingStars };
