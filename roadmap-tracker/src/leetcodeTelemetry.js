// LeetCode Stats Fetcher and Normalization Module
// Connects to multiple community APIs with resilient sequential fallback and high-fidelity local simulator fallback.

const API_TIMEOUT_MS = 6000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to fetch with timeout
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// Generate realistic mock telemetry if all API options fail
export function generateMockStats(username) {
  const nowSecs = Math.floor(Date.now() / 1000);
  const daySecs = 24 * 60 * 60;
  const mockCalendar = {};
  
  // Fill in active submission calendar for the last 120 days
  for (let i = 0; i < 120; i++) {
    const dayTimestamp = nowSecs - (i * daySecs);
    const dayStart = Math.floor(dayTimestamp / daySecs) * daySecs;
    
    // 45% chance of solving problems on any given day
    if (Math.random() > 0.55) {
      mockCalendar[String(dayStart)] = Math.floor(Math.random() * 4) + 1;
    }
  }

  // Generate deterministic stats based on username hash
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const easySolved = 40 + (hash % 60);
  const mediumSolved = 30 + (hash % 90);
  const hardSolved = 5 + (hash % 25);
  const totalSolved = easySolved + mediumSolved + hardSolved;

  return {
    username,
    ranking: 150000 + (hash % 450000),
    totalSolved,
    totalQuestions: 3300,
    easySolved,
    totalEasy: 820,
    mediumSolved,
    totalMedium: 1620,
    hardSolved,
    totalHard: 860,
    acceptanceRate: parseFloat((40 + (hash % 25) + Math.random()).toFixed(1)),
    contributionPoints: 120 + (hash % 1500),
    reputation: 10 + (hash % 200),
    submissionCalendar: mockCalendar,
    isSimulated: true
  };
}

// Normalized Parser for API 1: LeetCode Stats API (JeremyTsaii)
// Endpoint: https://leetcode-stats-api.herokuapp.com/<username>
function parseStatsApi(data, username) {
  if (data.status === 'error' || data.totalSolved === undefined) {
    throw new Error(data.message || 'Invalid stats data');
  }

  // submissionCalendar from this API is usually an object of { "timestamp": count }
  return {
    username,
    ranking: data.ranking || 999999,
    totalSolved: data.totalSolved || 0,
    totalQuestions: data.totalQuestions || 3300,
    easySolved: data.easySolved || 0,
    totalEasy: data.totalEasy || 800,
    mediumSolved: data.mediumSolved || 0,
    totalMedium: data.totalMedium || 1600,
    hardSolved: data.hardSolved || 0,
    totalHard: data.totalHard || 900,
    acceptanceRate: data.acceptanceRate || 0,
    contributionPoints: data.contributionPoints || 0,
    reputation: data.reputation || 0,
    submissionCalendar: data.submissionCalendar || {},
    isSimulated: false
  };
}

// Normalized Parser for API 2: Alfa LeetCode API
// Endpoint: https://alfa-leetcode-api.onrender.com/userSolved?username=<username>
// Endpoint 2: https://alfa-leetcode-api.onrender.com/<username>/solved
function parseAlfaApi(solvedData, profileData, calendarData, username) {
  // If we don't have basic counts, fail
  const hasSolvedField = 'solvedProblem' in solvedData || 'totalSolved' in solvedData || 'easySolved' in solvedData;
  if (!hasSolvedField) {
    throw new Error('Invalid Alfa API data structure');
  }
  
  const totalSolved = solvedData.solvedProblem !== undefined ? solvedData.solvedProblem : (solvedData.totalSolved || 0);

  // Parse submission calendar
  // Alfa API can return calendar as a stringified object or structured array
  let parsedCalendar = {};
  if (calendarData && calendarData.submissionCalendar) {
    try {
      if (typeof calendarData.submissionCalendar === 'string') {
        parsedCalendar = JSON.parse(calendarData.submissionCalendar);
      } else {
        parsedCalendar = calendarData.submissionCalendar;
      }
    } catch (e) {
      console.warn('Failed to parse calendar from Alfa API:', e);
    }
  }

  let acceptanceRate = parseFloat(solvedData.acceptanceRate || 0);
  if (acceptanceRate === 0 && solvedData.totalSubmissionNum && solvedData.acSubmissionNum) {
    const totalAll = solvedData.totalSubmissionNum.find(x => x.difficulty === 'All');
    const acAll = solvedData.acSubmissionNum.find(x => x.difficulty === 'All');
    if (totalAll && acAll && totalAll.submissions > 0) {
      acceptanceRate = parseFloat(((acAll.submissions / totalAll.submissions) * 100).toFixed(1));
    }
  }

  return {
    username,
    ranking: profileData?.ranking || solvedData.ranking || 999999,
    totalSolved,
    totalQuestions: (solvedData.totalEasy || 800) + (solvedData.totalMedium || 1600) + (solvedData.totalHard || 900),
    easySolved: solvedData.easySolved || 0,
    totalEasy: solvedData.totalEasy || 820,
    mediumSolved: solvedData.mediumSolved || 0,
    totalMedium: solvedData.totalMedium || 1620,
    hardSolved: solvedData.hardSolved || 0,
    totalHard: solvedData.totalHard || 860,
    acceptanceRate,
    contributionPoints: solvedData.contributionPoints || profileData?.contributionPoints || 0,
    reputation: profileData?.reputation || 0,
    submissionCalendar: parsedCalendar,
    isSimulated: false
  };
}

// Core Orchestrator
export async function getLeetcodeStats(username) {
  const cleanUsername = username.trim();
  if (!cleanUsername) throw new Error('Username cannot be empty');

  // Trigger local simulation directly for dry run/debug testing
  if (cleanUsername.toLowerCase() === 'debug_user' || cleanUsername.toLowerCase() === 'demo') {
    await delay(1000); // Simulate network latency
    return generateMockStats(cleanUsername);
  }

  // --- GATEWAY 1: LeetCode Stats API (Heroku / CORS-enabled Proxy) ---
  try {
    console.log(`🌐 [LeetCode Sync] Attempting API Gateway 1 for: ${cleanUsername}`);
    const res = await fetchWithTimeout(`https://leetcode-stats-api.herokuapp.com/${cleanUsername}`);
    if (res.ok) {
      const data = await res.json();
      return parseStatsApi(data, cleanUsername);
    }
  } catch (err) {
    console.warn('❌ [LeetCode Sync] Gateway 1 Failed:', err.message);
  }

  // --- GATEWAY 2: Alfa LeetCode API (Render Proxy) ---
  try {
    console.log(`🌐 [LeetCode Sync] Attempting API Gateway 2 (Alfa) for: ${cleanUsername}`);
    // Parallel fetches to speed up Render spinup
    const urls = [
      `https://alfa-leetcode-api.onrender.com/${cleanUsername}/solved`,
      `https://alfa-leetcode-api.onrender.com/${cleanUsername}`,
      `https://alfa-leetcode-api.onrender.com/${cleanUsername}/calendar`
    ];
    
    const [solvedRes, profileRes, calendarRes] = await Promise.all(
      urls.map(url => fetchWithTimeout(url).catch(e => {
        console.warn(`Fetch failed for ${url}:`, e.message);
        return null;
      }))
    );

    if (solvedRes && solvedRes.ok) {
      const solvedData = await solvedRes.json();
      const profileData = (profileRes && profileRes.ok) ? await profileRes.json() : null;
      const calendarData = (calendarRes && calendarRes.ok) ? await calendarRes.json() : null;
      
      return parseAlfaApi(solvedData, profileData, calendarData, cleanUsername);
    }
  } catch (err) {
    console.warn('❌ [LeetCode Sync] Gateway 2 (Alfa) Failed:', err.message);
  }

  // --- GATEWAY 3: Alternative Vercel Instance ---
  try {
    console.log(`🌐 [LeetCode Sync] Attempting API Gateway 3 (Vercel Proxy) for: ${cleanUsername}`);
    const res = await fetchWithTimeout(`https://leetcode-api-faisal.vercel.app/api/${cleanUsername}`);
    if (res.ok) {
      const data = await res.json();
      // Adjust structure if Vercel endpoint format matches Stats API
      if (data.totalSolved || data.solved) {
        return parseStatsApi(data, cleanUsername);
      }
    }
  } catch (err) {
    console.warn('❌ [LeetCode Sync] Gateway 3 (Vercel) Failed:', err.message);
  }

  // --- FALLBACK: Simulation Mode ---
  console.warn('⚠️ [LeetCode Sync] All gateways exhausted or offline. Activating Simulated Telemetry.');
  return {
    ...generateMockStats(cleanUsername),
    isSimulated: true
  };
}
