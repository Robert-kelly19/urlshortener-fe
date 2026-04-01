import { useState } from "react"
import { useNavigate } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import { Link2, QrCode, Zap, Shield, BarChart3, Smartphone, ArrowRight, CheckCircle2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function Landing() {
  const navigate = useNavigate()
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [showQr, setShowQr] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShorten = async () => {
    if (!url) return
    setIsGenerating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const shortCode = Math.random().toString(36).substring(2, 8)
    setShortUrl(`short.io/${shortCode}`)
    setShowQr(true)
    setIsGenerating(false)
    
    toast({
      title: "Link shortened!",
      description: "Your short link is ready to share.",
      variant: "success",
    })
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Link copied to clipboard.",
      variant: "success",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instantly shorten your long URLs in milliseconds with our optimized infrastructure."
    },
    {
      icon: QrCode,
      title: "QR Code Generation",
      description: "Create beautiful, customizable QR codes for every link you shorten."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track clicks and engagement with detailed analytics dashboard."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your links are protected with enterprise-grade security protocols."
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Seamless experience across all your devices, anywhere."
    },
    {
      icon: Link2,
      title: "Custom Slugs",
      description: "Personalize your URLs with custom aliases for branding."
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Paste Your Link",
      description: "Enter your long URL into the input field"
    },
    {
      number: "02",
      title: "Generate Short Link",
      description: "Click generate for an instant shortened URL"
    },
    {
      number: "03",
      title: "Share & Track",
      description: "Share your link and monitor its performance"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass-blur border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">ShortURL</span>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/signUp")}>
              Get Started
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground mb-8">
              <Zap className="w-4 h-4 text-primary" />
              Trusted by 500K+ users worldwide
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
          >
            Shorten links.{" "}
            <span className="gradient-text">Share smarter.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Create shortened links and generate QR codes in seconds. 
            Track your clicks with real-time analytics.
          </motion.p>

          {/* URL Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="max-w-2xl mx-auto overflow-visible">
              <CardContent className="p-2">
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="Paste your long URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-14 text-base border-0 bg-transparent focus-visible:ring-0"
                  />
                  <Button 
                    size="lg" 
                    onClick={handleShorten}
                    disabled={!url || isGenerating}
                    className="h-14 px-8"
                  >
                    {isGenerating ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        Shorten
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Result Preview */}
            <AnimatePresence>
              {showQr && shortUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="mt-6"
                >
                  <Card className="max-w-md mx-auto">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center">
                          <QrCode className="w-16 h-16 text-background" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">Your short link</p>
                          <p className="text-lg font-semibold text-primary">{shortUrl}</p>
                        </div>
                        <Button 
                          variant="secondary" 
                          size="icon"
                          onClick={handleCopy}
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why choose <span className="gradient-text">ShortURL</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to manage and track your links in one beautiful platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-8xl font-bold text-white/5 absolute -top-4 left-0">
                  {step.number}
                </div>
                <Card className="relative">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-muted-foreground/30 -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20" />
            <CardContent className="relative p-12 md:p-20 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of users who are already shortening links and tracking analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate("/signUp")}>
                  Start Free Today
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Free to start
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  No credit card required
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Link2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">ShortURL</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 ShortURL. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
