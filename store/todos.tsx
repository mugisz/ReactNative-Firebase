import { todosService } from "@/service";
import { ITodos } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { create } from "zustand";

interface ITodoStore {
  todos: ITodos[];
  setTodos: (todos: ITodos[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useTodosStore = create<ITodoStore>((set) => ({
  todos: [],
  setTodos: (todos: ITodos[]) => set({ todos }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

const useTodosQuery = () => {
  const { setTodos, setLoading } = useTodosStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: todosService.getTodos,
    enabled: true,
  });

  React.useEffect(() => {
    if (data) {
      setTodos(data);
    }
    setLoading(isLoading);
  }, [data, isLoading, setTodos, setLoading]);

  return { refetch };
};

export { useTodosQuery, useTodosStore };
