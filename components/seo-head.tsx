import Head from "next/head"

interface SeoHeadProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
}

export default function SeoHead({
  title = "Stilla Peanut Butter | 100% Natural Peanut Butter in Ghana",
  description = "Premium quality 100% natural peanut butter made in Ghana. No additives, no preservatives - just pure peanut goodness.",
  canonicalUrl = "https://www.stillapeanutbutter.com",
  ogImage = "/images/stilla-peanut-butter.png",
  ogType = "website",
}: SeoHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Head>
  )
}
