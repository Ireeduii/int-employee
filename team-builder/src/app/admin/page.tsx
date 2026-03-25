import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { users, skills } from "@/db/schema";
import TeamManager from "./TeamManager";

export const runtime = "edge";

// 1. Cloudflare-ийн орчны төрлийг тодорхойлох
interface CloudflareEnv {
  DB: D1Database;
}

// 2. TeamManager-т очих өгөгдлийн төрлийг тодорхойлох
interface User {
  id: string; // Эсвэл number (db/schema-аас хамаарна)
  name: string;
  role: string;
}

interface Skill {
  id: number;
  userId: string;
  skillName: string;
  level: number;
}

export default async function AdminDashboard() {
  const env = getRequestContext().env as unknown as CloudflareEnv;
  const db = drizzle(env.DB);

  // Өгөгдлүүдээ татаж авах
  const allUsers = await db.select().from(users).all();
  const allSkills = await db.select().from(skills).all();

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 sm:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-600">
              Team Builder
            </h1>
            <p className="text-slate-500 mt-2">
              Төсөлд тохирох мэргэжилтнүүдийг сонгоно уу.
            </p>
          </div>
        </header>

        <TeamManager
          allUsers={allUsers as unknown as User[]}
          allSkills={allSkills as unknown as Skill[]}
        />
      </div>
    </div>
  );
}
