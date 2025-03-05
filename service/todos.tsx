import { ITodos } from "@/type/todos";
import axios from "axios";
import cuid from "cuid";

export const todosService = {
  getTodos: async (): Promise<ITodos[]> => {
    const { data } = await axios.get<ITodos[]>(
      "https://jsonplaceholder.typicode.com/todos?_limit=2"
    );
    return data;
  },
  pushTodod: async ({ title }: { title: string }): Promise<ITodos> => {
    const { data } = await axios.post<ITodos>(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: title,
        completed: false,
        userId: cuid(),
        id: cuid(),
      }
    );
    return data;
  },
  changeComplete: async (newTodo: ITodos): Promise<ITodos> => {
    const { data } = await axios.put<ITodos>(
      `https://jsonplaceholder.typicode.com/todos/${newTodo.id}`,
      {
        ...newTodo,
        completed: !newTodo?.completed,
      }
    );

    return data;
  },
};
