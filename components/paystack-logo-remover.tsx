"use client"

import { useEffect, useRef } from "react"

export default function PaystackLogoRemover() {
  // Keep track of mutation observer
  const observerRef = useRef<MutationObserver | null>(null)

  useEffect(() => {
    // Function to hide Paystack logo and branding
    const hidePaystackBranding = (doc: Document) => {
      // Target common selectors used by Paystack for their branding
      const selectors = [
        // Logo selectors
        'img[alt*="aystack"]',
        'img[src*="aystack"]',
        'img[alt*="payment"]',
        'img[src*="payment"]',
        'img[alt*="logo"]',
        'img[src*="logo"]',
        'svg[class*="aystack"]',
        'svg[class*="logo"]',

        // Container selectors
        ".paystack-badge",
        ".paystack-footer",
        ".paystack-attribution",
        ".powered-by-paystack",
        '[class*="paystack"]',
        '[class*="Paystack"]',
        '[id*="paystack"]',
        '[id*="Paystack"]',
        '[class*="logo"]',
        '[class*="Logo"]',
        '[class*="brand"]',
        '[class*="Brand"]',
        ".powered-by",
        ".attribution",
        ".footer-attribution",
        ".footer-logo",
        ".logo-section",
        ".logo-container",
        "footer",
        ".footer",
        ".branding",
        ".brand",
        ".copyright",
        ".powered",
        ".powered-by",
        ".secured-by",
        ".secured",
        ".payment-powered",
        ".payment-footer",
        ".payment-header",
        ".payment-badge",
        ".payment-logo",
        ".payment-brand",
        ".payment-attribution",
        ".payment-powered-by",
        ".payment-secured-by",
        ".payment-secured",
        ".payment-footer-logo",
        ".payment-header-logo",
        ".payment-badge-logo",
        ".payment-logo-container",
        ".payment-brand-container",
        ".payment-attribution-container",
        ".payment-powered-by-container",
        ".payment-secured-by-container",
        ".payment-secured-container",
        ".payment-footer-logo-container",
        ".payment-header-logo-container",
        ".payment-badge-logo-container",
      ]

      // Apply to all elements matching selectors
      selectors.forEach((selector) => {
        try {
          const elements = doc.querySelectorAll(selector)
          elements.forEach((el) => {
            el.style.display = "none !important"
            el.style.visibility = "hidden !important"
            el.style.opacity = "0 !important"
            el.style.height = "0 !important"
            el.style.width = "0 !important"
            el.style.position = "absolute !important"
            el.style.pointerEvents = "none !important"
            el.style.clip = "rect(0 0 0 0) !important"
            el.style.margin = "-1px !important"
            el.style.padding = "0 !important"
            el.style.overflow = "hidden !important"
            el.style.border = "0 !important"
            el.setAttribute("aria-hidden", "true")
            el.setAttribute("hidden", "hidden")

            // Try to remove the element completely
            try {
              el.remove()
            } catch (e) {
              // If removal fails, at least hide it
              el.style.cssText +=
                "display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; width: 0 !important; position: absolute !important; pointer-events: none !important; clip: rect(0 0 0 0) !important; margin: -1px !important; padding: 0 !important; overflow: hidden !important; border: 0 !important;"
            }
          })
        } catch (e) {
          // Ignore errors for individual selectors
          console.log("Error with selector", selector, e)
        }
      })

      // Replace any text containing "Paystack" with "Stillapay"
      const replaceText = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
          const text = node.nodeValue
          if (text.match(/[pP]aystack/)) {
            node.nodeValue = text
              .replace(/Paystack/g, "Stillapay")
              .replace(/paystack/g, "stillapay")
              .replace(/PAYSTACK/g, "STILLAPAY")
              .replace(/PayStack/g, "StillaPay")
          }
        } else {
          // Process child nodes recursively
          const childNodes = node.childNodes
          for (let i = 0; i < childNodes.length; i++) {
            replaceText(childNodes[i])
          }
        }
      }

      try {
        replaceText(doc.body)
      } catch (e) {
        console.log("Error replacing text", e)
      }

      // Replace page title if it contains Paystack
      try {
        if (doc.title && /[pP]aystack/.test(doc.title)) {
          doc.title = doc.title
            .replace(/Paystack/g, "Stillapay")
            .replace(/paystack/g, "stillapay")
            .replace(/PAYSTACK/g, "STILLAPAY")
            .replace(/PayStack/g, "StillaPay")
        }
      } catch (e) {
        console.log("Error replacing title", e)
      }

      // Replace meta tags
      try {
        const metaTags = doc.querySelectorAll("meta")
        metaTags.forEach((tag) => {
          const content = tag.getAttribute("content")
          if (content && /[pP]aystack/.test(content)) {
            tag.setAttribute(
              "content",
              content
                .replace(/Paystack/g, "Stillapay")
                .replace(/paystack/g, "stillapay")
                .replace(/PAYSTACK/g, "STILLAPAY")
                .replace(/PayStack/g, "StillaPay"),
            )
          }
        })
      } catch (e) {
        console.log("Error replacing meta tags", e)
      }

      // Add custom CSS to override Paystack styles
      try {
        const style = document.createElement("style")
        style.id = "stillapay-override-styles"
        style.innerHTML = `
          /* Hide all Paystack branding */
          [class*="paystack"], [id*="paystack"], [class*="Paystack"], [id*="Paystack"],
          [class*="logo"], [class*="Logo"], [class*="brand"], [class*="Brand"],
          footer, .footer, .powered-by, .attribution, .branding, .brand, .copyright,
          .payment-powered, .payment-footer, .payment-header, .payment-badge, 
          .payment-logo, .payment-brand, .payment-attribution, .payment-powered-by,
          .payment-secured-by, .payment-secured, .payment-footer-logo, .payment-header-logo,
          .payment-badge-logo, .payment-logo-container, .payment-brand-container,
          .payment-attribution-container, .payment-powered-by-container,
          .payment-secured-by-container, .payment-secured-container,
          .payment-footer-logo-container, .payment-header-logo-container,
          .payment-badge-logo-container {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            width: 0 !important;
            position: absolute !important;
            pointer-events: none !important;
            clip: rect(0 0 0 0) !important;
            margin: -1px !important;
            padding: 0 !important;
            overflow: hidden !important;
            border: 0 !important;
          }
          
          /* Ensure the iframe content takes full height */
          html, body {
            height: 100% !important;
            overflow: hidden !important;
          }
          
          /* Style the main payment form to look like Stillapay */
          .main-form, form, .payment-form, .checkout-form, 
          .card-form, .bank-form, .transfer-form, 
          [class*="form"], [class*="Form"], 
          [class*="checkout"], [class*="Checkout"],
          [class*="payment"], [class*="Payment"] {
            background: white !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(180, 83, 9, 0.1) !important;
            border: 1px solid rgba(180, 83, 9, 0.2) !important;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          }

          /* Make payment form match Stillapay branding */
          .payment-form, .checkout-form, .card-form, .bank-form, .transfer-form {
            background-color: white !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 16px rgba(180, 83, 9, 0.1) !important;
            border: 1px solid rgba(180, 83, 9, 0.2) !important;
          }

          /* Style input fields */
          input, select, textarea {
            border: 1px solid #d97706 !important;
            border-radius: 4px !important;
            padding: 8px 12px !important;
            transition: all 0.2s ease !important;
          }

          input:focus, select:focus, textarea:focus {
            border-color: #b45309 !important;
            outline: none !important;
            box-shadow: 0 0 0 2px rgba(180, 83, 9, 0.2) !important;
          }

          /* Style labels */
          label {
            color: #78350f !important;
            font-weight: 500 !important;
          }
          
          /* Style buttons to match Stillapay branding */
          button, .button, [type="submit"], .pay-button,
          [class*="button"], [class*="Button"],
          [class*="btn"], [class*="Btn"],
          [class*="submit"], [class*="Submit"],
          [class*="pay"], [class*="Pay"] {
            background: #b45309 !important;
            border: none !important;
            color: white !important;
            border-radius: 6px !important;
            font-weight: bold !important;
            transition: background 0.3s !important;
            padding: 10px 16px !important;
          }
          
          button:hover, .button:hover, [type="submit"]:hover, .pay-button:hover,
          [class*="button"]:hover, [class*="Button"]:hover,
          [class*="btn"]:hover, [class*="Btn"]:hover,
          [class*="submit"]:hover, [class*="Submit"]:hover,
          [class*="pay"]:hover, [class*="Pay"]:hover {
            background: #92400e !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
          }

          /* Style headers */
          h1, h2, h3, h4, h5, h6,
          [class*="title"], [class*="Title"],
          [class*="heading"], [class*="Heading"],
          [class*="header"], [class*="Header"] {
            color: #78350f !important;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          }

          /* Style links */
          a, [class*="link"], [class*="Link"] {
            color: #d97706 !important;
            text-decoration: none !important;
            transition: color 0.2s ease !important;
          }

          a:hover, [class*="link"]:hover, [class*="Link"]:hover {
            color: #92400e !important;
            text-decoration: underline !important;
          }

          /* Add Stillapay branding */
          .payment-header::before,
          .checkout-header::before,
          [class*="header"]::before,
          [class*="Header"]::before {
            content: "Stillapay" !important;
            display: block !important;
            font-size: 1.5rem !important;
            font-weight: bold !important;
            color: #b45309 !important;
            margin-bottom: 0.5rem !important;
            text-align: center !important;
          }
        `
        if (!doc.getElementById("stillapay-override-styles")) {
          doc.head.appendChild(style)
        }
      } catch (e) {
        console.log("Error adding styles", e)
      }
    }

    // Apply to main document
    const applyToAllDocuments = () => {
      // Apply to main document
      hidePaystackBranding(document)

      // Apply to all iframes
      try {
        const iframes = document.querySelectorAll("iframe")
        iframes.forEach((iframe) => {
          try {
            if (iframe.contentDocument) {
              hidePaystackBranding(iframe.contentDocument)
            }
          } catch (e) {
            // Cross-origin iframe access will throw an error, which we can ignore
          }
        })
      } catch (e) {
        console.log("Error processing iframes", e)
      }
    }

    // Run immediately
    applyToAllDocuments()

    // Set up a MutationObserver to watch for DOM changes
    try {
      if (typeof MutationObserver !== "undefined") {
        // Disconnect any existing observer
        if (observerRef.current) {
          observerRef.current.disconnect()
        }

        // Create a new observer
        observerRef.current = new MutationObserver((mutations) => {
          applyToAllDocuments()
        })

        // Start observing
        observerRef.current.observe(document.documentElement, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true,
        })
      }
    } catch (e) {
      console.log("Error setting up MutationObserver", e)
    }

    // Also set an interval as a fallback
    const interval = setInterval(applyToAllDocuments, 200)

    // Set up event listeners for iframe loads
    const setupIframeListeners = () => {
      try {
        const iframes = document.querySelectorAll("iframe")
        iframes.forEach((iframe) => {
          iframe.addEventListener("load", () => {
            try {
              if (iframe.contentDocument) {
                hidePaystackBranding(iframe.contentDocument)
              }
            } catch (e) {
              // Cross-origin iframe access will throw an error, which we can ignore
            }
          })
        })
      } catch (e) {
        console.log("Error setting up iframe listeners", e)
      }
    }

    // Set up iframe listeners initially
    setupIframeListeners()

    // Set up interval to check for new iframes
    const iframeCheckInterval = setInterval(setupIframeListeners, 1000)

    // Clean up on component unmount
    return () => {
      clearInterval(interval)
      clearInterval(iframeCheckInterval)
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // This component doesn't render anything visible
  return null
}
