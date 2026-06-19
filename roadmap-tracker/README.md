# ⚡ The Coding Grind - 16-Week AI/ML Engineer Tracker

This application tracks progress through a comprehensive 16-week study roadmap to prepare for Generative AI and Machine Learning Engineering roles.

It features an interactive **Aetheric Steam Gauge** visual indicator, checklists for daily tasks, weekly review logging, a DSA pattern logging tool with weak pattern tracking, and a curated study library of resources.

## 🛠️ Tech Stack & Setup

- **Frontend**: React (Vite) + Tailwind CSS v4 + Lucide Icons
- **Database & Sync**: Supabase (Database, Auth, Row Level Security)
- **Deployment**: Vercel

---

## 📁 Directory Structure

- `roadmap-tracker/`: Vite React tracking application code.
- `supabase/schema.sql`: Database schema initialization script.
- `.agents/`: Custom agent skills and workspace rules.
- `.gitignore`: Configured ignores for `.env` credentials, dependencies, and reference folders.

---

## 🚀 How to Run Locally

1. Navigate to the app directory:
   ```bash
   cd roadmap-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_public_anon_key
   ```
4. Start the local server:
   ```bash
   npm run dev
   ```
5. Open **http://localhost:5173/** in your browser.

---

## ☁️ Deploying to Vercel

The Vercel deployment is configured to build the app from the `roadmap-tracker/` root directory. 

If redeploying:
1. Push any commits to your linked GitHub repository.
2. Vercel will automatically build and deploy the changes using the configured `roadmap-tracker/` Root Directory settings.
