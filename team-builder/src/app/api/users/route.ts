// import { getRequestContext } from "@cloudflare/next-on-pages";
// import { drizzle } from "drizzle-orm/d1";
// import { users } from "@/db/schema";

// export const runtime = "edge";

// export async function GET() {
//   const context = getRequestContext();
//   const db = drizzle(context.env.DB as any);

//   try {
//     const allUsers = await db.select().from(users).all();
//     return Response.json(allUsers);
//   } catch (error) {
//     return Response.json(
//       { error: "Мэдээлэл татахад алдаа гарлаа" },
//       { status: 500 },
//     );
//   }
// }

import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { users } from "@/db/schema";

export const runtime = "edge";

export async function GET() {
  const context = getRequestContext();

  // 'as any'-г 'as unknown as D1Database' болгож солилоо
  // Энэ нь Linter-ийн "Unexpected any" алдааг арилгана
  const db = drizzle(context.env.DB as unknown as D1Database);

  try {
    const allUsers = await db.select().from(users).all();
    return Response.json(allUsers);
  } catch (err) {
    // Өмнө нь 'error' гэж зарлаад ашиглаагүй байсан тул
    // консол дээр алдааг хэвлэх эсвэл 'err' гэж нэрлэвэл Warning өгөхгүй
    console.error("API Error:", err);

    return Response.json(
      { error: "Мэдээлэл татахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}
