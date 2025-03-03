import { useRef } from "react"
import { useInView } from "framer-motion"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const faqs = [
    {
      question: "Is there a free plan available?",
      answer:
        "Yes, we offer a free plan that includes up to 50 notes, basic formatting, and 1GB of storage. It's perfect for getting started with NoteMaster.",
    },
    {
      question: "Can I access my notes offline?",
      answer:
        "Yes, our desktop and mobile apps support offline access. Your notes will sync automatically when you're back online.",
    },
    {
      question: "How secure are my notes?",
      answer:
        "We use end-to-end encryption to ensure your notes remain private. Your data is encrypted both in transit and at rest, and only you have access to your encryption keys.",
    },
    {
      question: "Can I import notes from other apps?",
      answer:
        "Yes, NoteMaster supports importing notes from Evernote, OneNote, Google Keep, and plain text files. We also provide tools to help you migrate your data seamlessly.",
    },
    {
      question: "Is there a limit to note size?",
      answer:
        "Individual notes can be up to 25MB in size, including attachments. This is generous enough for most use cases, including embedding images and files.",
    },
    {
      question: "Do you offer educational discounts?",
      answer:
        "Yes, we offer a 50% discount for students and educators. Please contact our support team with your educational email address for verification.",
    },
  ]

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently asked questions</h2>
          <p className="mt-4 text-muted-foreground md:text-xl">Everything you need to know about NoteMaster</p>
        </div>
        <div
          ref={ref}
          className="mx-auto mt-16 max-w-3xl"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

