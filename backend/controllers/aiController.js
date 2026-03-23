const { HfInference } = require('@huggingface/inference');
const Roadmap = require('../models/Roadmap');

const generateRoadmap = async (req, res) => {
  const { studentClass, interests, skills, marks } = req.body;

  if (!studentClass || !interests || !marks) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const prompt = `Act as an expert Career Counselor for Indian students. Based on student data:
Class: ${studentClass} (SSLC=10th, PUC=12th)
Interests: ${interests.join(', ')}
Skills: ${skills ? skills.join(', ') : 'None'}
Marks: ${marks}%

Generate exactly 3 career options in JSON format.
Each option MUST HAVE:
1. "career": Career name
2. "reason": Why it fits based on interests/marks
3. "roadmap": Array of objects {step: 1, title: string, description: string, timeline: string, courses: [string], exams: [string]}
4. "requiredSkills": Array of strings
5. "skillGap": {missing: [string], improvement: string}

The 'roadmap' should be detailed enough for an SSLC/PUC student to follow from now until they get a job.
Return only valid JSON.`;

  try {
    const hf = new HfInference(process.env.HF_API_KEY);
    const response = await hf.chatCompletion({
      model: 'Qwen/Qwen2.5-7B-Instruct',
      messages: [{ role: 'user', content: prompt }]
    });

    let aiContent = response.choices[0].message.content;
    const jsonMatch = aiContent.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    const result = JSON.parse(jsonMatch ? jsonMatch[0] : aiContent);

    // Save to MySQL using Sequelize
    const newRoadmap = await Roadmap.create({
      studentClass,
      interests,
      skills,
      marks,
      userId: req.user ? req.user.id : null,
      aiSuggestions: Array.isArray(result) ? result : [result]
    });

    // To maintain frontend compatibility, we wrap it in a slightly different structure if needed
    // The previous structure was { studentData: {...}, aiSuggestions: [...] }
    // We'll return the new object but ensure the frontend can read it.
    res.status(200).json({
      id: newRoadmap.id,
      studentData: {
        studentClass: newRoadmap.studentClass,
        interests: newRoadmap.interests,
        skills: newRoadmap.skills,
        marks: newRoadmap.marks
      },
      aiSuggestions: newRoadmap.aiSuggestions,
      createdAt: newRoadmap.createdAt
    });
  } catch (error) {
    console.error('AI Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error generating roadmap. Please check AI tokens.', error: error.message });
  }
};

const getRecentRoadmaps = async (req, res) => {
  try {
    const where = req.user ? { userId: req.user.id } : { userId: null };
    const roadmaps = await Roadmap.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: 10
    });
    res.status(200).json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateRoadmap, getRecentRoadmaps };
