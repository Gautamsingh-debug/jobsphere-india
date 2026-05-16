// Adzuna API client for India job search
const BASE_URL = 'https://api.adzuna.com/v1/api/jobs/in';
const APP_ID = import.meta.env.VITE_ADZUNA_APP_ID;
const APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY;

export const isApiConfigured = () =>
  APP_ID && APP_KEY && APP_ID !== 'your_app_id_here' && APP_KEY !== 'your_app_key_here';

export async function searchJobs({ query = '', location = '', category = '', page = 1, perPage = 12, sortBy = 'date', salaryMin = 0, fullTime, permanent } = {}) {
  const params = new URLSearchParams({
    app_id: APP_ID,
    app_key: APP_KEY,
    results_per_page: String(perPage),
    'content-type': 'application/json',
  });
  if (query) params.set('what', query);
  if (location) params.set('where', location);
  if (category) params.set('category', category);
  if (sortBy === 'salary') params.set('sort_by', 'salary');
  if (sortBy === 'date') params.set('sort_by', 'date');
  if (salaryMin > 0) params.set('salary_min', String(salaryMin));
  if (fullTime) params.set('full_time', '1');
  if (permanent) params.set('permanent', '1');

  const res = await fetch(`${BASE_URL}/search/${page}?${params}`);
  if (!res.ok) throw new Error(`Adzuna API error: ${res.status}`);
  const data = await res.json();
  return {
    results: (data.results || []).map(normalizeJob),
    count: data.count || 0,
    page,
    totalPages: Math.ceil((data.count || 0) / perPage),
  };
}

export async function getCategories() {
  const params = new URLSearchParams({ app_id: APP_ID, app_key: APP_KEY });
  const res = await fetch(`${BASE_URL}/categories?${params}`);
  if (!res.ok) throw new Error(`Adzuna API error: ${res.status}`);
  const data = await res.json();
  return data.results || [];
}

function normalizeJob(job) {
  return {
    id: String(job.id),
    title: job.title || 'Untitled',
    company: { display_name: job.company?.display_name || 'Company', logo: (job.company?.display_name || 'CO').slice(0, 2).toUpperCase() },
    location: { display_name: job.location?.display_name || '', area: job.location?.area || [] },
    latitude: job.latitude, longitude: job.longitude,
    salary_min: job.salary_min || 0, salary_max: job.salary_max || 0,
    salary_is_predicted: job.salary_is_predicted || 0,
    description: job.description || '',
    category: { tag: job.category?.tag || '', label: job.category?.label || '' },
    contract_type: job.contract_type || job.contract_time || 'full_time',
    contract_time: job.contract_time || '',
    created: job.created || new Date().toISOString(),
    redirect_url: job.redirect_url || '#',
  };
}
