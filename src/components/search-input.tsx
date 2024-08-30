"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("search", e.target.value);
    router.push(`?${searchParams.toString()}`);
    router.refresh(); // Tambahkan ini
  };

  return (
    <div className="relative w-full md:w-auto ml-auto flex items-center">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
      />
    </div>
  );
}
