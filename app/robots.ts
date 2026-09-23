import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/actions/",
        "/booking/",
      ],
    },
    sitemap: "https://sureshtourandtravel.com/sitemap.xml",
  }
}
