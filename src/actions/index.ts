"use server";

import { revalidatePath } from "next/cache";
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

  revalidatePath(`/snippets/${id}`);
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

export async function searchSnippets(
  query: string,
  page: number,
  pageSize: number
) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const snippets = await db.snippet.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          type: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take,
  });

  const totalSnippets = await db.snippet.count({
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
  });

  return { snippets, totalSnippets };
}
