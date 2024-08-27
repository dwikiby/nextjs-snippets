import Link from "next/link";
import { db } from "./db";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        className="flex justify-between items-center p-2 border rounded-sm shadow-sm"
        href={`/snippets/${snippet.id}`}
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Snippets
        </h1>
        <Link href="/snippets/new">
          <Button>Create Snippet</Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2">{renderSnippets}</div>
    </div>
  );
}
