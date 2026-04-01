import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import * as Yup from "yup"
import { useFormik } from "formik"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Link2, 
  Plus, 
  Copy, 
  Check, 
  QrCode, 
  ExternalLink, 
  Trash2, 
  TrendingUp,
  Clock,
  LogOut,
  Menu,
  X,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton, SkeletonCard, SkeletonList } from "@/components/ui/skeleton"
import { toast, useToast } from "@/components/ui/use-toast"
import Qrcode from "../components/Qrcode"

export default function Home() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const BE_URL = import.meta.env.VITE_BE_URL
  const token = localStorage.getItem("token")
  
  const [urls, setUrls] = useState([])
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState(null)

  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }
    getUrls()
  }, [])

  const getUrls = async () => {
    try {
      const res = await fetch(`${BE_URL}/url/my-urls`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error("Failed to fetch URLs")
      const data = await res.json()
      setUrls(data)
    } catch (err) {
      setErr(err.message)
    } finally {
      setLoading(false)
    }
  }

  const validateSchema = Yup.object({
    longUrl: Yup.string().url("Invalid URL").required("Long URL is required"),
    customCode: Yup.string(),
    expiresAt: Yup.date(),
  })

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true)
    try {
      const payload = {
        longUrl: values.longUrl,
        ...(values.customCode && { customCode: values.customCode }),
        ...(values.expiresAt && { expiresAt: values.expiresAt }),
      }

      const res = await fetch(`${BE_URL}/url/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || "Failed to shorten URL")
      }

      resetForm()
      await getUrls()
      
      addToast({
        title: "Link shortened!",
        description: "Your short link is ready to share.",
        variant: "success",
      })
    } catch (error) {
      addToast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
      setIsSubmitting(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      longUrl: "",
      customCode: "",
      expiresAt: "",
    },
    validationSchema: validateSchema,
    onSubmit: handleSubmit,
  })

  const handleCopy = async (shortCode, id) => {
    const fullUrl = `${BE_URL}/redirect/${shortCode}`
    await navigator.clipboard.writeText(fullUrl)
    setCopiedId(id)
    addToast({
      title: "Copied!",
      description: "Link copied to clipboard.",
      variant: "success",
    })
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isExpired = (expiresAt) => {
    if (!expiresAt) return false
    return new Date(expiresAt) < new Date()
  }

  const truncateUrl = (url, maxLength = 50) => {
    if (!url) return ""
    if (url.length <= maxLength) return url
    return url.substring(0, maxLength) + "..."
  }

  const activeUrls = urls.filter(url => !isExpired(url.expires_at))

  return (
    <div className="h-screen bg-background overflow-hidden flex">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-blur border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Link2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">ShortURL</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 glass-blur border-r border-white/5 
        transform transition-transform duration-200 lg:transform-none
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        pt-16 lg:pt-0
      `}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 px-2 py-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">Dashboard</p>
              <p className="text-xs text-muted-foreground">Manage your links</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2 mt-4">
            <div className="px-3 py-2 rounded-lg bg-white/10 text-sm font-medium">
              <div className="flex items-center gap-3">
                <Link2 className="w-4 h-4" />
                My Links
              </div>
            </div>
          </nav>

          <div className="pt-4 border-t border-white/5 lg:hidden">
            <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-400 hover:bg-red-500/10" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 flex-1 flex flex-col h-full pt-16 lg:pt-0">
        <div className="flex-1 max-w-6xl mx-auto w-full p-4 lg:p-8 overflow-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Short Links</h1>
            <p className="text-muted-foreground">Create and manage your shortened URLs</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Create Link Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create New Link
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Link</label>
                      <Input
                        type="url"
                        name="longUrl"
                        placeholder="https://your-long-url.com"
                        value={formik.values.longUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.longUrl && formik.errors.longUrl && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formik.errors.longUrl}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Custom Slug</label>
                      <Input
                        type="text"
                        name="customCode"
                        placeholder="Custom slug (optional)"
                        value={formik.values.customCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Expiration Date (optional)</label>
                      <Input
                        type="date"
                        name="expiresAt"
                        value={formik.values.expiresAt}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={formik.isSubmitting || isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <Link2 className="w-4 h-4 mr-2" />
                          Shorten URL
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* URL List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Your Links</CardTitle>
                  <span className="text-sm text-muted-foreground">{activeUrls.length} links</span>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <SkeletonList count={3} />
                  ) : err ? (
                    <div className="text-center py-8">
                      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <p className="text-red-400">{err}</p>
                      <Button variant="secondary" className="mt-4" onClick={getUrls}>
                        Try Again
                      </Button>
                    </div>
                  ) : urls.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <Link2 className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No links yet</h3>
                      <p className="text-muted-foreground text-sm">
                        Create your first shortened link to get started.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <AnimatePresence mode="popLayout">
                        {activeUrls.map((url, index) => (
                          <motion.div
                            key={url.id || index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                            className="group"
                          >
                            <div className="glass-card p-4 hover:border-primary/30 transition-all">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-muted-foreground mb-1 truncate">
                                    {truncateUrl(url.long_url)}
                                  </p>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <a
                                      href={`${BE_URL}/redirect/${url.short_code}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary font-medium hover:underline flex items-center gap-1"
                                    >
                                      {url.short_code}
                                      <ExternalLink className="w-3 h-3 opacity-50" />
                                    </a>
                                    {url.clicks > 0 && (
                                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                                        <TrendingUp className="w-3 h-3" />
                                        {url.clicks} clicks
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {formatDate(url.created_at)}
                                    </span>
                                    {url.expires_at && (
                                      <span className="flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        Expires: {formatDate(url.expires_at)}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={() => handleCopy(url.short_code, url.id || index)}
                                  >
                                    {copiedId === (url.id || index) ? (
                                      <Check className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={() => setSelectedUrl(selectedUrl === url ? null : url)}
                                  >
                                    <QrCode className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* QR Code Section */}
                              <AnimatePresence>
                                {selectedUrl === url && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
                                  >
                                    <div className="flex items-center justify-center">
                                      <Qrcode link={url.short_code} />
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Fixed Logout Button - Bottom Left (hidden on mobile, shown on lg+) */}
        <div className="fixed bottom-6 left-6 z-50 hidden lg:flex">
          <Button 
            variant="outline" 
            className="glass-card border-red-500/20 text-red-400 hover:text-red-400 hover:bg-red-500/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </main>
    </div>
  )
}
