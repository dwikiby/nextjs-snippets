import Link from "next/link";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ToastNotification from "@/components/toast-notifications";

export default async function Home({ searchParams }: { searchParams: any }) {
  const searchQuery = searchParams?.search ?? "";
  const page = parseInt(searchParams?.page) || 1;
  const pageSize = 10; // Adjust as needed

  const { snippets, totalSnippets } = searchQuery
    ? await searchSnippets(searchQuery, page, pageSize)
    : await searchSnippets("", page, pageSize);

  const totalPages = Math.ceil(totalSnippets / pageSize);

  const renderSnippets = snippets.map((snippet) => {
    return (
      <TableRow key={snippet.id} className="hover:bg-muted">
        <TableCell className="w-[500px]">{snippet.title}</TableCell>
        <TableCell>
          <Badge variant="outline">{snippet.type}</Badge>
        </TableCell>
        <TableCell>
          <Badge variant="outline" className="w-30">
            {format(new Date(snippet.createdAt), "yyyy-MM-dd HH:mm:ss")}
          </Badge>
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
      {/* Render the ToastNotification component */}
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
      <ToastNotification />
      <Separator className="my-4" />
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
      <Pagination className="mt-4">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`?search=${searchQuery}&page=${page - 1}`}
              />
            </PaginationItem>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?search=${searchQuery}&page=${index + 1}`}
                isActive={index + 1 === page}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {page < totalPages && (
            <PaginationItem>
              <PaginationNext
                href={`?search=${searchQuery}&page=${page + 1}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
