const axios = require('axios');

async function runTests() {
  try {
    const email = `test_${Date.now()}@example.com`;
    const password = 'Password@123';
    
    console.log('1. Testing Signup...');
    let res = await axios.post('http://localhost:5000/api/auth/signup', {
      name: 'Test User',
      email,
      password
    });
    const token = res.data.token;
    console.log('Signup Successful, Token:', token ? 'Received' : 'Failed');

    console.log('\n2. Testing Roadmap Generation (AI & DB)...');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    res = await axios.post('http://localhost:5000/api/ai/generate', {
      studentClass: 'SSLC',
      interests: ['Science', 'Tech'],
      skills: ['Coding'],
      marks: 95
    });
    console.log('Generation Successful, Suggestions:', res.data.aiSuggestions?.length || 0);

    console.log('\n3. Testing Recent History...');
    res = await axios.get('http://localhost:5000/api/ai/recent');
    console.log('History Successful, Items:', res.data.length);

    console.log('\nALL TESTS PASSED SUCCESSFULLY!');
  } catch (error) {
    console.error('TEST FAILED:', error.response?.data?.message || error.message);
  }
}

runTests();
