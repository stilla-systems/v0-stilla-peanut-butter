import { type NextRequest, NextResponse } from "next/server"

// This would normally be stored in an environment variable
const PAYSTACK_SECRET_KEY = "sk_live_d7e7ae498908028735161403df5db3229be989ca"
const PAYSTACK_API_URL = "https://api.paystack.co/transaction/initialize"
const CALLBACK_URL = "https://stillapeanutbutter.com/paystack/callback/v0"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { email, amount } = body

    // Validate required fields
    if (!email || !amount) {
      return NextResponse.json(
        {
          status: false,
          message: "Email and amount are required",
        },
        { status: 400 },
      )
    }

    // Initialize payment with Paystack
    const response = await fetch(PAYSTACK_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount, // Amount should be in the smallest currency unit (kobo/pesewas)
        callback_url: CALLBACK_URL,
      }),
    })

    // Parse the Paystack response
    const data = await response.json()

    // If the request was successful, return the authorization URL
    if (data.status) {
      return NextResponse.json({
        status: true,
        message: "Payment initialized",
        data: {
          authorization_url: data.data.authorization_url,
          access_code: data.data.access_code,
          reference: data.data.reference,
        },
      })
    } else {
      // If there was an error from Paystack
      return NextResponse.json(
        {
          status: false,
          message: data.message || "Payment initialization failed",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error initializing payment:", error)
    return NextResponse.json(
      {
        status: false,
        message: "An error occurred while initializing payment",
      },
      { status: 500 },
    )
  }
}
