import { todosService } from "@/service";
import { useTodosStore } from "@/store";
import { ITodos } from "@/type";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function TodoList() {
  const { todos, setTodos, loading, setLoading } = useTodosStore();

  const deleteTodo = (id: number) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
  };

  const handleChangeComplete = async (todo: ITodos) => {
    try {
      setLoading(true);
      const newTodo = await todosService.changeComplete(todo);
      const updatedTodos = todos.map((t) => (t.id === todo.id ? newTodo : t));

      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      {todos.map((todo) => (
        <View
          key={todo.title + todo.id}
          className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden"
        >
          <View className="p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text
                  className={`text-base ${
                    todo.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleChangeComplete(todo)}
                className={`ml-3 p-2 rounded-lg ${
                  todo.completed ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`${
                    todo.completed ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {todo.completed ? "✓" : "○"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => deleteTodo(todo.id)}
            className="bg-red-500 p-3"
          >
            <Text className="text-white text-center font-medium">Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
