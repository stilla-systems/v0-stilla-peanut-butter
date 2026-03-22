# Setting Up Paystack Webhooks

This document explains how to set up webhooks in your Paystack dashboard to work with the Stilla Trading website.

## What are Webhooks?

Webhooks allow Paystack to send real-time notifications to your application when events occur, such as successful payments, failed transactions, or refunds.

## Setting Up Webhooks in Paystack Dashboard

1. Log in to your Paystack dashboard at https://dashboard.paystack.com/
2. Navigate to Settings > API Keys & Webhooks
3. Under the "Webhooks" section, click "Add New Webhook"
4. Enter your webhook URL: `https://yourdomain.com/api/webhook`
5. Save your webhook endpoint

## Events to Subscribe To

For the Stilla Trading website, you should subscribe to the following events:

- `charge.success`: Triggered when a payment is successful
- `transfer.success`: Triggered when a transfer is successful (if you're using transfers)

## Testing Your Webhook

Paystack provides a way to test your webhook:

1. In the Webhooks section of your dashboard, find your webhook endpoint
2. Click on "Send Test Event"
3. Select an event type (e.g., `charge.success`)
4. Click "Send Test Event"

## Webhook Security

The webhook endpoint verifies the signature of incoming requests using your Paystack secret key. This ensures that only Paystack can send valid webhook events to your application.

## Troubleshooting

If you're having issues with webhooks:

1. Check that your webhook URL is publicly accessible
2. Verify that your secret key is correct
3. Check the server logs for any errors
4. Ensure your server is responding with a 200 status code

For more information, refer to the [Paystack Webhooks Documentation](https://paystack.com/docs/payments/webhooks/).
