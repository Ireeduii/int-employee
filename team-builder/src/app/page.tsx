export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] p-8 flex flex-col items-center justify-center">
      {/* Soft UI Card */}
      <div className="bg-white/70 backdrop-blur-xl border border-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-indigo-50 rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <span className="text-3xl">🚀</span>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">
          Team Builder
        </h1>

        <p className="text-slate-500 mb-10 leading-relaxed">
          Ур чадварт суурилсан баг бүрдүүлэх систем. Өөрийн профайлаа үүсгэж,
          төслүүдэд нэгдээрэй.
        </p>

        <div className="grid grid-cols-1 gap-4">
          <button className="bg-slate-900 text-white py-4 px-8 rounded-2xl font-medium hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
            Employee Dashboard
          </button>

          <button className="bg-white text-slate-600 border border-slate-100 py-4 px-8 rounded-2xl font-medium hover:bg-slate-50 transition-all active:scale-95">
            Admin Portal
          </button>
        </div>
      </div>
    </main>
  );
}
