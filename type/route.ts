type AppRoutePath = "/(home)/todos" | "/(home)/dashboard" | "/(home)/profile";

interface RouteConfig {
  name: string;
  path: AppRoutePath;
}

export type { AppRoutePath, RouteConfig };
