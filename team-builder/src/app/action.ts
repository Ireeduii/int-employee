// src/app/actions.ts
"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { skills } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function addSkill(formData: FormData) {
  try {
    const context = getRequestContext();
    // env байхгүй бол шууд алдаа шидэх эсвэл console дээр хэвлэх
    if (!context || !context.env) {
      throw new Error("Cloudflare environment is not available");
    }

    const db = drizzle(context.env.DB as any);

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
  } catch (error) {
    console.error("Action Error:", error);
    throw error;
  }
}
