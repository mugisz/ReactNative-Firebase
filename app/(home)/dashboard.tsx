import { FlatListItem } from "@/components";
import { CARD_WIDTH, SPACING } from "@/constant/slider";
import { useProductsQuery, useProductStore } from "@/store/products";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const { products, loading } = useProductStore();

  useProductsQuery();

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH(width) + SPACING));
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-gray-500">Loading products...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-800">Our Products</Text>
        <Text className="text-gray-500">Swipe to explore our collection</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={products}
        renderItem={({ item, index }) => (
          <FlatListItem item={item} width={width} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        onScroll={handleScroll}
        snapToInterval={CARD_WIDTH(width) + SPACING}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingLeft: (width - CARD_WIDTH(width)) / 2,
          paddingRight: (width - CARD_WIDTH(width)) / 2 + SPACING,
        }}
      />
    </SafeAreaView>
  );
}
