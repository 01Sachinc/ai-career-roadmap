import React from 'react';
import { BookOpen, Trophy, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const RoadmapView = ({ careerData }) => {
  if (!careerData) return null;

  return (
    <div className="mt-12 space-y-12 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 inline-block mb-2">
          {careerData.career}
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">{careerData.reason}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-3xl border-l-4 border-l-blue-500">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Trophy className="text-blue-500" /> Key Required Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {careerData.requiredSkills.map(skill => (
              <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="glass p-6 rounded-3xl border-l-4 border-l-orange-500">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BookOpen className="text-orange-500" /> Skill Gap Analysis
          </h3>
          <p className="text-sm border-b border-slate-100 pb-2 mb-2 font-medium">Improvement Area: <span className="text-slate-500 font-normal">{careerData.skillGap.improvement}</span></p>
          <div className="space-y-2">
            {careerData.skillGap.missing.map(m => (
              <div key={m} className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> {m}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative pl-8 border-l-2 border-slate-200 ml-4 py-4 space-y-8">
        {careerData.roadmap.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-md flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">{step.step}</span>
            </div>
            
            <div className="glass p-6 rounded-2xl hover:border-blue-200 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-bold text-slate-800">{step.title}</h4>
                <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                  <Clock size={12} /> {step.timeline}
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-4">{step.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Recommended Courses</h5>
                  <ul className="text-xs space-y-1 text-slate-700 font-medium">
                    {step.courses.map(c => <li key={c} className="flex gap-1">• {c}</li>)}
                  </ul>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Exams</h5>
                  <ul className="text-xs space-y-1 text-slate-700 font-medium">
                    {step.exams.map(e => <li key={e} className="flex gap-1">• {e}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {/* Progress end */}
        <div className="absolute -left-[35px] -bottom-4 w-4 h-4 rounded-full bg-green-500 animate-pulse border-2 border-white" />
      </div>
    </div>
  );
};

export default RoadmapView;
