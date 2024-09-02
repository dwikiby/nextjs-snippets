import Link from "next/link";
import { db } from "@/app/db";
import * as actions from "@/actions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SnippetCodeBlock from "@/components/snippet-code-block";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteButtonWithLoading from "@/components/delete-button-loading";

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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your snippet.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <form action={deleteSnippetAction}>
                  <DeleteButtonWithLoading deleteAction={deleteSnippetAction} />
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
