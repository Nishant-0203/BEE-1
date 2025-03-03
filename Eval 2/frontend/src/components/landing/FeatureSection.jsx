import { useRef } from "react"
import { useInView } from "framer-motion"
import { Zap, Layers, Share2, Lock, Smartphone, Search, Clock, Cloud } from "lucide-react"

export function FeatureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Lightning Fast",
      description: "Take notes instantly with our quick capture feature. No lag, no waiting.",
    },
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: "Organize Effortlessly",
      description: "Create notebooks, tags, and folders to keep your notes perfectly organized.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-primary" />,
      title: "Seamless Sharing",
      description: "Collaborate with teammates by sharing notes and notebooks with customizable permissions.",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Secure by Design",
      description: "End-to-end encryption ensures your notes remain private and secure.",
    },
    {
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      title: "Cross-Platform",
      description: "Access your notes from any device with our web, desktop, and mobile apps.",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Powerful Search",
      description: "Find any note instantly with our advanced search capabilities.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Automatic Backups",
      description: "Never lose your work with automatic backups and version history.",
    },
    {
      icon: <Cloud className="h-10 w-10 text-primary" />,
      title: "Cloud Sync",
      description: "Your notes are automatically synced across all your devices in real-time.",
    },
  ]

  return (
    <section id="features" className="bg-muted/50 py-24 sm:py-32">
      <div className="">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful features for powerful notes
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Everything you need to capture, organize, and access your notes from anywhere.
          </p>
        </div>
        <div ref={ref} className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`,
              }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

