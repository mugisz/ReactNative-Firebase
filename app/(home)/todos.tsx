import {
  EmptyTodoList,
  InputBlock,
  LoadingIndicator,
  SearchOverlay,
  TodoContainer,
} from "@/components";
import { useTodosQuery, useTodosStore } from "@/store";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
export default function Todos() {
  const { todos, loading } = useTodosStore();

  useTodosQuery();
  const [title, setTitle] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = () => {
    setSearch(true);
  };

  const filteredTodos = searchValue.length
    ? todos?.filter((todo) =>
        todo.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];
  const renderContent = () => {
    if (loading && todos.length === 0) {
      return <LoadingIndicator title="Loading tasks..." />;
    }

    if (todos.length === 0) {
      return (
        <EmptyTodoList
          title="No tasks yet"
          description="Add a new task to get started"
        />
      );
    }

    return <TodoContainer />;
  };

  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1">
        <ScrollView className="flex-1 px-4 pt-4">
          <View
            className={`flex-1 ${
              search ? "opacity-20 pointer-events-none" : ""
            }`}
          >
            <InputBlock
              title={title}
              setTitle={setTitle}
              handleSearch={handleSearch}
            />
            {renderContent()}
          </View>

          {search && (
            <SearchOverlay
              setSearch={setSearch}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              filteredTodos={filteredTodos}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
