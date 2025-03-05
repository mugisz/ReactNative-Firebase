import { todosService } from "@/service";
import { ITodos } from "@/type/todos";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Todos() {
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [title, setTitle] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const [searchTodo, setSearchTodo] = useState<string>("");
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await todosService.getTodos();
      setTodos(data);
    };
    fetchTodos();
  }, []);
  const addTodo = async () => {
    if (title) {
      const newTodo = await todosService.pushTodod({ title });
      setTodos([...todos, newTodo]);
      setTitle("");
      console.log(todos);
    }
  };
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  const handleChangeComplete = async (todos: ITodos) => {
    const newTodo = await todosService.changeComplete(todos);

    setTodos((prev) =>
      prev.map((todo) => (todo.id === todos.id ? newTodo : todo))
    );
  };

  const handleSearch = () => {
    setSearch(true);
  };

  const filterMas =
    searchValue.length &&
    todos?.filter((todo) =>
      todo.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 px-4 ">
        <View
          className={`flex flex-col items-center justify-center pb-20 gap-2 ${
            search ? "opacity-20 cursor-none pointer-events-none" : ""
          }`}
        >
          <Text className="text-xl font-bold my-4">Todos</Text>
          <View className="w-full flex flex-row items-center gap-4">
            <TextInput
              value={title}
              onChangeText={setTitle}
              className=" border border-gray-200 p-2 rounded-md text-left w-[45%]"
            />
            <Pressable onPress={addTodo}>
              <Text className="bg-gray-300 p-2 rounded">Set Todos</Text>
            </Pressable>
            <Pressable onPress={handleSearch}>
              <Text className="bg-gray-300 p-2 rounded">Search Todos</Text>
            </Pressable>
          </View>
          <View className="flex flex-col w-full">
            {todos?.map((todo) => (
              <View
                className="flex flex-row gap-2 justify-between items-center border border-gray-200 p-3 mb-2 rounded-md"
                key={todo.title + todo.id}
              >
                <Text className="flex-1 mr-2">{todo.title}</Text>
                <View className=" flex flex-col items-center gap-2 ">
                  <View className="flex flex-col items-center bg-gray-300 p-1 rounded">
                    <Text className="mr-2">
                      {todo.completed ? "Done" : "Undone"}
                    </Text>
                    <Pressable
                      onPress={() => handleChangeComplete(todo)}
                      className="bg-white px-2 py-1 rounded"
                    >
                      <Text>Complete</Text>
                    </Pressable>
                  </View>
                  <Pressable
                    onPress={() => deleteTodo(todo.id)}
                    className="bg-red-500 px-2 py-1 rounded "
                  >
                    <Text className="ml-2">Delete</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
        {search && (
          <View className=" bg-slate-100/50 h-full absolute top-0 left-0 gap-4 flex flex-col justify-center items-center w-full">
            <View className="flex flex-row items-center gap-4">
              <Text>Search Todos</Text>
              <Pressable
                onPress={() => setSearch(false)}
                className="bg-red-500 px-2 py-1 rounded "
              >
                <Text className="ml-2">Close</Text>
              </Pressable>
            </View>
            <View className="">
              <View className="w-full flex flex-col items-center gap-4">
                <TextInput
                  value={searchValue}
                  onChangeText={setSearchValue}
                  className=" border border-gray-200 p-2 rounded-md text-left w-[300px] bg-slate-300"
                />
                {(filterMas || [])?.map((todo) => (
                  <View
                    className="flex flex-row gap-2 justify-between items-center border border-gray-200 p-3 mb-2 rounded-md"
                    key={todo.title + todo.id}
                  >
                    <Text className="flex-1 mr-2">{todo.title}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
