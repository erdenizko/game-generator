import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { ApiResponse } from '@/lib/types';
import { SubscriptionService } from '@/lib/subscription';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('Missing Stripe signature');
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_SIGNATURE',
            message: 'Missing Stripe signature',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = SubscriptionService.validateWebhookSignature(body, signature, webhookSecret);
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_SIGNATURE',
            message: 'Invalid webhook signature',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    console.log('Received Stripe webhook event:', event.type);

    // Handle different event types
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json(
      {
        success: true,
        data: { received: true },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'WEBHOOK_ERROR',
          message: 'Failed to process webhook',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription): Promise<void> {
  try {
    await SubscriptionService.upsertSubscriptionFromStripe(subscription);
    console.log(`Subscription updated: ${subscription.id}`);
  } catch (error) {
    console.error('Error handling subscription update:', error);
    throw error;
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
  try {
    await SubscriptionService.updateSubscriptionStatus(subscription.id, 'cancelled');
    console.log(`Subscription cancelled: ${subscription.id}`);
  } catch (error) {
    console.error('Error handling subscription deletion:', error);
    throw error;
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
  try {
    const invoiceWithSub = invoice as Stripe.Invoice & { subscription?: string | { id: string } };
    const subscriptionId = typeof invoiceWithSub.subscription === 'string' 
      ? invoiceWithSub.subscription 
      : invoiceWithSub.subscription?.id;
      
    if (subscriptionId) {
      await SubscriptionService.updateSubscriptionStatus(
        subscriptionId, 
        'active'
      );
      console.log(`Payment succeeded for subscription: ${subscriptionId}`);
    }
  } catch (error) {
    console.error('Error handling payment success:', error);
    throw error;
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  try {
    const invoiceWithSub = invoice as Stripe.Invoice & { subscription?: string | { id: string } };
    const subscriptionId = typeof invoiceWithSub.subscription === 'string' 
      ? invoiceWithSub.subscription 
      : invoiceWithSub.subscription?.id;
      
    if (subscriptionId) {
      await SubscriptionService.updateSubscriptionStatus(
        subscriptionId, 
        'past_due'
      );
      console.log(`Payment failed for subscription: ${subscriptionId}`);
    }
  } catch (error) {
    console.error('Error handling payment failure:', error);
    throw error;
  }
}