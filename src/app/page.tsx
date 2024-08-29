import Link from "next/link";
import { db } from "./db";
import { searchSnippets } from "@/actions";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableCaption,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import SearchInput from "@/components/search-input";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import AutoDismissAlert from "@/components/auto-dismiss-alert";

export default async function Home({ searchParams }: { searchParams: any }) {
  const searchQuery = searchParams?.search ?? "";
  const alertType = searchParams?.alert;

  const renderAlert = () => {
    if (alertType === "created") {
      return (
        <AutoDismissAlert
          title="Snippet Created"
          description="Your snippet was created successfully."
        />
      );
    } else if (alertType === "deleted") {
      return (
        <AutoDismissAlert
          title="Snippet Deleted"
          description="Your snippet was deleted successfully."
        />
      );
    } else if (alertType === "error") {
      return (
        <AutoDismissAlert
          title="Error"
          description="Something went wrong. Please try again later."
        />
      );
    }
    return null;
  };

  const snippets = searchQuery
    ? await searchSnippets(searchQuery)
    : await db.snippet.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

  const renderSnippets = snippets.map((snippet) => {
    return (
      <TableRow key={snippet.id} className="hover:bg-muted">
        <TableCell className="w-[500px]">{snippet.title}</TableCell>
        <TableCell>
          <Badge variant="outline">{snippet.type}</Badge>
        </TableCell>
        <TableCell>
          {format(new Date(snippet.createdAt), "yyyy-MM-dd HH:mm:ss")}
        </TableCell>
        <TableCell>
          <Link href={`/snippets/${snippet.id}`}>
            <Button variant="outline">View</Button>
          </Link>
        </TableCell>
      </TableRow>
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
      {renderAlert()}
      <Table>
        <TableCaption>A list your recent snippets</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderSnippets}</TableBody>
      </Table>
    </div>
  );
}
