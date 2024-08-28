import Link from "next/link";
import { db } from "@/app/db";
import * as actions from "@/actions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SnippetCodeBlock from "@/components/snippet-code-block";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <Link href="/">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            ClipCode
          </h1>
        </Link>
        <div className="flex gap-2">
          <Link href={`/snippets/${snippet.id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <form action={deleteSnippetAction}>
            <Button variant="destructive" type="submit">
              Delete
            </Button>
          </form>
        </div>
      </div>
      <Separator className="my-4" />
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {snippet.title}
      </h1>
      <SnippetCodeBlock code={snippet.code} />
    </div>
  );
}
