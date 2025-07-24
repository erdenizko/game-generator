import Stripe from 'stripe';
import prisma from './database';
import { Subscription } from './types';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export class SubscriptionService {
  // Create Stripe checkout session for subscription
  static async createCheckoutSession(
    userId: string,
    userEmail: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string,
    stripeCustomerId?: string
  ): Promise<{ sessionId: string; url: string | null }> {
    let customerId = stripeCustomerId;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          userId,
        },
      });

      customerId = customer.id;

      // Update user with Stripe customer ID
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
      },
      subscription_data: {
        metadata: {
          userId,
        },
      },
    });

    return {
      sessionId: session.id,
      url: session.url,
    };
  }

  // Get user's current subscription
  static async getUserSubscription(userId: string): Promise<Subscription | null> {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!subscription) {
      return null;
    }

    return {
      id: subscription.id,
      userId: subscription.userId,
      plan: subscription.plan,
      status: subscription.status as 'active' | 'inactive' | 'cancelled' | 'past_due',
      stripeSubscriptionId: subscription.stripeSubscriptionId || undefined,
      renewAt: subscription.renewAt || undefined,
      createdAt: subscription.createdAt,
    };
  }

  // Check if user has active subscription
  static async hasActiveSubscription(userId: string): Promise<boolean> {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: 'active',
      },
    });

    if (!subscription) {
      return false;
    }

    // Check if subscription is expired
    if (subscription.renewAt && subscription.renewAt < new Date()) {
      return false;
    }

    return true;
  }

  // Create or update subscription from Stripe webhook
  static async upsertSubscriptionFromStripe(
    stripeSubscription: Stripe.Subscription
  ): Promise<void> {
    const userId = stripeSubscription.metadata.userId;
    
    if (!userId) {
      throw new Error('No userId found in subscription metadata');
    }

    // Get price information to determine plan
    const priceId = stripeSubscription.items.data[0]?.price.id;
    let plan = 'basic'; // default plan

    // Map price IDs to plan names
    const planMapping: Record<string, string> = {
      'price_basic_monthly': 'basic',
      'price_pro_monthly': 'pro',
      'price_enterprise_monthly': 'enterprise',
      // Add more mappings as needed
    };

    if (priceId && planMapping[priceId]) {
      plan = planMapping[priceId];
    }

    // Calculate renewal date
    const renewAt = new Date((stripeSubscription as Stripe.Subscription & { current_period_end: number }).current_period_end * 1000);

    // Check if subscription exists
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        stripeSubscriptionId: stripeSubscription.id,
      },
    });

    if (existingSubscription) {
      // Update existing subscription
      await prisma.subscription.update({
        where: {
          id: existingSubscription.id,
        },
        data: {
          status: stripeSubscription.status,
          plan,
          renewAt,
        },
      });
    } else {
      // Create new subscription
      await prisma.subscription.create({
        data: {
          userId,
          stripeSubscriptionId: stripeSubscription.id,
          status: stripeSubscription.status,
          plan,
          renewAt,
        },
      });
    }
  }

  // Cancel subscription
  static async cancelSubscription(userId: string): Promise<void> {
    const subscription = await this.getUserSubscription(userId);
    
    if (!subscription || !subscription.stripeSubscriptionId) {
      throw new Error('No active subscription found');
    }

    // Cancel subscription in Stripe
    await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);

    // Update local record
    await prisma.subscription.updateMany({
      where: {
        userId,
        stripeSubscriptionId: subscription.stripeSubscriptionId,
      },
      data: {
        status: 'cancelled',
      },
    });
  }

  // Update subscription status from Stripe webhook
  static async updateSubscriptionStatus(
    stripeSubscriptionId: string,
    status: string
  ): Promise<void> {
    await prisma.subscription.updateMany({
      where: {
        stripeSubscriptionId,
      },
      data: {
        status,
      },
    });
  }

  // Get subscription plans (this would typically come from a config or database)
  static getAvailablePlans(): Array<{
    id: string;
    name: string;
    description: string;
    priceId: string;
    price: number;
    currency: string;
    interval: string;
    features: string[];
  }> {
    return [
      {
        id: 'basic',
        name: 'Basic Plan',
        description: 'Perfect for getting started',
        priceId: 'price_basic_monthly',
        price: 29,
        currency: 'usd',
        interval: 'month',
        features: [
          'Up to 5 games',
          'Basic analytics',
          'Email support',
          'Standard templates',
        ],
      },
      {
        id: 'pro',
        name: 'Pro Plan',
        description: 'For growing businesses',
        priceId: 'price_pro_monthly',
        price: 79,
        currency: 'usd',
        interval: 'month',
        features: [
          'Up to 25 games',
          'Advanced analytics',
          'Priority support',
          'Custom branding',
          'API access',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise Plan',
        description: 'For large organizations',
        priceId: 'price_enterprise_monthly',
        price: 199,
        currency: 'usd',
        interval: 'month',
        features: [
          'Unlimited games',
          'Real-time analytics',
          '24/7 phone support',
          'White-label solution',
          'Custom integrations',
          'Dedicated account manager',
        ],
      },
    ];
  }

  // Get Stripe customer portal URL
  static async createCustomerPortalSession(
    userId: string,
    returnUrl: string
  ): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.stripeCustomerId) {
      throw new Error('No Stripe customer found for user');
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: returnUrl,
    });

    return session.url;
  }

  // Validate webhook signature
  static validateWebhookSignature(
    payload: string,
    signature: string,
    secret: string
  ): Stripe.Event {
    return stripe.webhooks.constructEvent(payload, signature, secret);
  }

  // Get subscription usage/limits (placeholder for future implementation)
  static async getSubscriptionUsage(userId: string): Promise<{
    gamesCreated: number;
    gamesLimit: number;
    plan: string;
  }> {
    const subscription = await this.getUserSubscription(userId);
    const gamesCount = await prisma.game.count({
      where: { userId },
    });

    // Define limits based on plan
    const planLimits: Record<string, number> = {
      basic: 5,
      pro: 25,
      enterprise: -1, // unlimited
    };

    const plan = subscription?.plan || 'basic';
    const limit = planLimits[plan] || 5;

    return {
      gamesCreated: gamesCount,
      gamesLimit: limit,
      plan,
    };
  }

  // Check if user can create more games
  static async canCreateGame(userId: string): Promise<boolean> {
    const usage = await this.getSubscriptionUsage(userId);
    
    // Unlimited games for enterprise
    if (usage.gamesLimit === -1) {
      return true;
    }

    return usage.gamesCreated < usage.gamesLimit;
  }
}