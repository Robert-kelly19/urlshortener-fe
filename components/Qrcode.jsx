"use client"

import React, { useEffect, useRef } from "react"
import QRCodeStyling from "qr-code-styling"
import { motion } from "framer-motion"
import { Download } from "lucide-react"

export default function Qrcode({ link }) {
  const qrRef = useRef(null)
  const qrCode = useRef(null)
  const BE_URL = import.meta.env.VITE_BE_URL

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 120,
      height: 120,
      type: "svg",
      data: `${BE_URL}/redirect/${link}`,
      dotsOptions: {
        color: "#6366F1",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#6366F1",
      },
      cornersDotOptions: {
        type: "dot",
        color: "#6366F1",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
      },
    })

    if (qrRef.current && qrCode.current) {
      qrRef.current.innerHTML = ""
      qrCode.current.append(qrRef.current)
    }
  }, [])

  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update({
        data: `${BE_URL}/redirect/${link}`,
      })
    }
  }, [link])

  const downloadQrCode = () => {
    qrCode.current?.download({
      name: `shorturl-${link}`,
      extension: "png",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="p-3 bg-white rounded-xl">
        <div ref={qrRef} />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={downloadQrCode}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
      >
        <Download className="w-4 h-4" />
        Download QR
      </motion.button>
    </motion.div>
  )
}
