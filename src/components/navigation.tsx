'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/auth/logout-button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

export function Navigation() {
  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname === '/auth') {
    return null;
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
      <div className="container mx-auto px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-4xl font-bold text-foreground">
              <span className="text-foreground font-black leading-none uppercase tracking-tighter">Slotty</span>
            </Link>
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-8 text-2xl font-base leading-none tracking-tighter ml-4">
                <Link href="/games" className={`text-foreground ${pathname === '/games' ? 'font-black' : ''}`}>My Games</Link>
                <Link href="/analytics" className={`text-foreground ${pathname === '/analytics' ? 'font-black' : ''}`}>Analytics</Link>
                <Link href="/builder" className={`text-foreground ${pathname === '/builder' ? 'font-black' : ''}`}>Create Game</Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-2xl font-bold tracking-tighter text-foreground">
                  {user?.email}
                </span>
                <LogoutButton />
              </>
            ) : (
              <Link href="/auth">
                <Button variant="landingPrimary" size="landingPrimary" className="text-2xl font-bold tracking-tighter">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}