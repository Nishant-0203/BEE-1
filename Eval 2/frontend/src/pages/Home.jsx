import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/landing/HeroSection"
import { FeatureSection } from "@/components/landing/FeatureSection"
import { TestimonialSection } from "@/components/landing/TestimonialSection"
import { PricingSection } from "@/components/landing/PricingSection"
import { FaqSection } from "@/components/landing/FaqSection"
import { SiteHeader } from "@/components/landing/SiteHeader"
import { SiteFooter } from "@/components/landing/SiteFooter"



export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-3">
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
        <PricingSection />
        <FaqSection />
        <section className="py-24 sm:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Start taking better notes today
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join thousands of satisfied users who have transformed their note-taking experience.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="#" className="gap-1">
                  Get started for free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="#">Learn more</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
