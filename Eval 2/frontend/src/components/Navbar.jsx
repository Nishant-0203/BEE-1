import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "./SearchBar/SearchBar";
import ProfileInfo from "./Cards/ProfileInfo";
import { signInSuccess, signoutFailure, signoutStart } from "../redux/user/userSlice";

export default function Navbar({ userInfo, onSearchNote, handleClearSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onLogout = async () => {
    try {
      dispatch(signoutStart());
      const res = await axios.get("http://localhost:3000/api/auth/signout", { withCredentials: true });

      if (res.data.success === false) {
        dispatch(signoutFailure(res.data.message));
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      dispatch(signInSuccess());
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      dispatch(signoutFailure(error.message));
    }
  };

  return (
    <motion.header
      className={cn(
        "flex justify-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-16 items-center justify-between w-3/4">
        <Link to="/" className="font-bold text-xl">NoteMaster</Link>

        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
              <span className="font-bold text-xl">GoodNotes</span>
            </Link>
            <nav className="mt-8 flex flex-col space-y-3">
              <NavItem to="#features" setOpen={setOpen}>Features</NavItem>
              <NavItem to="#testimonials" setOpen={setOpen}>Testimonials</NavItem>
              <NavItem to="#pricing" setOpen={setOpen}>Pricing</NavItem>
              <NavItem to="#faq" setOpen={setOpen}>FAQ</NavItem>
              <NavItem to="#" setOpen={setOpen}>Sign In</NavItem>
              <Link to="#" onClick={() => setOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}

function NavItem({ to, setOpen, children }) {
  return (
    <Link to={to} className="text-foreground/60 transition-colors hover:text-foreground" onClick={() => setOpen(false)}>
      {children}
    </Link>
  );
}
