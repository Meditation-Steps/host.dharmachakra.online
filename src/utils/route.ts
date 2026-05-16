import type {Language} from "@/utils/lang.ts";

// Helper function to build route path
export const getRoutePath = (lang: Language, route?: string) => {
  if (!route) return "#";
  // "index" maps to the empty route (just /lang/)
  const path = route === "index" ? "" : route;
  return `/${lang}/${path}`;
};
