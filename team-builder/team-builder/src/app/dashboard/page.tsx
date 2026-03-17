import { addSkill } from "../action";

export const runtime = "edge";

export default function DashboardPage() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">Чадвар нэмэх</h1>

      <form action={addSkill} className="flex flex-col gap-4 max-w-sm">
        <input
          name="skillName"
          placeholder="Чадварын нэр"
          className="p-2 border rounded-xl"
          required
        />
        <select name="level" className="p-2 border rounded-xl">
          <option value="1">Level 1</option>
          <option value="5">Level 5</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-500 text-white p-2 rounded-xl"
        >
          Хадгалах
        </button>
      </form>
    </main>
  );
}
