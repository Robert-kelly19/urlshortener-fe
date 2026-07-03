import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { ...toast, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, toast.duration || 3000)
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Register the addToast handler for standalone toast usage
  useEffect(() => {
    setToastHandler(addToast)
  }, [addToast])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function Toast({ toast, onClose }) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
  }

  const variants = {
    success: "border-emerald-500/20 bg-emerald-500/10",
    error: "border-red-500/20 bg-red-500/10",
    info: "border-blue-500/20 bg-blue-500/10",
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={`glass-card p-4 flex items-start gap-3 border ${variants[toast.variant || "info"]}`}
    >
      {icons[toast.variant || "info"]}
      <div className="flex-1">
        {toast.title && <p className="font-medium text-sm">{toast.title}</p>}
        {toast.description && <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>}
      </div>
      <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

// Standalone toast function that can be used outside React components
let globalAddToast = null

export function setToastHandler(handler) {
  globalAddToast = handler
}

export function toast({ title, description, variant = "info", duration = 3000 }) {
  if (globalAddToast) {
    return globalAddToast({ title, description, variant, duration })
  }
  console.warn("Toast not available - ensure ToastProvider is mounted")
}
