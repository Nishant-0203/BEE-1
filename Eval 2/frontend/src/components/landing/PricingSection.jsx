import { useRef } from "react"
import { Link } from "react-router-dom"
import { useInView } from "framer-motion"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="pricing" className="bg-muted/50 py-24 sm:py-32">
      <div className="">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-muted-foreground md:text-xl">Choose the plan that's right for you</p>
        </div>
        <div
          ref={ref}
          className="mx-auto mt-16 max-w-5xl"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
          <Tabs defaultValue="monthly" className="mx-auto flex w-full flex-col items-center justify-center">
            <TabsList className="mb-8 grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annually">
                Annually{" "}
                <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">Save 20%</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="monthly" className="w-full">
              <div className="grid gap-8 md:grid-cols-3 w-full">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Free</CardTitle>
                    <CardDescription>Perfect for getting started</CardDescription>
                    <div className="mt-4 flex items-baseline text-5xl font-bold">
                      $0
                      <span className="ml-1 text-sm font-medium text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Up to 50 notes</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Basic formatting</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Mobile app access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>1 GB storage</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="#">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="flex flex-col border-primary">
                  <CardHeader>
                    <div className="mx-auto mb-4 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      Most Popular
                    </div>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>Perfect for individuals</CardDescription>
                    <div className="mt-4 flex items-baseline text-5xl font-bold">
                      $9.99
                      <span className="ml-1 text-sm font-medium text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Unlimited notes</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Advanced formatting</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Cross-platform sync</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>10 GB storage</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Priority support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="#">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Team</CardTitle>
                    <CardDescription>Perfect for small teams</CardDescription>
                    <div className="mt-4 flex items-baseline text-5xl font-bold">
                      $19.99
                      <span className="ml-1 text-sm font-medium text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Everything in Pro</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Team collaboration</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Admin controls</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>50 GB storage</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>24/7 support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="#">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="annually" className="w-full">
              <div className="grid gap-8 md:grid-cols-3">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Free</CardTitle>
                    <CardDescription>Perfect for getting started</CardDescription>
                    <div className="mt-4 flex items-baseline text-5xl font-bold">
                      $0
                      <span className="ml-1 text-sm font-medium text-muted-foreground">/year</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Up to 50 notes</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Basic formatting</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Mobile app access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>1 GB storage</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="#">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="flex flex-col border-primary">
                  <CardHeader>
                    <div className="mx-auto mb-4 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      Most Popular
                    </div>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>Perfect for individuals</CardDescription>
                    <div className="mt-4 flex items-baseline text-5xl font-bold">
                      $95.88
                      <span className="ml-1 text-sm font-medium text-muted-foreground">/year</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Unlimited notes</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Advanced formatting</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Cross-platform sync</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>10 GB storage</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Priority support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="#">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Team</CardTitle>
                    <CardDescription>Perfect for small teams</CardDescription>
                    <div className="mt-4 flex items-baseline text-5xl font-bold">
                      $191.88
                      <span className="ml-1 text-sm font-medium text-muted-foreground">/year</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Everything in Pro</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Team collaboration</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Admin controls</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>50 GB storage</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>24/7 support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="#">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

