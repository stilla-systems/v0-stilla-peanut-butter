import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// This would normally be stored in an environment variable
const PAYSTACK_SECRET_KEY = "sk_live_d7e7ae498908028735161403df5db3229be989ca"

export async function POST(request: NextRequest) {
  try {
    // Get the raw request body
    const body = await request.text()

    // Get the signature from the headers
    const signature = request.headers.get("x-paystack-signature")

    // Verify the signature
    const computedSignature = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY).update(body).digest("hex")

    // If signatures don't match, return 400
    if (computedSignature !== signature) {
      return new NextResponse("Invalid signature", { status: 400 })
    }

    // Parse the event data
    const event = JSON.parse(body)

    // Process the webhook event
    if (event.event === "charge.success") {
      // Retrieve transaction reference
      const reference = event.data.reference

      // Here you would update your database
      // For example:
      // - Mark order as paid
      // - Update inventory
      // - Send confirmation email
      console.log(`Payment successful for reference: ${reference}`)

      // You could also store this in a database
      // await db.transaction.update({ where: { reference }, data: { status: 'paid' } })
    }

    // Return 200 to acknowledge receipt
    return new NextResponse("Webhook received", { status: 200 })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return new NextResponse("Error processing webhook", { status: 500 })
  }
}

// Disable body parsing since we need the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}
