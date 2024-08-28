import Link from "next/link";
import { db } from "./db";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, PlusCircle } from "lucide-react";
import { searchSnippets } from "@/actions";
import SearchInput from "@/components/search-input";

export default async function Home({ searchParams }: { searchParams: any }) {
  const searchQuery = searchParams?.search ?? "";
  const snippets = searchQuery
    ? await searchSnippets(searchQuery)
    : await db.snippet.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

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
      <div className="flex flex-col md:flex-row mb-4 justify-between items-center gap-2">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          ClipCode
        </h1>
        <div className="relative w-full md:w-auto ml-auto flex items-center">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <SearchInput />
        </div>
        <Link href="/snippets/new">
          <Button>
            <PlusCircle className="h-3.5 w-3.5 mr-2" />
            <span className="hidden md:inline">Add Snippet</span>
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2">{renderSnippets}</div>
    </div>
  );
}
