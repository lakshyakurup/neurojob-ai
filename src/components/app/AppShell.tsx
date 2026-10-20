import Navbar from '../ui/Navbar';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="app-shell"><Sidebar /><div className="workspace"><Navbar />{children}<MobileNav /></div></div>;
}