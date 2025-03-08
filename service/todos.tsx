import { TODO_URL } from "@/constant/urls";
import { ITodos } from "@/type/todos";
import axios from "axios";
import cuid from "cuid";

export const todosService = {
  getTodos: async (): Promise<ITodos[]> => {
    const { data } = await axios.get<ITodos[]>(`${TODO_URL}?_limit=2`);
    return data;
  },
  pushTodod: async ({ title }: { title: string }): Promise<ITodos> => {
    const { data } = await axios.post<ITodos>(`${TODO_URL}`, {
      title: title,
      completed: false,
      userId: cuid(),
      id: cuid(),
    });
    return data;
  },
  changeComplete: async (newTodo: ITodos): Promise<ITodos> => {
    const { data } = await axios.put<ITodos>(`${TODO_URL}/${newTodo.id}`, {
      ...newTodo,
      completed: !newTodo?.completed,
    });

    return data;
  },
};
