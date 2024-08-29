"use server";

import { db } from "../app/db";
import { redirect } from "next/navigation";

export async function createSnippet(title: string, code: string) {
  try {
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error) {
    console.log(error);
    redirect("/?alert=error");
  }
  redirect("/?alert=created");
}

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
  try {
    await db.snippet.delete({
      where: {
        id,
      },
    }); // Redirect dengan query parameter
  } catch (error) {
    console.log(error);
    redirect("/?alert=error"); // Redirect dengan error query parameter
  }
  redirect("/?alert=deleted");
}

export async function searchSnippets(query: string) {
  return await db.snippet.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
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
