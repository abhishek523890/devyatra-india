import type { MetadataRoute } from "next"

const BASE_URL = "https://devyatra-india.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/packages",
    "/packages/char-dham-yatra",
    "/destinations",
    "/guides",
    "/about",
    "/contact",
    "/faq",
    "/custom-tour",
  ]

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority:
      route === ""
        ? 1
        : route.includes("char-dham")
          ? 0.95
          : 0.7,
  }))
}
