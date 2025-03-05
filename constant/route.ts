import { RouteConfig } from "@/type/route";

const ROUTES: RouteConfig[] = [
  {
    name: "Counter",
    path: "/(home)",
  },
  {
    name: "Todos",
    path: "/(home)/todos",
  },
  {
    name: "three",
    path: "/three",
  },
  {
    name: "login",
    path: "/(auth)/login",
  },
];

export default ROUTES;
