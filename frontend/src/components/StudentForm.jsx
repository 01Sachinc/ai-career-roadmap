import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, GraduationCap, Target, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentForm = ({ onGenerate }) => {
  const [formData, setFormData] = useState({
    studentClass: 'SSLC',
    interests: [],
    skills: '',
    marks: ''
  });
  const [loading, setLoading] = useState(false);
  const [currentInterest, setCurrentInterest] = useState('');

  const handleAddInterest = () => {
    if (currentInterest.trim() && !formData.interests.includes(currentInterest.trim())) {
      setFormData({ ...formData, interests: [...formData.interests, currentInterest.trim()] });
      setCurrentInterest('');
    }
  };

  const removeInterest = (interest) => {
    setFormData({ ...formData, interests: formData.interests.filter(i => i !== interest) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
        marks: parseFloat(formData.marks)
      };
      const res = await axios.post('http://localhost:5000/api/ai/generate', payload);
      onGenerate(res.data);
    } catch (err) {
      alert('Error generating roadmap. Make sure the backend is running and HF_API_KEY is set.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto glass p-8 rounded-3xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
          <GraduationCap size={28} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Your Career Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 text-left">Current Class</label>
          <div className="grid grid-cols-2 gap-4">
            {['SSLC', 'PUC'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFormData({ ...formData, studentClass: c })}
                className={`py-3 rounded-xl font-medium border-2 transition-all ${
                  formData.studentClass === c 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-slate-100 text-slate-500 hover:border-slate-200'
                }`}
              >
                {c === 'SSLC' ? '10th (SSLC)' : '12th (PUC)'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 text-left">Interests</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              value={currentInterest}
              onChange={(e) => setCurrentInterest(e.target.value)}
              placeholder="e.g., Space, Writing, Coding"
              className="input-field" 
            />
            <button 
              type="button" 
              onClick={handleAddInterest}
              className="px-4 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.interests.map((interest) => (
              <span key={interest} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center gap-1">
                {interest}
                <button type="button" onClick={() => removeInterest(interest)} className="hover:text-red-500">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Skills (Separate by comma)</label>
            <input 
              type="text" 
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="input-field" 
              placeholder="e.g., Python, Piano, Art"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Marks (%)</label>
            <input 
              type="number" 
              value={formData.marks}
              onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
              className="input-field" 
              placeholder="e.g., 85"
              required
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all ${
            loading ? 'bg-slate-200 text-slate-500' : 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-[0.98]'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Generating AI Roadmap...
            </>
          ) : (
            <>
              Generate My Career Roadmap
              <Sparkles size={20} />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default StudentForm;
