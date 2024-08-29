import SnippetCreateForm from "@/components/snippet-create-form";
import * as actions from "@/actions";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    await actions.createSnippet(title, code);
  }

  return <SnippetCreateForm onSubmit={createSnippet} />;
}
