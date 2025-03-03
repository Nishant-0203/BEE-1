import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button"; // Adjust path as per your structure

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 w-3/4 mx-auto">
        {/* Left Section */}
        <motion.div
          className="flex flex-col justify-center space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            Introducing NoteMaster
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Capture ideas, <span className="text-primary">organize thoughts</span>
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            The all-in-one note-taking app that helps you capture ideas, organize your thoughts, and boost your
            productivity.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg">
              <Link to="#" className="flex items-center gap-1">
                Get started for free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Right Section (Image) */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative h-[350px] w-full overflow-hidden rounded-xl border bg-background p-2 shadow-xl sm:h-[400px] lg:h-[500px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full rounded-lg object-fit">
              <source src="homepage-hero.mp4" type="video/mp4" />
              </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
