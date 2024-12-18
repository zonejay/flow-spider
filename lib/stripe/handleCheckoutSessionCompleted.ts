import {getCreditsPack, PackId} from '@/types/billing'
import {writeFile} from 'fs'
import 'server-only'
import Stripe from 'stripe'
import prisma from '../prisma'

export async function HandleCheckoutSessionCompleted(event: Stripe.Checkout.Session) {
  if (!event.metadata) {
    throw new Error('missing metadata')
  }
  const {userId, packId} = event.metadata

  if (!userId) {
    throw new Error('missing user id')
  }

  if (!packId) {
    throw new Error('missing pack id')
  }

  const purchasedPack = getCreditsPack(packId as PackId)
  if (!purchasedPack) {
    throw new Error('purchased pack not found')
  }

  await prisma.userBalance.upsert({
    where: {
      userId
    },
    create: {
      userId,
      credits: purchasedPack.credits
    },
    update: {
      credits: {
        increment: purchasedPack.credits
      }
    }
  })
}
