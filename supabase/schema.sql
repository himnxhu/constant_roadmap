-- 1. Create completed_tasks table
CREATE TABLE public.completed_tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    task_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT unique_user_task UNIQUE(user_id, task_id)
);

-- Enable RLS for completed_tasks
ALTER TABLE public.completed_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to manage their own tasks"
ON public.completed_tasks
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);


-- 2. Create dsa_attempts table
CREATE TABLE public.dsa_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_name TEXT NOT NULL,
    pattern TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    solved_unaided TEXT DEFAULT 'Y' NOT NULL,
    time_taken INT,
    notes TEXT,
    week INT NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS for dsa_attempts
ALTER TABLE public.dsa_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to manage their own DSA attempts"
ON public.dsa_attempts
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);


-- 3. Create weekly_logs table
CREATE TABLE public.weekly_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    week INT NOT NULL,
    dsa_problems INT,
    unaided_pct INT,
    cs_topics TEXT,
    project_milestone TEXT DEFAULT 'N' NOT NULL,
    mock_done TEXT DEFAULT 'N' NOT NULL,
    confidence INT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT unique_user_week UNIQUE(user_id, week)
);

-- Enable RLS for weekly_logs
ALTER TABLE public.weekly_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to manage their own weekly logs"
ON public.weekly_logs
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
