import { ITodos } from "@/type";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface ISearchOverlay {
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  filteredTodos: ITodos[];
}
export function SearchOverlay({
  setSearch,
  setSearchValue,
  searchValue,
  filteredTodos,
}: ISearchOverlay) {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 bg-white z-10 px-4 pt-4">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-xl font-bold text-gray-800">Search Tasks</Text>
        <TouchableOpacity
          onPress={() => setSearch(false)}
          className="bg-gray-200 p-2 rounded-full"
        >
          <Text className="text-gray-600">✕</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-6">
        <TextInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Type to search..."
          className="p-4 bg-gray-100 rounded-xl text-gray-800"
          autoFocus
        />
      </View>

      {searchValue.length === 0 ? (
        <View className="items-center py-10">
          <Text className="text-gray-400">Type something to search</Text>
        </View>
      ) : filteredTodos.length === 0 ? (
        <View className="items-center py-10">
          <Text className="text-gray-500">No matching tasks found</Text>
        </View>
      ) : (
        <View>
          <Text className="text-sm font-medium text-gray-500 mb-2">
            Results ({filteredTodos.length})
          </Text>
          {filteredTodos.map((todo) => (
            <View
              key={todo.title + todo.id}
              className="bg-white border border-gray-200 rounded-xl p-4 mb-3"
            >
              <Text className="text-gray-800">{todo.title}</Text>
              <View className="flex-row items-center mt-2">
                <View
                  className={`px-2 py-1 rounded-full ${
                    todo.completed ? "bg-green-100" : "bg-yellow-100"
                  }`}
                >
                  <Text
                    className={`text-xs ${
                      todo.completed ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {todo.completed ? "Completed" : "In Progress"}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
