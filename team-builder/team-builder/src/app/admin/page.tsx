import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { users, skills } from "@/db/schema";
// import TeamManager from "./TeamManager";
import TeamManager from "./TeamManager";

export const runtime = "edge";

export default async function AdminDashboard() {
  const env = getRequestContext().env as any;
  const db = drizzle(env.DB);

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

        {/* Интерактив хэсгийг энд дуудна */}
        <TeamManager allUsers={allUsers} allSkills={allSkills} />
      </div>
    </div>
  );
}
