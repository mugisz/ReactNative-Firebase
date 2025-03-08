import { RouteConfig } from "@/type/route";

const ROUTES: RouteConfig[] = [
  {
    name: "/dashboard",
    path: "/(home)/dashboard",
  },
  {
    name: "/todos",
    path: "/(home)/todos",
  },
  {
    name: "/profile",
    path: "/(home)/profile",
  },
];

export default ROUTES;
