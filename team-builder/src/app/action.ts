// "use server";

// import { getRequestContext } from "@cloudflare/next-on-pages";
// import { drizzle } from "drizzle-orm/d1";
// import { users, skills, projects } from "@/db/schema";
// import { revalidatePath } from "next/cache";

// interface User {
//   id?: number;
//   name: string;
//   email: string;
//   role: string;
// }

// export async function addSkill(formData: FormData) {
//   const context = getRequestContext();
//   const db = drizzle(context.env.DB as any);

//   const skillName = formData.get("skillName") as string;
//   const level = parseInt(formData.get("level") as string);
//   const userId = "user_1";
//   //   example id

//   await db.insert(skills).values({
//     userId,
//     skillName,
//     level,
//   });

//   revalidatePath("/dashboard");
//   revalidatePath("/admin");
// }

// export async function createProject(projectName: string, memberIds: string[]) {
//   const context = getRequestContext();
//   const db = drizzle(context.env.DB as any);

//   await db.insert(projects).values({
//     name: projectName,
//     members: JSON.stringify(memberIds),
//   });

//   revalidatePath("/admin");
// }

"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { skills, projects } from "@/db/schema"; // users-ийг ашиглаагүй бол хаслаа (Warning-аас сэргийлж)
import { revalidatePath } from "next/cache";

// Cloudflare D1-ийн төрлийг тодорхойлж өгөх (Энэ нь 'any'-г орлоно)
interface CloudflareEnv {
  DB: D1Database;
}

export async function addSkill(formData: FormData) {
  const context = getRequestContext();
  // 'as any' биш 'as unknown as D1Database' эсвэл шууд DB-г ашиглах
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
