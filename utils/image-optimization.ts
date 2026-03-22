// Image optimization utility functions

/**
 * Generates a responsive image srcset for better performance
 * @param basePath Base path of the image
 * @param extension Image file extension
 * @param widths Array of widths to generate
 * @returns srcset string
 */
export function generateSrcSet(basePath: string, extension: string, widths: number[]): string {
  const basePathWithoutExt = basePath.replace(new RegExp(`\\.${extension}$`), "")

  return widths.map((width) => `${basePathWithoutExt}-${width}w.${extension} ${width}w`).join(", ")
}

/**
 * Determines if an image should be lazy loaded based on its position
 * @param priority Whether the image is high priority
 * @param isAboveFold Whether the image is above the fold
 * @returns loading strategy
 */
export function getLoadingStrategy(priority: boolean, isAboveFold: boolean): "eager" | "lazy" {
  if (priority || isAboveFold) {
    return "eager"
  }
  return "lazy"
}

/**
 * Generates a low-quality image placeholder
 * @param width Width of the placeholder
 * @param height Height of the placeholder
 * @param color Background color (hex)
 * @returns Base64 encoded SVG
 */
export function generatePlaceholder(width: number, height: number, color = "#f3f4f6"): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `
  const encoded = Buffer.from(svg).toString("base64")
  return `data:image/svg+xml;base64,${encoded}`
}

/**
 * Optimizes image dimensions for responsive design
 * @param originalWidth Original image width
 * @param originalHeight Original image height
 * @param containerWidth Container width
 * @returns Optimized dimensions
 */
export function getOptimizedDimensions(
  originalWidth: number,
  originalHeight: number,
  containerWidth: number,
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight
  const width = Math.min(originalWidth, containerWidth)
  const height = Math.round(width / aspectRatio)

  return { width, height }
}
