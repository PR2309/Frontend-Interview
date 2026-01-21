import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import BlogList from './components/BlogList.tsx';
import BlogDetails from './components/BlogDetails.tsx';
import CreateBlogForm from './components/CreateBlogForm.tsx';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'details' | 'form'>('details');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <header className={`border-b transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-xs`}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base">CM</span>
              </div>
              <h1 className={`text-2xl font-bold tracking-tight transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>CA Monk</h1>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              <a href="#" className={`font-medium text-sm transition hover:text-indigo-600 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Home</a>
              <a href="#" className={`font-medium text-sm transition hover:text-indigo-600 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Categories</a>
              <a href="#" className={`font-medium text-sm transition hover:text-indigo-600 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Trending</a>
              <a href="#" className={`font-medium text-sm transition hover:text-indigo-600 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>About</a>
            </nav>
            
            {/* Profile & Theme Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2.5 rounded-lg transition-colors ${isDark ? 'bg-slate-700 text-amber-400 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-md"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - 2 Column Layout */}
      <div className="max-w-8xl mx-auto px-4 py-2">
        <div className="flex gap-4 h-[calc(100vh-100px)]">
          {/* Left Column - Blog List (28%) */}
          <div className="w-1/3 lg:w-[28%]">
            <div className={`rounded-2xl shadow-xl h-full flex flex-col overflow-hidden border transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className={`p-3 border-b transition-colors ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                <h2 className={`text-lg font-bold tracking-tight mb-3 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Latest Articles</h2>
                <div className={`flex items-center gap-2 border rounded-lg px-3 py-2 transition-colors ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-200'}`}>
                  <svg className={`w-4 h-4 flex-shrink-0 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`flex-1 bg-transparent border-0 focus:outline-none text-sm transition-colors ${isDark ? 'text-slate-100 placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'}`}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <BlogList isDark={isDark} searchQuery={searchQuery} />
              </div>
            </div>
          </div>

          {/* Right Column - Main Content (72%) */}
          <div className="flex-1 lg:w-[72%] flex flex-col gap-3">
            {/* Top Section - Blog Details */}
            <div 
              onClick={() => setExpandedSection('details')}
              className={`rounded-2xl shadow-sm border p-6 overflow-y-auto transition-all duration-300 cursor-pointer ${
                expandedSection === 'details' ? 'flex-[9]' : 'flex-[1]'
              } ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
            >
              <Routes>
                <Route path="/" element={
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-colors ${isDark ? 'bg-slate-700' : 'bg-gradient-to-br from-indigo-100 to-blue-100'}`}>
                        <svg className={`w-10 h-10 transition-colors ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Select an Article</h3>
                      <p className={`transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Choose from the list to explore detailed content</p>
                    </div>
                  </div>
                }/>
                <Route path="/:id" element={<BlogDetails isDark={isDark} />} />
              </Routes>
            </div>

            {/* Bottom Section - Create Blog Form */}
            <div 
              onClick={() => setExpandedSection('form')}
              className={`rounded-2xl shadow-sm border p-6 overflow-y-auto transition-all duration-300 cursor-pointer ${
                expandedSection === 'form' ? 'flex-[9]' : 'flex-[1]'
              } ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
            >
              <CreateBlogForm isDark={isDark} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`text-white py-8 mt-12 border-t transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-900 border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className={`font-medium transition-colors ${isDark ? 'text-slate-200' : 'text-slate-300'}`}>© 2024 CA Monk Blog. All rights reserved.</p>
            <p className={`text-sm mt-2 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;