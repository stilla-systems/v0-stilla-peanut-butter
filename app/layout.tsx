import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ManualPaymentWidget from "@/components/manual-payment-widget"
import GoogleAnalytics from "@/components/google-analytics"
import { JsonLd } from "@/components/json-ld"
import PWAInstallPrompt from "@/components/pwa-install-prompt"
import MobileQuickActions from "@/components/mobile-quick-actions"
import Script from "next/script"
import { Suspense } from "react"
import PWACheckoutHandler from "@/components/pwa-checkout-handler"
import PromotionalSeal from "@/components/promotional-seal"
import PerformanceOptimizations from "@/components/performance-optimizations"

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font loading
})

export const metadata: Metadata = {
  title: "Stilla Peanut Butter | 100% Natural Peanut Butter in Ghana",
  description:
    "Stilla Peanut Butter - made from 100% natural peanuts with no additives or preservatives. Rich in protein, healthy fats, vitamins, and minerals. Buy now and enter our promotions!",
  keywords: [
    "Stilla Peanut Butter",
    "natural peanut butter",
    "Ghana peanut butter",
    "Kumasi",
    "healthy peanut butter",
    "no additives",
    "protein rich",
    "Stilla Peanut Butter",
  ],
  authors: [{ name: "Stilla Peanut Butter" }],
  creator: "Stilla Peanut Butter",
  publisher: "Stilla Peanut Butter",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "https://www.stillapeanutbutter.com",
  },
  openGraph: {
    type: "website",
    url: "https://www.stillapeanutbutter.com",
    title: "Stilla Peanut Butter | 100% Natural Peanut Butter in Ghana",
    description:
      "Premium quality 100% natural peanut butter made in Ghana. No additives, no preservatives - just pure peanut goodness.",
    siteName: "Stilla Peanut Butter",
    images: [
      {
        url: "/images/stilla-peanut-butter.png",
        width: 1200,
        height: 630,
        alt: "Stilla Peanut Butter Jar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stilla Peanut Butter | 100% Natural Peanut Butter in Ghana",
    description:
      "Premium quality 100% natural peanut butter made in Ghana. No additives, no preservatives - just pure peanut goodness.",
    images: ["/images/stilla-peanut-butter.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover, user-scalable=yes",
  themeColor: "#b45309",
  appleWebApp: {
    capable: true,
    title: "Stilla Peanut Butter",
    statusBarStyle: "black-translucent",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add this inside the head tag */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="apple-touch-fullscreen" content="yes" />

        {/* Preload critical assets */}
        <link rel="preload" href="/images/stilla-peanut-butter.png" as="image" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <JsonLd />
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <PWACheckoutHandler />
          <Header />
          {children}
          <Footer />
          <ManualPaymentWidget />
          <PromotionalSeal />
          <MobileQuickActions />
          <PWAInstallPrompt />
          <PerformanceOptimizations />

          {/* Register Service Worker */}
          <Script id="register-sw" strategy="afterInteractive">
            {`
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  )
}
