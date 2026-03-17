import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { users } from "@/db/schema";

export const runtime = "edge";

export async function GET() {
  const context = getRequestContext();
  const db = drizzle(context.env.DB as any);

  try {
    const allUsers = await db.select().from(users).all();
    return Response.json(allUsers);
  } catch (error) {
    return Response.json(
      { error: "Мэдээлэл татахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}
