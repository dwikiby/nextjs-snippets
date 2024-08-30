"use client";

import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { Button } from "./ui/button";
import * as actions from "@/actions";
import { Loader2 } from "lucide-react"; // Icon loading

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await actions.editSnippets(snippet.id, code);
    setIsLoading(false);
  };

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={snippet.code}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        onChange={handleEditorChange}
      />
      <form onSubmit={handleSubmit}>
        <Button
          type="submit"
          className="mt-4 relative w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Edit Snippet"
          )}
        </Button>
      </form>
    </div>
  );
}
