'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        isActive
          ? 'bg-green-500 text-white'
          : 'text-beige-700 hover:bg-beige-100 hover:text-beige-900'
      )}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  return (
    <nav className="w-full bg-beige-50 border-b border-beige-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-light text-beige-900">
              Math Learning Game
            </h1>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/leaderboard">Leaderboard</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

