"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { skills, projects } from "@/db/schema";
import { revalidatePath } from "next/cache";

interface CloudflareEnv {
  DB: D1Database;
}

export async function addSkill(formData: FormData) {
  const context = getRequestContext();

  const db = drizzle(context.env.DB as unknown as D1Database);

  const skillName = formData.get("skillName") as string;
  const level = parseInt(formData.get("level") as string);
  const userId = "user_1";

  await db.insert(skills).values({
    userId,
    skillName,
    level,
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");
}

export async function createProject(projectName: string, memberIds: string[]) {
  const context = getRequestContext();
  const db = drizzle(context.env.DB as unknown as D1Database);

  await db.insert(projects).values({
    name: projectName,
    members: JSON.stringify(memberIds),
  });

  revalidatePath("/admin");
}
