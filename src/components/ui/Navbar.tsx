import React from 'react';
import Link from 'next/link';
import { Bell, ChevronDown } from 'lucide-react';
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from '@clerk/nextjs';

export default function Navbar() {
  return (
    <header className="topbar">
      <p className="crumb"><strong>Workspace</strong> <span>/</span> Overview</p>
      <div className="top-actions">
        <button className="icon-button" aria-label="Notifications"><Bell size={16} /></button>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="secondary-button">Sign in</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="primary-button">Create account</button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
        <ChevronDown size={14} color="#50615b" />
      </div>
    </header>
  );
}
