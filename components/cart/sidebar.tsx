import { useCartStore } from "@/store/cart"; // Adjust this import path as needed
import { SidebarClose } from "lucide-react-native";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function CartSidebar() {
  const { cart, setIsOpen } = useCartStore();

  const totalPrice = cart.reduce((sum, product) => {
    return sum + product.price * (product.quantity || 1);
  }, 0);

  return (
    <View className="bg-white absolute top-0 right-0 z-10 w-10/12 h-full shadow-lg">
      <View className="bg-gray-100 p-4 border-b border-gray-200 flex flex-row justify-between">
        <View className="">
          <Text className="text-xl font-bold text-gray-800">Your Cart</Text>
          <Text className="text-gray-500">{cart.length} items</Text>
        </View>
        <Pressable onPress={() => setIsOpen(false)} className="p-4">
          <SidebarClose />
        </Pressable>
      </View>

      {cart.length === 0 ? (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-gray-500 text-center">Your cart is empty</Text>
        </View>
      ) : (
        <ScrollView className="flex-1">
          {cart.map((product) => (
            <View
              key={product.id}
              className="flex-row p-4 border-b border-gray-200"
            >
              <Image
                source={{ uri: product.thumbnail }}
                className="w-20 h-20 rounded-md"
                resizeMode="cover"
              />
              <View className="flex-1 ml-4">
                <Text className="font-medium text-gray-800">
                  {product.title}
                </Text>
                <Text className="text-gray-500 text-sm">{product.brand}</Text>
                <View className="flex-row justify-between mt-2">
                  <Text className="font-bold">${product.price.toFixed(2)}</Text>
                  <Text className="text-gray-600">
                    Qty: {product.quantity || 2}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <View className="p-4 border-t border-gray-200">
        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-800 font-medium">Total:</Text>
          <Text className="text-gray-800 font-bold">
            ${totalPrice.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity className="bg-blue-500 py-3 rounded-md">
          <Text className="text-white font-medium text-center">Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
