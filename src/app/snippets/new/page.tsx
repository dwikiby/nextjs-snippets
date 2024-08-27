import { db } from "@/app/db";
import { redirect } from "next/navigation";
import SnippetCreateForm from "@/components/snippet-create-form";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    redirect("/");
  }

  return <SnippetCreateForm onSubmit={createSnippet} />;
}
