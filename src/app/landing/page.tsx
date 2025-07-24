"use client";

import React, { useLayoutEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Check, Clock, Gamepad2, Smartphone, Monitor, ShieldCheck, HeadphonesIcon } from "lucide-react";
import Link from "next/link";
import ThreeJSSlotMachine from "@/components/game-runtime/threejs-slot-machine";
import { ModernButton } from "@/components/ui/modern-button";
import { ModernCard } from "@/components/ui/modern-card";
import CircularText from "@/components/ui/CircularText";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Design System Constants
const designSystem = {
  colors: {
    primary: "#FFD700", // Gold
    secondary: "#8B5CF6", // Purple
    accent: "#FF006E", // Hot Pink
    background: "#000000",
    surface: "#111111",
    surfaceLight: "#1A1A1A",
    text: "#FFFFFF",
    textSecondary: "#B3B3B3",
    textMuted: "#666666",
  },
  typography: {
    hero: "text-8xl md:text-9xl font-black uppercase tracking-tighter leading-none",
    heading: "text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none",
    subheading: "text-3xl md:text-4xl font-bold uppercase tracking-tight",
    body: "text-xl md:text-2xl font-medium",
    caption: "text-lg font-medium",
  },
  spacing: {
    section: "py-32 md:py-48",
    container: "container mx-auto px-6 md:px-12",
  }
};

// Modern Navigation Component
const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/20' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 md:px-12 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link href="/" className="text-4xl font-black text-white uppercase tracking-tighter">
              SLOT<span className="text-yellow-400">TY</span>
            </Link>
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="#features" className="text-xl font-bold text-white hover:text-yellow-400 transition-colors">FEATURES</Link>
              <Link href="#how-it-works" className="text-xl font-bold text-white hover:text-yellow-400 transition-colors">HOW IT WORKS</Link>
              <Link href="#pricing" className="text-xl font-bold text-white hover:text-yellow-400 transition-colors">PRICING</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 text-lg font-bold">
              SIGN IN
            </Button>
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-300 text-lg font-bold">
              START BUILDING
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

// Hero Section
const HeroSection = memo(() => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".hero-content", { y: 100, opacity: 0, duration: 1, ease: "power3.out", delay: 0.5 });

      if (heroRef.current && heroContentRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "10% top",
            end: "50% top",
            scrub: 0.2,
            pin: true,
            pinSpacing: false,
          }
        });

        tl.to(heroContentRef.current, {
          y: -50,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "none",
        }, 0);
      }
    });

    return () => context.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-purple-500/10"></div>

      <div ref={heroContentRef} className="hero-content relative z-10 text-center ">
        <div className="mb-8">
          <ThreeJSSlotMachine />
        </div>

        <h1 className={designSystem.typography.hero + " text-white mb-6"}>
          BUILD GAMES<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">FAST</span>
        </h1>

        <p className={designSystem.typography.body + " text-gray-300 max-w-4xl mx-auto mb-12"}>
          Create, customize, and launch profitable HTML5 slot games in minutes.
          No code required—just pure revenue potential for your casino.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-300 text-2xl font-black px-12 py-6">
            START BUILDING NOW
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-2xl font-black px-12 py-6">
            WATCH DEMO
          </Button>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

// Features Section
const FeaturesSection = memo(() => {
  const features = [
    {
      title: "NO MORE WAITING",
      description: "Create professional slot games without writing a single line of code. Our intuitive drag-and-drop interface makes game creation fast and easy.",
      image: "/images/slot-game-background-image.png",
      align: "left"
    },
    {
      title: "DEEP CUSTOMIZATION",
      description: "Control every aspect of your game—symbols, sounds, payouts, branding, and more. Make each game uniquely yours.",
      image: "/images/slot-game-background-image.png",
      align: "right"
    },
    {
      title: "INSTANT RESULTS",
      description: "Publish your game with one click and embed it directly into your casino. Start generating revenue immediately.",
      image: "/images/slot-game-background-image.png",
      align: "left"
    }
  ];

  return (
    <section id="features" className="py-48 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className={designSystem.spacing.container}>
        <div className="space-y-32">
          {features.map((feature, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-16 ${feature.align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="relative">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={800}
                    height={600}
                    className="rounded-2xl border border-white/10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                </div>
              </div>

              <div className="flex-1">
                <h2 className={designSystem.typography.heading + " text-white mb-6"}>
                  {feature.title}
                </h2>
                <p className={designSystem.typography.body + " text-gray-300 mb-8"}>
                  {feature.description}
                </p>
                <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-300 text-xl font-bold">
                  LEARN MORE
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

// Stats Section
const StatsSection = memo(() => {
  const stats = [
    { value: "10K+", label: "GAMES CREATED", color: "text-yellow-400" },
    { value: "500K+", label: "ACTIVE PLAYERS", color: "text-purple-400" },
    { value: "$2M+", label: "REVENUE GENERATED", color: "text-green-400" },
    { value: "99.9%", label: "UPTIME GUARANTEE", color: "text-blue-400" }
  ];

  return (
    <section className="py-32 bg-gradient-to-r from-yellow-400/10 via-transparent to-purple-500/10">
      <div className={designSystem.spacing.container}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-6xl lg:text-7xl font-black ${stat.color} mb-4`}>
                {stat.value}
              </div>
              <div className="text-lg font-bold text-white tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

StatsSection.displayName = 'StatsSection';

// How It Works Section
const HowItWorksSection = memo(() => {
  const steps = [
    {
      number: "01",
      title: "DESIGN YOUR GAME",
      description: "Use our intuitive drag-and-drop builder to upload assets, set probabilities, configure payouts, and customize every aspect of your slot game. No coding required."
    },
    {
      number: "02",
      title: "PREVIEW & TEST",
      description: "Instantly preview your game on desktop and mobile devices. Test gameplay mechanics, verify payouts, and ensure everything works perfectly before launch."
    },
    {
      number: "03",
      title: "LAUNCH & EARN",
      description: "Publish your game with one click and embed it directly into your casino. Start generating revenue immediately with our production-ready API."
    }
  ];

  return (
    <section id="how-it-works" className="py-48 bg-gradient-to-b from-black to-gray-900">
      <div className={designSystem.spacing.container}>
        <div className="text-center mb-24">
          <h2 className={designSystem.typography.heading + " text-white mb-6"}>
            CREATE YOUR GAME IN 3 STEPS
          </h2>
          <p className={designSystem.typography.body + " text-gray-300 max-w-3xl mx-auto"}>
            From concept to casino-ready in minutes. Our streamlined process makes game creation effortless.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-black text-black">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className={designSystem.typography.subheading + " text-white mb-4"}>
                    {step.title}
                  </h3>
                  <p className={designSystem.typography.body + " text-gray-300"}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

HowItWorksSection.displayName = 'HowItWorksSection';

// Advanced Features Section
const AdvancedFeaturesSection = memo(() => {
  const features = [
    {
      icon: <Gamepad2 size={48} className="text-yellow-400" />,
      title: "PROVABLY FAIR RNG",
      description: "Cryptographically secure random number generation with provable fairness. Every spin is verifiable and transparent."
    },
    {
      icon: <Smartphone size={48} className="text-purple-400" />,
      title: "MOBILE-FIRST DESIGN",
      description: "Built with mobile-first responsive design. Players enjoy seamless gameplay on any device, anywhere."
    },
    {
      icon: <Monitor size={48} className="text-green-400" />,
      title: "CROSS-PLATFORM",
      description: "Works flawlessly on desktop, tablet, and mobile. No downloads required - instant play in any browser."
    },
    {
      icon: <ShieldCheck size={48} className="text-blue-400" />,
      title: "ENTERPRISE SECURITY",
      description: "Bank-grade security with SSL encryption, secure asset storage, and comprehensive data protection."
    },
    {
      icon: <Clock size={48} className="text-red-400" />,
      title: "LIGHTNING FAST",
      description: "Optimized for speed with CDN delivery and efficient asset compression. Games load in under 2 seconds."
    },
    {
      icon: <HeadphonesIcon size={48} className="text-pink-400" />,
      title: "24/7 SUPPORT",
      description: "Round-the-clock support from our expert team. Get help when you need it, no matter your timezone."
    }
  ];

  return (
    <section className="py-48 bg-gradient-to-b from-gray-900 to-black">
      <div className={designSystem.spacing.container}>
        <div className="text-center mb-24">
          <h2 className={designSystem.typography.heading + " text-white mb-6"}>
            ADVANCED FEATURES
          </h2>
          <p className={designSystem.typography.body + " text-gray-300 max-w-3xl mx-auto"}>
            Everything you need to run a successful casino operation at scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ModernCard
              key={index}
              className="p-8 bg-gray-900/50 border-white/10 hover:bg-gray-900/70 transition-all duration-300"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className={designSystem.typography.subheading + " text-white mb-4"}>
                {feature.title}
              </h3>
              <p className={designSystem.typography.caption + " text-gray-300"}>
                {feature.description}
              </p>
            </ModernCard>
          ))}
        </div>
      </div>
    </section>
  );
});

AdvancedFeaturesSection.displayName = 'AdvancedFeaturesSection';

// Pricing Section
const PricingSection = memo(() => {
  const plans = [
    {
      name: "STARTER",
      price: "$99",
      period: "MONTH",
      description: "Perfect for new casinos starting out",
      features: [
        "Up to 5 games",
        "Basic customization",
        "Standard support",
        "Mobile responsive",
        "Basic analytics"
      ],
      cta: "START FREE TRIAL",
      popular: false
    },
    {
      name: "PROFESSIONAL",
      price: "$299",
      period: "MONTH",
      description: "Ideal for growing casino businesses",
      features: [
        "Unlimited games",
        "Advanced customization",
        "Priority support",
        "A/B testing",
        "Advanced analytics",
        "Custom branding",
        "Multi-language support"
      ],
      cta: "START FREE TRIAL",
      popular: true
    },
    {
      name: "ENTERPRISE",
      price: "CUSTOM",
      period: "MONTH",
      description: "For large-scale casino operations",
      features: [
        "Everything in Professional",
        "White-label solution",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "On-premise deployment",
        "Custom development"
      ],
      cta: "CONTACT SALES",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-48 bg-gradient-to-b from-black to-gray-900">
      <div className={designSystem.spacing.container}>
        <div className="text-center mb-24">
          <h2 className={designSystem.typography.heading + " text-white mb-6"}>
            SIMPLE, TRANSPARENT PRICING
          </h2>
          <p className={designSystem.typography.body + " text-gray-300 max-w-3xl mx-auto"}>
            Choose the plan that fits your casino&apos;s needs. Scale as you grow.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <ModernCard
              key={index}
              className={cn(
                "relative p-8 bg-gray-900/50 border-white/10 flex flex-col justify-between",
                plan.popular && "border-yellow-400/50 bg-yellow-400/5"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-purple-500 text-black px-6 py-2 rounded-full text-lg font-black text-nowrap">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={designSystem.typography.subheading + " text-white mb-4"}>
                  {plan.name}
                </h3>
                <p className={designSystem.typography.caption + " text-gray-400 mb-6"}>
                  {plan.description}
                </p>
                <div className="text-5xl lg:text-4xl font-black text-white mb-2 flex flex-row items-end gap-2">
                  {plan.price}
                  <span className="text-2xl text-gray-400">/ {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-lg text-gray-300">
                    <Check className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <ModernButton
                variant={plan.popular ? "primary" : "secondary"}
                className="w-full text-xl font-bold py-4"
              >
                {plan.cta}
              </ModernButton>
            </ModernCard>
          ))}
        </div>
      </div>
    </section>
  );
});

PricingSection.displayName = 'PricingSection';

// FAQ Section
const FAQSection = memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What types of games can I create?",
      answer: "You can create HTML5 slot games with customizable symbols, sounds, payouts, and more. Our platform supports up to 10 rows and 10 columns with up to 20 different slot items per game."
    },
    {
      question: "Do I need coding experience?",
      answer: "No coding experience required! Our intuitive drag-and-drop builder makes game creation fast and easy. Simply upload assets, set probabilities, and configure payouts."
    },
    {
      question: "How do I integrate games into my casino?",
      answer: "Once you publish a game, you'll receive an iframe URL that you can embed directly into your casino website. Our API handles all game logic and player sessions automatically."
    },
    {
      question: "What support do you offer?",
      answer: "We provide email support for all plans, priority support for Pro and Enterprise plans, and dedicated account management for Enterprise customers."
    }
  ];

  return (
    <section className="py-48 bg-gradient-to-b from-gray-900 to-black">
      <div className={designSystem.spacing.container + " max-w-5xl"}>
        <div className="text-center mb-24">
          <h2 className={designSystem.typography.heading + " text-white mb-6"}>
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className={designSystem.typography.body + " text-gray-300"}>
            Everything you need to know about building games with Slotty
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-8 text-left hover:bg-gray-900/70 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className={designSystem.typography.subheading + " text-white"}>
                  {faq.question}
                </h3>
                <ChevronDown className={`w-8 h-8 text-yellow-400 transform transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
              </button>
              {openIndex === index && (
                <div className="p-8 pt-0">
                  <p className={designSystem.typography.body + " text-gray-300"}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FAQSection.displayName = 'FAQSection';

// Footer
const Footer = memo(() => {
  return (
    <footer className="py-24 bg-black border-t border-white/20">
      <div className={designSystem.spacing.container}>
        <div className="grid lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">
              SLOT<span className="text-yellow-400">TY</span>
            </h3>
            <p className="text-gray-400 text-lg">
              Build profitable slot games in minutes. No code required.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-6">PRODUCT</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">API Docs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-6">SUPPORT</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Status</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-6">LEGAL</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-lg">
            © 2025 Slotty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

// Main Landing Page Component
const LandingPage = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="bg-black text-white font-sans overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <AdvancedFeaturesSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;