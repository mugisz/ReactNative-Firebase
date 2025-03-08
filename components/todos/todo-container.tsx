import { useTodosStore } from "@/store";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { TodoList } from "./list";

export function TodoContainer() {
  const { todos, loading } = useTodosStore();

  return (
    <View className="mb-20">
      <Text className="text-lg font-semibold text-gray-700 mb-3">
        My Tasks ({todos.length})
      </Text>
      <TodoList />
      {loading && todos.length > 0 && (
        <ActivityIndicator size="small" color="#3b82f6" className="my-4" />
      )}
    </View>
  );
}
