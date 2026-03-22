import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stilla Trading - Premium Peanut Butter",
    short_name: "Stilla",
    description: "100% natural peanut butter made from premium quality peanuts in Ghana",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#b45309",
    orientation: "portrait",
    scope: "/",
    prefer_related_applications: false,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    screenshots: [
      {
        src: "/images/stilla-peanut-butter.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Stilla Peanut Butter",
      },
      {
        src: "/images/product-range-new.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "narrow",
        label: "Stilla Product Range",
      },
    ],
  }
}
