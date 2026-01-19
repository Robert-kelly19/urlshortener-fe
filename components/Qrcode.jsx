"use client";

import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";



export default function Qrcode({ link }) {
  const qrRef = useRef(null);
  const qrCode = useRef(null);

  const BE_URL = import.meta.env.VITE_BE_URL;

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 100,
      height: 100,
      type: "svg",
      data: `${BE_URL}/redirect/${link}`,
      dotsOptions: {
        color: "#4267b2",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });

    if (qrRef.current && qrCode.current) {
      qrRef.current.innerHTML = ""; 
      qrCode.current.append(qrRef.current);
    }
  }, []);

 
  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update({
        data: `${BE_URL}/redirect/${link}`,
      });
    }
  }, [link]);

  const downloadQrCode = () => {
    qrCode.current?.download({
      name: `${link}`,
      extension: "png",
    });
  };

  return (
    <div className="code">
      <div ref={qrRef} />
      <button
        onClick={downloadQrCode}
      >
        Download Code
      </button>
    </div>
  );
}
