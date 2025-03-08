import { todosService } from "@/service";
import { useTodosStore } from "@/store";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface InputBlockProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}
export function InputBlock({ title, setTitle, handleSearch }: InputBlockProps) {
  const { todos, setTodos, setLoading } = useTodosStore();
  const addTodo = async () => {
    if (title.trim()) {
      try {
        setLoading(true);
        const newTodo = await todosService.pushTodod({ title });
        setTodos([...todos, newTodo]);
        setTitle("");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-6 flex-row items-center">
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Add a new task..."
        className="flex-1 p-3 bg-gray-100 rounded-lg text-gray-800"
      />
      <View className="flex flex-row items-center  gap-2">
        <TouchableOpacity
          onPress={addTodo}
          className="ml-3 bg-blue-600 p-3 rounded-lg"
          disabled={!title.trim()}
        >
          <Text className="text-white font-medium">Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSearch}
          className="bg-gray-100 p-3 rounded-lg"
        >
          <Text className="text-gray-600">🔍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
