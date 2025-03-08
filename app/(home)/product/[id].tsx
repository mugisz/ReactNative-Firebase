import { productsService } from "@/service";
import { useProductStore } from "@/store/products";
import { IProduct } from "@/type";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const { products } = useProductStore();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Знаходимо продукт за ID з URL
    const productId = parseInt(id as string);
    const foundProduct = products.find((p) => p.id === productId);

    if (foundProduct) {
      setProduct(foundProduct || null);
    } else {
      fetchProductById(productId);
    }

    setLoading(false);
  }, [id, products]);

  const fetchProductById = async (productId: number) => {
    try {
      const response = await productsService.getProductById(productId);
      setProduct(response);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-gray-800 text-lg mb-4">Product not found</Text>
        <TouchableOpacity
          className="bg-blue-600 px-4 py-2 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-row items-center p-4 border-b border-gray-200">
          <TouchableOpacity className="p-2" onPress={() => router.back()}>
            <Text className="text-blue-600">← Back</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-center flex-1">
            Product Details
          </Text>
          <View style={{ width: 50 }} />
        </View>

        <View className="w-full h-[300px] bg-gray-100">
          <Image
            source={{ uri: product.thumbnail }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        <View className="p-4">
          <Text className="text-blue-600 font-medium">{product.brand}</Text>
          <Text className="text-2xl font-bold text-gray-800 mt-1">
            {product.title}
          </Text>

          <View className="flex-row items-baseline mt-2">
            <Text className="text-2xl font-bold text-gray-800">
              $
              {(product.price * (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
            </Text>
            {product.discountPercentage > 0 && (
              <>
                <Text className="ml-2 text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </Text>
                <View className="ml-2 bg-red-100 px-2 py-0.5 rounded">
                  <Text className="text-red-600 text-xs font-bold">
                    -{Math.round(product.discountPercentage)}%
                  </Text>
                </View>
              </>
            )}
          </View>

          <View className="flex-row items-center mt-2">
            <Text className="text-gray-600">{product.rating} ★</Text>
          </View>

          <View className="mt-4">
            <Text className="text-lg font-semibold text-gray-800">
              Description
            </Text>
            <Text className="text-gray-600 mt-1">{product.description}</Text>
          </View>

          <View className="mt-4">
            <Text className="text-lg font-semibold text-gray-800">Details</Text>
            <View className="bg-gray-50 rounded-lg p-3 mt-2">
              <View className="flex-row justify-between py-2 border-b border-gray-200">
                <Text className="text-gray-500">Category</Text>
                <Text className="text-gray-800">{product.category}</Text>
              </View>
              <View className="flex-row justify-between py-2 border-b border-gray-200">
                <Text className="text-gray-500">Stock</Text>
                <Text className="text-gray-800">{product.stock}</Text>
              </View>
              <View className="flex-row justify-between py-2 border-b border-gray-200">
                <Text className="text-gray-500">SKU</Text>
                <Text className="text-gray-800">{product.sku}</Text>
              </View>
              <View className="flex-row justify-between py-2">
                <Text className="text-gray-500">Warranty</Text>
                <Text className="text-gray-800">
                  {product.warrantyInformation}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity className="bg-blue-600 w-full py-3 rounded-lg items-center mt-6">
            <Text className="text-white font-bold text-lg">Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
