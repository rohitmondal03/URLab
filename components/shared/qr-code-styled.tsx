"use client";

import { Loader, LoaderIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface QRProps {
  data: string;
  width?: number;
  height?: number;
  logoUrl?: string;
  domain: string;
  className?: string;
}

export default function QRCodeStyled({
  data,
  width = 300,
  height = 300,
  logoUrl,
  domain,
  className,
}: QRProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<any>(null);
  const [isFetching, setFetching] = useState(false);

  // Step A: Dynamically import the library (client-side only)
  useEffect(() => {
    import("qr-code-styling").then(async (mod) => {
      const QRCodeStyling = mod.default;

      setFetching(true);

      const qr = new QRCodeStyling({
        width,
        height,
        type: "canvas",
        data,
        image: `/api/favicon?domain=${domain}`,
        dotsOptions: {
          color: "#000",
          type: "extra-rounded",
        },
        backgroundOptions: {
          color: "#ffffff",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          saveAsBlob: true,
        },
        cornersSquareOptions: {
          type: "extra-rounded",
        },
        cornersDotOptions: {
          type: "dot"
        }
      });

      setFetching(false);

      setQrCode(qr);
    });
  }, []); // runs once on mount

  // Step B: Append QR code to the DOM ref
  useEffect(() => {
    if (qrCode && ref.current) {
      ref.current.innerHTML = ""; // clear previous render
      qrCode.append(ref.current);
    }
  }, [qrCode]);

  // Step C: Update QR when data changes
  useEffect(() => {
    if (qrCode) {
      qrCode.update({ data, image: logoUrl });
    }
  }, [data, logoUrl]);

  return isFetching
    ? <LoaderIcon className="animate-spin" />
    : <div ref={ref} className={className} />;
}