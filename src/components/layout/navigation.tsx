'use client';

import { useAuth } from '@/contexts/auth-context';
import { LogoutButton } from '@/components/auth/logout-button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Gamepad2,
  BarChart3,
  Store,
  FileIcon,
  LayoutDashboard,
  User
} from 'lucide-react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function Navigation() {
  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/games/drafts', label: 'Drafts', icon: FileIcon },
    { href: '/games/published', label: 'Published', icon: Gamepad2 },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/marketplace', label: 'Marketplace', icon: Store },
  ];

  return (
    <nav className={`fixed top-2 left-0 right-0 z-50 transition-all duration-300 max-w-7xl mx-auto`}>
      <div className="flex items-center justify-center">
        {/* Desktop Navigation */}
        <div className="flex flex-row items-center space-x-2 bg-slate-50 border border-slate-400/20 rounded-full px-4 py-2 shadow-lg">
          <Link href="/" className="flex items-center">
            <Image src="/logo-white.svg" alt="Logo" width={941} height={216} className="h-5 w-auto mr-4" />
          </Link>
          <div className="flex flex-row items-center space-x-2">
            {isAuthenticated && navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-row gap-1 items-center px-3 py-2 rounded-full transition-all ${isActive
                    ? 'bg-slate-400/20 text-slate-900'
                    : 'text-slate-900 hover:bg-slate-400/10'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
          {/* User Avatar and User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="flex flex-row gap-1 items-center px-2 py-2 rounded-full transition-all border-2 border-slate-400/20">
                <User className="w-4 h-4" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <div className="text-sm text-slate-300">
                  {user?.email}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isAuthenticated && (
        <div className="md:hidden mt-4 pb-4 border-t border-slate-700/50">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-700/50">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}