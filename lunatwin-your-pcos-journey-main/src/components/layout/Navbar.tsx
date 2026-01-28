import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTwin } from '@/contexts/TwinContext';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, twin } = useTwin();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/demo', label: 'Demo' },
    ...(isAuthenticated && twin ? [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/simulate', label: 'Simulate' },
      { path: '/chat', label: 'Chat' },
    ] : []),
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow duration-300">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Luna<span className="text-gradient-primary">Twin</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="soft" size="sm">
                  My Twin
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm">
                  Get Started
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 glass-card rounded-2xl p-4"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border">
                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="soft" className="w-full">
                      My Twin
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="default" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
