"use client";

import { useState } from "react";

// 1. Интерфэйсүүдийг тодорхойлж өгөх (any-г орлоно)
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

export default function TeamManager({
  allUsers,
  allSkills,
}: {
  allUsers: User[]; // any[] байсныг солив
  allSkills: Skill[]; // any[] байсныг солив
}) {
  const [selectedTeam, setSelectedTeam] = useState<User[]>([]); // <any[]> солив
  const [search, setSearch] = useState("");

  // Хайлт болон Чадвараар шүүх логик
  const filteredUsers = allUsers.filter((user) => {
    const userName = user.name.toLowerCase().includes(search.toLowerCase());
    const userSkills = allSkills
      .filter((s) => s.userId === user.id)
      .some((s) => s.skillName.toLowerCase().includes(search.toLowerCase()));

    return userName || userSkills;
  });

  const addToTeam = (user: User) => {
    // any-г User болгов
    if (!selectedTeam.find((u) => u.id === user.id))
      setSelectedTeam([...selectedTeam, user]);
  };

  const removeFromTeam = (userId: string) => {
    setSelectedTeam(selectedTeam.filter((u) => u.id !== userId));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Хайлтын хэсэг */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Нэр эсвэл чадвараар хайх... (жишээ нь: React)"
          className="w-full p-4 pl-12 bg-white border-none ring-1 ring-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg
          className="absolute left-4 top-4 text-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white/80 border border-white p-6 rounded-[2rem] shadow-sm hover:shadow-indigo-100 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-indigo-50 transition-colors">
                    👤
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      {user.name}
                    </h3>
                    <p className="text-sm text-slate-400 italic lowercase">
                      {user.role}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => addToTeam(user)}
                  className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-500 hover:border-indigo-200 shadow-sm transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {allSkills
                  .filter((s) => s.userId === user.id)
                  .map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-xl flex items-center gap-2"
                    >
                      <span className="text-sm text-slate-600">
                        {skill.skillName}
                      </span>
                      <span className="text-[10px] bg-white px-1 py-0.5 rounded shadow-sm text-indigo-500 font-bold">
                        Lv {skill.level}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Сонгогдсон баг */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] sticky top-8 shadow-2xl">
            <h2 className="text-xl font-bold mb-6">
              Шинэ баг ({selectedTeam.length})
            </h2>
            <div className="space-y-3 mb-8 min-h-[100px]">
              {selectedTeam.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-white/10 p-3 rounded-2xl border border-white/5 group"
                >
                  <span className="font-medium text-sm">{user.name}</span>
                  <button
                    onClick={() => removeFromTeam(user.id)}
                    className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button
              className="w-full bg-indigo-500 py-4 rounded-2xl font-bold hover:bg-indigo-400 transition-all active:scale-95 disabled:opacity-30 disabled:grayscale"
              disabled={selectedTeam.length === 0}
            >
              Багийг батлах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
