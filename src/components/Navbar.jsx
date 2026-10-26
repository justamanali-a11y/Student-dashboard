import React from 'react';

export const Navbar = ({ searchTerm, setSearchTerm, onRefresh, isRefreshing }) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Brand & Concept Badges */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded-lg font-bold text-xl">
                ⚡
              </span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                Student Analytics
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              React Demo: <span className="text-indigo-400 font-medium">Custom Hooks</span> + <span className="text-emerald-400 font-medium">HOC Pattern</span>
            </p>
          </div>
        </div>

        {/* Search Bar & Actions */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <input
              type="text"
              placeholder="Search by name, email or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl border border-indigo-500/30 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <span className={isRefreshing ? "animate-spin" : ""}>🔄</span>
            <span className="hidden sm:inline">Refresh Data</span>
          </button>
        </div>

      </div>
    </header>
  );
};