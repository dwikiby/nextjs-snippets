"use server";

import { db } from "../app/db";
import { redirect } from "next/navigation";

export async function editSnippets(id: number, code: string) {
  await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: {
      id,
    },
  });
  redirect("/");
}

export async function searchSnippets(query: string) {
  return await db.snippet.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query, // Optional: Makes the search case insensitive
          },
        },
        {
          code: {
            contains: query,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
