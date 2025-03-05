type AppRoutePath =
  | "/(home)"
  | "/(home)/todos"
  | "/three"
  | "/(home)/homes"
  | "/(auth)/login";

interface RouteConfig {
  name: string;
  path: AppRoutePath;
}

export type { RouteConfig };
