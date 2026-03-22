export function JsonLd() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Stilla Peanut Butter",
    image: "https://www.stillapeanutbutter.com/images/stilla-peanut-butter.png",
    description:
      "Stilla Peanut Butter is packed with essential nutrients, including protein, healthy fats, vitamins, and minerals. It provides a great energy boost.",
    "@id": "https://g.co/kgs/ypv7C2v",
    url: "https://www.stillapeanutbutter.com",
    telephone: "+233 59 630 2403",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kwamo rd",
      addressLocality: "Ejisu",
      addressRegion: "Kumasi",
      addressCountry: "Ghana",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.6666,
      longitude: -1.6163,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://g.co/kgs/ypv7C2v",
      "https://www.facebook.com/stillapeanutbutter",
      "https://www.instagram.com/stillapeanutbutter",
    ],
    priceRange: "₵₵",
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Stilla Peanut Butter",
    image: "https://www.stillapeanutbutter.com/images/stilla-peanut-butter.png",
    description:
      "100% natural peanut butter made from premium quality peanuts. No additives, no preservatives - just pure peanut goodness.",
    brand: {
      "@type": "Brand",
      name: "Stilla",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.stillapeanutbutter.com/shop",
      priceCurrency: "GHS",
      price: "55.00",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Stilla Peanut Butter",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
    nutrition: {
      "@type": "NutritionInformation",
      calories: "190 calories",
      fatContent: "16 g",
      proteinContent: "7 g",
      carbohydrateContent: "7 g",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </>
  )
}
