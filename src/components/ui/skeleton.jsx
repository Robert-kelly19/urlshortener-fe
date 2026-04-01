"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const Skeleton = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("skeleton", className)}
    {...props}
  />
))
Skeleton.displayName = "Skeleton"

function SkeletonCard() {
  return (
    <div className="glass-card p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between pt-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}

function SkeletonList({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

function SkeletonInput() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  )
}

export { Skeleton, SkeletonCard, SkeletonList, SkeletonInput }
