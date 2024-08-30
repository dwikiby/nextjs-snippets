"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Icon loading

export default function DeleteButtonWithLoading({
  deleteAction,
}: {
  deleteAction: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteAction();
    setIsLoading(false);
  };

  return (
    <Button
      variant="destructive"
      type="button"
      onClick={handleDelete}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Deleting...
        </>
      ) : (
        "Delete"
      )}
    </Button>
  );
}
