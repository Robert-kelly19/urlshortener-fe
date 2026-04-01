"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-[1.02] active:scale-[0.98]",
        secondary: "bg-white/5 border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20",
        ghost: "hover:bg-white/5 text-foreground",
        outline: "border border-white/20 bg-transparent hover:bg-white/5",
        destructive: "bg-red-500/90 text-white hover:bg-red-600",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
    >
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    </motion.div>
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
