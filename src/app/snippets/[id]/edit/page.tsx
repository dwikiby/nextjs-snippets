import { db } from "@/app/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import SnippetEditForm from "@/components/snippet-edit-form";
import { Separator } from "@/components/ui/separator";

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const id = parseInt(props.params.id);
  const snippet = await db.snippet.findFirst({
    where: {
      id,
    },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <Link href="/">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            ClipCode
          </h1>
        </Link>
      </div>
      <Separator className="my-4" />
      <div>
        <SnippetEditForm snippet={snippet} />
      </div>
    </div>
  );
}
