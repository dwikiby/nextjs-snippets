"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

interface SnippetCodeBlockProps {
  code: string;
}

export default function SnippetCodeBlock({ code }: SnippetCodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);

    // Reset the button label after 2 seconds
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-800 text-white rounded-lg p-4 my-6">
      <pre className="text-sm overflow-x-auto">
        <code className="language-javascript block">{code}</code>
        {/* Adjust language */}
      </pre>
      <Button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-white text-xs sm:text-sm"
      >
        {isCopied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
}
