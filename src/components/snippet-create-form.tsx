// SnippetCreateForm.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const snippetSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  code: z.string().min(1, { message: "Code is required" }),
});

export default function SnippetCreateForm({
  onSubmit,
}: {
  onSubmit: (data: FormData) => void;
}) {
  const [errors, setErrors] = useState<{ title?: string; code?: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    const result = snippetSchema.safeParse({ title, code });

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        title: formattedErrors.title?._errors[0],
        code: formattedErrors.code?._errors[0],
      });
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Create Snippet
      </h3>
      <p className="text-sm text-muted-foreground">
        Make a new snippet to share with others
      </p>
      <Separator className="my-4" />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Label htmlFor="title" className="w-14 mt-3">
            Title
          </Label>
          <Input
            type="text"
            name="title"
            id="title"
            className="w-full"
            placeholder={errors.title || "Enter snippet title"}
          />
        </div>
        <div className="flex gap-4">
          <Label htmlFor="code" className="w-14 mt-3">
            Code
          </Label>
          <Textarea
            name="code"
            id="code"
            placeholder={errors.code || "Enter snippet code"}
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button type="submit">Create</Button>
          <Link href="/">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </div>
    </form>
  );
}
