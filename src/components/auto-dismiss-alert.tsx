"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface AutoDismissAlertProps {
  title: string;
  description: string;
  duration?: number;
}

export default function AutoDismissAlert({
  title,
  description,
  duration = 3000,
}: AutoDismissAlertProps) {
  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [showAlert, duration]);

  if (!showAlert) {
    return null;
  }
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
