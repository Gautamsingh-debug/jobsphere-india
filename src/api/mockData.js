export const INDIAN_CITIES = [
  { name: 'Bangalore', state: 'Karnataka', lat: 12.97, lng: 77.59 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.07, lng: 72.87 },
  { name: 'Delhi NCR', state: 'Delhi', lat: 28.61, lng: 77.20 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.38, lng: 78.47 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.08, lng: 80.27 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.52, lng: 73.85 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.57, lng: 88.36 },
  { name: 'Gurgaon', state: 'Haryana', lat: 28.46, lng: 77.03 },
  { name: 'Noida', state: 'Uttar Pradesh', lat: 28.53, lng: 77.39 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.02, lng: 72.57 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.91, lng: 75.78 },
  { name: 'Kochi', state: 'Kerala', lat: 9.93, lng: 76.26 },
];

export const JOB_CATEGORIES = [
  { tag: 'it-jobs', label: 'IT & Software', icon: '💻', count: 45200 },
  { tag: 'engineering-jobs', label: 'Engineering', icon: '⚙️', count: 18700 },
  { tag: 'accounting-finance-jobs', label: 'Finance & Banking', icon: '📊', count: 12400 },
  { tag: 'sales-jobs', label: 'Sales & Marketing', icon: '📈', count: 15600 },
  { tag: 'healthcare-nursing-jobs', label: 'Healthcare', icon: '🏥', count: 8900 },
  { tag: 'teaching-jobs', label: 'Education', icon: '📚', count: 6500 },
  { tag: 'admin-jobs', label: 'Administration', icon: '🏢', count: 9800 },
  { tag: 'consultancy-jobs', label: 'Consulting', icon: '💼', count: 7200 },
  { tag: 'creative-design-jobs', label: 'Design & Creative', icon: '🎨', count: 5400 },
  { tag: 'hr-jobs', label: 'Human Resources', icon: '👥', count: 4100 },
];

const COMPANIES = [
  { name: 'Infosys', logo: 'IF' },
  { name: 'Tata Consultancy Services', logo: 'TCS' },
  { name: 'Wipro', logo: 'WP' },
  { name: 'HCL Technologies', logo: 'HCL' },
  { name: 'Flipkart', logo: 'FK' },
  { name: 'Razorpay', logo: 'RP' },
  { name: 'Swiggy', logo: 'SW' },
  { name: 'Zomato', logo: 'ZM' },
  { name: 'PhonePe', logo: 'PP' },
  { name: 'CRED', logo: 'CR' },
  { name: 'Zerodha', logo: 'ZD' },
  { name: 'Freshworks', logo: 'FW' },
  { name: 'Meesho', logo: 'MS' },
  { name: 'Paytm', logo: 'PT' },
  { name: 'Reliance Industries', logo: 'RI' },
  { name: 'Accenture India', logo: 'AC' },
  { name: 'Amazon India', logo: 'AZ' },
  { name: 'Google India', logo: 'GG' },
  { name: 'Microsoft India', logo: 'MS' },
  { name: 'Groww', logo: 'GW' },
];

const JOB_TITLES = [
  'Senior Software Engineer', 'Full Stack Developer', 'Frontend Developer (React)',
  'Backend Developer (Node.js)', 'Data Scientist', 'Machine Learning Engineer',
  'DevOps Engineer', 'Cloud Architect (AWS)', 'Product Manager', 'UI/UX Designer',
  'Mobile Developer (React Native)', 'QA Lead — Automation', 'Site Reliability Engineer',
  'Business Analyst', 'Digital Marketing Manager', 'Financial Analyst',
  'HR Business Partner', 'Technical Program Manager', 'AI/ML Research Engineer',
  'Data Engineer', 'Java Developer — Spring Boot', 'Python Developer',
  'iOS Developer (Swift)', 'Android Developer (Kotlin)', 'Solutions Architect',
  'Technical Lead', 'Engineering Manager', 'Growth Marketing Specialist',
  'Scrum Master', 'Platform Engineer',
];

const DESCRIPTIONS = [
  'Join our dynamic team building cutting-edge products for millions of users across India. Strong problem-solving skills required.',
  'Collaborate with cross-functional teams to build scalable solutions. Experience with modern tech stacks and agile methodologies required.',
  'Shape the future of digital experiences in India. Design, develop, and deploy high-quality solutions with creativity and ownership.',
  'Be part of a mission-driven team transforming how India works. Competitive compensation and excellent growth opportunities.',
  'Work with world-class engineers on complex, impactful problems. Contribute to architecture decisions and drive engineering excellence.',
  'Build next generation products for the Indian market. Innovate, experiment, and deliver solutions at scale.',
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomSalary() {
  const bases = [400000, 600000, 800000, 1000000, 1200000, 1500000, 1800000, 2500000, 3500000];
  const min = randomFrom(bases);
  const max = min + Math.floor(min * (0.3 + Math.random() * 0.5));
  return { min, max };
}

function generateMockJobs(count = 60) {
  const jobs = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const company = randomFrom(COMPANIES);
    const city = randomFrom(INDIAN_CITIES);
    const salary = randomSalary();
    const daysAgo = Math.floor(Math.random() * 30);
    const created = new Date(now - daysAgo * 86400000).toISOString();
    const contractTypes = ['full_time', 'contract', 'part_time'];
    const contractType = Math.random() > 0.3 ? 'full_time' : randomFrom(contractTypes);
    jobs.push({
      id: `mock-${i + 1}`,
      title: randomFrom(JOB_TITLES),
      company: { display_name: company.name, logo: company.logo },
      location: { display_name: `${city.name}, ${city.state}`, area: ['India', city.state, city.name] },
      latitude: city.lat, longitude: city.lng,
      salary_min: salary.min, salary_max: salary.max,
      salary_is_predicted: Math.random() > 0.5 ? 1 : 0,
      description: randomFrom(DESCRIPTIONS),
      category: randomFrom(JOB_CATEGORIES),
      contract_type: contractType, contract_time: contractType,
      created, redirect_url: '#',
    });
  }
  return jobs;
}

export const MOCK_JOBS = generateMockJobs(60);

export function searchMockJobs({ query = '', location = '', category = '', contractType = '', salaryMin = 0, page = 1, perPage = 12, sortBy = 'date' } = {}) {
  let filtered = [...MOCK_JOBS];
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(j => j.title.toLowerCase().includes(q) || j.company.display_name.toLowerCase().includes(q) || j.description.toLowerCase().includes(q));
  }
  if (location) {
    const loc = location.toLowerCase();
    filtered = filtered.filter(j => j.location.display_name.toLowerCase().includes(loc));
  }
  if (category) filtered = filtered.filter(j => j.category.tag === category);
  if (contractType) filtered = filtered.filter(j => j.contract_type === contractType);
  if (salaryMin > 0) filtered = filtered.filter(j => j.salary_min >= salaryMin);
  if (sortBy === 'salary') filtered.sort((a, b) => b.salary_max - a.salary_max);
  else filtered.sort((a, b) => new Date(b.created) - new Date(a.created));
  const total = filtered.length;
  const start = (page - 1) * perPage;
  return { results: filtered.slice(start, start + perPage), count: total, page, totalPages: Math.ceil(total / perPage) };
}
