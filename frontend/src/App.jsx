import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import RoadmapView from './components/RoadmapView';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trophy, Compass, Star, History } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import axios from 'axios';

function App() {
  const { user, token } = useAuth();
  const [roadmapData, setRoadmapData] = useState(null);
  const [selectedCareerIdx, setSelectedCareerIdx] = useState(0);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (user && token) {
      fetchHistory();
    } else {
      setHistory([]);
    }
  }, [user, token]);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await axios.get('http://localhost:5000/api/ai/recent');
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history');
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleGenerate = (data) => {
    setRoadmapData(data);
    setSelectedCareerIdx(0);
    if (user) fetchHistory();
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Header />

      <main className="max-w-6xl mx-auto pb-20">
        {!roadmapData ? (
          <div className="text-center mt-12 mb-16">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100"
            >
              <Compass size={14} className="animate-spin" /> Perfect for SSLC & PUC Students
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6"
            >
              Find Your <span className="text-blue-600">Dream Career</span> <br /> 
              With AI-Powered Logic.
            </motion.h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-12">
              Generate a personalized roadmap, course suggestions, and skill gap analysis tailored specifically for the Indian education system.
            </p>
            
            <StudentForm onGenerate={handleGenerate} />
            
            {user && history.length > 0 && (
              <div className="mt-20">
                <div className="flex items-center gap-2 mb-6 px-4">
                  <History className="text-blue-600" size={20} />
                  <h3 className="text-xl font-bold text-slate-800">Your Recent Roadmaps</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {history.map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5 }}
                      onClick={() => setRoadmapData(item)}
                      className="glass p-6 rounded-3xl cursor-pointer text-left hover:border-blue-200 transition-all"
                    >
                      <p className="text-xs font-bold text-blue-500 uppercase mb-1">{item.studentClass}</p>
                      <p className="font-bold text-slate-800 mb-2 truncate">{item.aiSuggestions[0]?.career}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.interests.slice(0, 3).map(interest => (
                          <span key={interest} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">{interest}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Sidebar Suggestions */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-2">AI Recommendations</h3>
              {roadmapData.aiSuggestions.map((item, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedCareerIdx(idx)}
                  className={`w-full p-4 rounded-2xl text-left transition-all ${
                    selectedCareerIdx === idx 
                      ? 'bg-white shadow-xl border-l-4 border-l-blue-600 ring-1 ring-slate-100' 
                      : 'hover:bg-white/50 text-slate-500'
                  }`}
                >
                  <p className={`font-bold ${selectedCareerIdx === idx ? 'text-slate-900' : 'text-slate-600'}`}>
                    {item.career}
                  </p>
                  <p className="text-[10px] mt-1 line-clamp-2">{item.reason}</p>
                </motion.button>
              ))}
              
              <button 
                onClick={() => setRoadmapData(null)}
                className="w-full mt-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-all"
              >
                Reset Search
              </button>
            </div>

            {/* Main Roadmap Area */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCareerIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RoadmapView careerData={roadmapData.aiSuggestions[selectedCareerIdx]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-12 border-t border-slate-200 mt-12 bg-white -mx-8">
        <p className="text-sm text-slate-400">© 2026 AI CareerSync. Built for future leaders.</p>
      </footer>
    </div>
  );
}

export default App;
