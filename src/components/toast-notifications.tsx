// components/ToastNotification.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ToastNotification() {
  const searchParams = useSearchParams();
  const alertType = searchParams.get("alert");
  const { toast } = useToast();

  useEffect(() => {
    console.log("Alert Type:", alertType);
    if (alertType === "created") {
      toast({
        title: "Snippet Created",
        description: "Your snippet was created successfully.",
      });
    } else if (alertType === "deleted") {
      toast({
        title: "Snippet Deleted",
        description: "Your snippet was deleted successfully.",
        variant: "destructive",
      });
    } else if (alertType === "error") {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  }, [alertType, toast]);

  return null;
}
