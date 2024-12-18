import {stripe} from '@/lib/stripe'
import {HandleCheckoutSessionCompleted} from '@/lib/stripe/HandleCheckoutSessionCompleted'
import {headers} from 'next/headers'
import {NextResponse} from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('stripe-signature') as string

  try {
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)

    console.log('event', event.type)

    switch (event.type) {
      case 'checkout.session.completed':
        HandleCheckoutSessionCompleted(event.data.object)
        break
      default:
        break
    }

    return new NextResponse(null, {status: 200})
  } catch (error) {
    console.error('stripe webhook error', error)
    return new NextResponse('webhook error', {status: 400})
  }
}
