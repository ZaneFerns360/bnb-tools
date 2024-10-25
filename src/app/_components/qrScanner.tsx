"use client";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

const QRScanner = () => {
  const [error, setError] = useState("");
  const [scannedResult, setScannedResult] = useState("");

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleError = (error) => {
    console.error(error);
    setError("Camera access error. Please check permissions and try again.");
  };

  const handleScan = (result) => {
    if (result) {
      setScannedResult(result?.text);
      router.push(`/admin/${result?.text}`);
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md p-4">
      {open ? (
        <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-gray-200">
          <QrReader
            onResult={handleScan}
            constraints={{
              facingMode: "environment",
            }}
            containerStyle={{ height: "100%", width: "100%" }}
            videoStyle={{ height: "100%", width: "100%", objectFit: "cover" }}
            videoContainerStyle={{ height: "100%", width: "100%" }}
          />
          {scannedResult && (
            <div className="absolute bottom-16 left-4 right-4 rounded bg-white/90 p-3 shadow-lg">
              <p className="text-sm font-medium">Scanned Result:</p>
              <p className="mt-1 break-all text-sm text-gray-600">
                {scannedResult}
              </p>
            </div>
          )}
        </div>
      ) : (
        <Button className="w-full" onClick={() => setOpen(true)}>
          Open QR
        </Button>
      )}
      {open && (
        <p className="mt-4 text-center text-sm text-gray-600">
          Point your camera at a QR code to scan
        </p>
      )}
    </div>
  );
};

export default QRScanner;
