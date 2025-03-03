import { useRef } from "react";
import { useInView } from "framer-motion";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials = [
    {
      quote:
        "NoteMaster has completely transformed how I organize my thoughts and ideas. The interface is intuitive and the features are exactly what I need.",
      author: "Sarah Johnson",
      role: "Product Manager",
      avatar: "/placeholder.svg?height=80&width=80&text=SJ",
    },
    {
      quote:
        "As a student, I needed something reliable to keep track of my lectures and research. NoteMaster exceeded all my expectations!",
      author: "Michael Chen",
      role: "Graduate Student",
      avatar: "/placeholder.svg?height=80&width=80&text=MC",
    },
    {
      quote:
        "The cross-platform sync is flawless. I can start a note on my phone and finish it on my laptop without any issues.",
      author: "Emily Rodriguez",
      role: "Content Creator",
      avatar: "/placeholder.svg?height=80&width=80&text=ER",
    },
    {
      quote:
        "I've tried many note-taking apps, but NoteMaster stands out with its perfect balance of simplicity and powerful features.",
      author: "David Kim",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=80&width=80&text=DK",
    },
    {
      quote: "The search functionality is incredible. I can find any note within seconds, even from years ago.",
      author: "Lisa Thompson",
      role: "Researcher",
      avatar: "/placeholder.svg?height=80&width=80&text=LT",
    },
  ];

  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="w-full">
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Loved by thousands of users</h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Don't just take our word for it. Here's what our users have to say.
          </p>
        </div>
        <div
          ref={ref}
          className="mt-16 w-3/4 mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="flex flex-col justify-between p-6">
                      <div className="mb-4 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="mb-6 text-lg">{testimonial.quote}</p>
                      <div className="flex items-center">
                        <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.author}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.author}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative inset-0 translate-y-0" />
              <CarouselNext className="relative inset-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
