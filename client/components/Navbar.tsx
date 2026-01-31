import React from 'react';
import Link from 'next/link';

import { Button } from './ui/button';

type NavbarProps = {
  isLoggedIn?: boolean;
  userName?: string;
};

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn = true,
  userName = 'Pratik',
}) => {
  return (
    <header className="sticky top-1 z-100 mx-auto w-xl px-0 py-4">
      <nav>
        {/* Glassy rounded container */}
        <div className="flex items-center justify-between gap-6 rounded-full border border-white/10 bg-white px-5 py-2 shadow-md backdrop-blur-md">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="text-neutral font-semibold">
              TaskMan
            </Link>
          </div>

          {/* Center: Links */}
          {/* <div className="flex flex-1 items-center justify-center">
            <ul className="text-neutral/90 hidden items-center gap-6 text-sm sm:flex">
              <li>
                <a href="#" className="hover:underline">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Technology
                </a>
              </li>
            </ul>
          </div> */}

          {/* Right: auth actions */}
          <div className="flex items-center gap-3">
            {/* show Register when not logged in */}
            {!isLoggedIn && (
              <div className="flex items-center gap-3">
                <Link
                  href="/register"
                  className="text-neutral/90 text-sm hover:underline"
                >
                  Register
                </Link>
                <Link href="/login">
                  <Button asChild={false} size="sm" className="rounded-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* show username when logged in */}
            {isLoggedIn && (
              <div className="text-neutral/95 rounded-md bg-white/5 px-3 py-1 text-sm font-medium">
                {userName}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
