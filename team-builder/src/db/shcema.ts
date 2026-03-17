import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  //   available clerkid
  name: text("name").notNull(),
  email: text("email").unique(),
  role: text("role").$type<"ADMIN" | "EMPLOYEE">().default("EMPLOYEE"),
});

export const skills = sqliteTable("skills", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").references(() => users.id),
  skillName: text("skill_name").notNull(),
  level: integer("level").default(1),
});
