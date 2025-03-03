import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader() {
  return (
    <motion.header
      className={cn(
        "flex justify-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-16 items-center justify-center w-3/4">
        <MainNav />
        <MobileNav />
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Log In
          </Link>
          <Button asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

function MainNav() {
  return (
    <div className="hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold text-xl">NoteMaster</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <NavLink to="/why-notesmaster">
          About
        </NavLink>
        <NavLink to="#testimonials">
          Testimonials
        </NavLink>
        <NavLink to="#pricing">
          Pricing
        </NavLink>
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>
      </nav>
    </div>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <span className="font-bold text-xl">NoteMaster</span>
        </Link>
        <nav className="mt-8 flex flex-col space-y-3">
          <NavItem to="#features" setOpen={setOpen}>
            Features
          </NavItem>
          <NavItem to="#testimonials" setOpen={setOpen}>
            Testimonials
          </NavItem>
          <NavItem to="#pricing" setOpen={setOpen}>
            Pricing
          </NavItem>
          <NavItem to="#faq" setOpen={setOpen}>
            FAQ
          </NavItem>
          <NavItem to="#" setOpen={setOpen}>
            Sign In
          </NavItem>
          <Link to="#" onClick={() => setOpen(false)}>
            <Button className="w-full">Get Started</Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

// Reusable NavLink component for styling
function NavLink({ to, currentPath, children }) {
  return (
    <Link
      to={to}
      className={cn(
        "transition-colors hover:text-foreground/80",
        currentPath === to ? "text-foreground" : "text-foreground/60"
      )}
    >
      {children}
    </Link>
  );
}

// Reusable NavItem for Mobile Navigation
function NavItem({ to, setOpen, children }) {
  return (
    <Link
      to={to}
      className="text-foreground/60 transition-colors hover:text-foreground"
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  );
}
