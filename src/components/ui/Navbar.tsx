import { Bell } from 'lucide-react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Navbar() {
  return (
    <header className="topbar">
      <p className="crumb">
        <strong>Workspace</strong> <span>/</span> Overview
      </p>
      <div className="top-actions">
        <button className="icon-button" aria-label="Notifications">
          <Bell size={16} />
        </button>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="secondary-button">Sign in</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="primary-button">Create account</button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
