export const ROADMAP_SOURCES = {
  dsa: [
    {
      title: "Striver's SDE Sheet (180 Problems)",
      url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
      description: "Highly curated list of 180 questions for SDE interviews. Excellent for rapid pattern learning.",
      recommended: true
    },
    {
      title: "NeetCode 150",
      url: "https://neetcode.io/practice",
      description: "150 categorized questions with video explanations for every single problem. Perfect for visual learners."
    },
    {
      title: "Striver's A2Z DSA Sheet",
      url: "https://takeuforward.org/strivers-a2z-dsa-course-sheet-instructions/",
      description: "Detailed 450+ question course sheet, teaching step-by-step optimization from brute force to optimal."
    }
  ],
  cs: [
    {
      title: "GeeksforGeeks Operating Systems Prep",
      url: "https://www.geeksforgeeks.org/operating-systems/",
      description: "Consolidated, interview-focused articles covering CPU scheduling, threads, deadlocks, and memory management."
    },
    {
      title: "GeeksforGeeks DBMS Prep & Normalization",
      url: "https://www.geeksforgeeks.org/dbms/",
      description: "Quick read guides covering transaction isolation levels, normalization (1NF-3NF), indexing, and ACID."
    },
    {
      title: "GeeksforGeeks Computer Networks (CN) Prep",
      url: "https://www.geeksforgeeks.org/computer-network-tutorials/",
      description: "Networking fundamentals: HTTP protocols, TCP/UDP, sockets, and client-server model."
    },
    {
      title: "SQLZoo Sandbox Practice",
      url: "https://sqlzoo.net/",
      description: "Interactive SQL training playground. Excellent for testing SQL queries and joins without any setup."
    }
  ],
  genai: [
    {
      title: "The Illustrated Transformer (Jay Alammar)",
      url: "https://jalammar.github.io/illustrated-transformer/",
      description: "The gold standard visual explanation of Attention, Query/Key/Value vectors, and Transformer architectures.",
      recommended: true
    },
    {
      title: "Attention Is All You Need Paper",
      url: "https://arxiv.org/abs/1706.03762",
      description: "The seminal research paper introducing the Transformer network."
    },
    {
      title: "Pinecone Learning Center (RAG & Vector Search)",
      url: "https://www.pinecone.io/learn/",
      description: "In-depth conceptual articles explaining chunking strategies, embeddings, similarity metrics, and retrieval."
    },
    {
      title: "LangChain Documentation",
      url: "https://python.langchain.com/docs/get_started/introduction",
      description: "Official documents to understand document loaders, text splitters, vector stores, and chains."
    },
    {
      title: "Hugging Face Blog: LoRA & Fine-tuning",
      url: "https://huggingface.co/blog/lora",
      description: "Conceptual and practical explainers detailing Low-Rank Adaptation (LoRA) and parameter-efficient tuning."
    }
  ]
};

export const ROADMAP_PHASES = [
  {
    name: "Phase 1: Foundation",
    weeks: "Weeks 1-8",
    focus: "DSA patterns + CS fundamentals + understand your own projects deeply",
    exitCriteria: "Solve easy-medium DSA in 20-30 min unaided. Explain OS/DBMS/networking basics cold. Explain your projects 2 layers deep."
  },
  {
    name: "Phase 2: Specialization",
    weeks: "Weeks 6-14 (overlap)",
    focus: "Deep GenAI/ML engineering — transformers, RAG internals, eval pipelines",
    exitCriteria: "Can explain and rebuild core logic of your AI projects without leaning on AI to write it."
  },
  {
    name: "Phase 3: Interview Reps",
    weeks: "Weeks 10-16 (overlap)",
    focus: "Mock interviews, behavioral prep, consistent applications",
    exitCriteria: "Comfortable in live coding rounds + can tell your story (no placement -> self-directed fix) confidently."
  }
];

export const ROADMAP_WEEKS = [
  {
    weekNumber: 1,
    phase: "Foundation",
    theme: "Arrays, Strings, Hashing — and admit what you don't know",
    dsaFocus: "Arrays & Strings basics, Two Pointers, Sliding Window (~15-20 problems)",
    csFocus: "OS Basics: processes vs threads, memory management. Start re-reading your PDF QA System code line by line.",
    milestone: "Solve 15+ easy array/string problems. Can explain process vs thread to a 10-year-old.",
    days: [
      { day: "Mon", dsa: "Arrays basics: 3-4 easy problems (max subarray, rotate array, etc)", cs: "OS: what is a process? Process states diagram. Write notes in your own words.", project: "Open PDF QA System code. List every file and what it does, no AI help." },
      { day: "Tue", dsa: "Strings basics: 3-4 easy problems (reverse, palindrome check, anagrams)", cs: "OS: process vs thread — differences, when to use which, real examples", project: "Trace one full request: PDF upload -> chunking -> embedding -> storage" },
      { day: "Wed", dsa: "Two Pointers pattern: 3-4 problems (pair sum, remove duplicates)", cs: "OS: context switching, what happens during it", project: "Trace retrieval: query -> embedding -> FAISS search -> top-k results" },
      { day: "Thu", dsa: "Two Pointers continued: 3-4 medium problems", cs: "OS: memory management basics — stack vs heap", project: "Identify 3 things you DON'T fully understand in your own code yet" },
      { day: "Fri", dsa: "Sliding Window intro: 3-4 problems (max subarray sum of size k)", cs: "OS: virtual memory, paging (just the concept, not deep math)", project: "Research + understand those 3 gaps (docs, not just asking AI to explain)" },
      { day: "Sat", dsa: "Sliding Window continued + review week's weak problems", cs: "Review all OS notes from this week — explain each topic out loud to yourself, no notes", project: "Write a 1-page architecture summary of PDF QA System from memory" }
    ]
  },
  {
    weekNumber: 2,
    phase: "Foundation",
    theme: "Hashing deep-dive + recursion intro",
    dsaFocus: "HashMaps/HashSets, Frequency problems, intro to Recursion (~15-20 problems)",
    csFocus: "OS: deadlocks, scheduling basics. Map out your Resume Analyzer's full data flow on paper.",
    milestone: "Solve a hashing problem in under 15 min unaided. Diagram your Resume Analyzer end-to-end.",
    days: [
      { day: "Mon", dsa: "HashMaps: 3-4 problems (two sum, first unique char)", cs: "OS: deadlocks — what causes them, 4 necessary conditions", project: "Open Resume Analyzer code. List every file, what each does" },
      { day: "Tue", dsa: "HashSets: 3-4 problems (duplicates, intersections)", cs: "OS: deadlock prevention/avoidance basics (just concepts)", project: "Trace: resume upload -> spaCy parsing -> what gets extracted" },
      { day: "Wed", dsa: "Frequency counting problems: 3-4 (anagram groups, top k frequent)", cs: "OS: CPU scheduling algorithms (FCFS, SJF, Round Robin) — concept level", project: "Trace: Sentence Transformers embedding -> FAISS matching logic" },
      { day: "Thu", dsa: "Recursion intro: factorial, fibonacci, sum of digits — write from scratch", cs: "Networking will start week 5 — today: review week 1 OS notes, fill gaps", project: "Diagram the full Resume Analyzer pipeline on paper (photograph it)" },
      { day: "Fri", dsa: "Recursion: 3-4 easy problems (power function, reverse string recursively)", cs: "Mock self-quiz: write 10 OS questions and answer them without notes", project: "Identify and research 2-3 gaps in your understanding" },
      { day: "Sat", dsa: "Mixed review: redo 2 hardest problems from this week unaided, timed", cs: "Review + flashcard pass on all OS topics so far", project: "Write a 1-page architecture summary of Resume Analyzer from memory" }
    ]
  },
  {
    weekNumber: 3,
    phase: "Foundation",
    theme: "Recursion + Backtracking",
    dsaFocus: "Recursion patterns, Backtracking (subsets, permutations) (~15 problems)",
    csFocus: "DBMS: normalization (1NF-3NF), primary/foreign keys. Rebuild SQL queries for your projects from scratch (no AI).",
    milestone: "Solve a backtracking problem (e.g. subsets) unaided. Write 5 SQL queries cold, no autocomplete.",
    days: [
      { day: "Mon", dsa: "Recursion: backtracking intro — subsets problem from scratch", cs: "DBMS: what is normalization, why it matters (with a bad-design example)", project: "Open Smart Leave Tracker code. List files + what each does" },
      { day: "Tue", dsa: "Backtracking: permutations problem", cs: "DBMS: 1NF, 2NF, 3NF — work through one example table yourself", project: "Trace: Google Apps Script trigger -> Slack webhook flow end to end" },
      { day: "Wed", dsa: "Backtracking: combination sum problem", cs: "DBMS: primary keys vs foreign keys vs unique keys", project: "Understand your Docker setup: what's in the Dockerfile and why" },
      { day: "Thu", dsa: "Backtracking: 2-3 medium problems (N-Queens intro level, word search)", cs: "SQL: write 5 SELECT queries from scratch (no autocomplete/AI) on a sample table", project: "Understand your AWS EC2 deployment: how does a request reach your app" },
      { day: "Fri", dsa: "Mixed recursion/backtracking: 2-3 problems, no hints first 25 min", cs: "SQL: write 5 JOIN queries from scratch (inner, left, right)", project: "Identify 2-3 gaps, research them properly" },
      { day: "Sat", dsa: "Review week: redo your 2 hardest backtracking problems unaided", cs: "SQL: write 3 aggregate queries (GROUP BY, HAVING) from scratch", project: "Write a 1-page architecture summary of Leave Tracker from memory" }
    ]
  },
  {
    weekNumber: 4,
    phase: "Foundation",
    theme: "Linked Lists + Stacks/Queues",
    dsaFocus: "Linked List ops, reversal, cycle detection, Stack/Queue problems (~15-20 problems)",
    csFocus: "DBMS: indexing, joins (inner/outer/cross), transactions & ACID. Start applying to 5-10 jobs/week from this week.",
    milestone: "Reverse a linked list + detect cycle unaided. Explain ACID properties with a real example.",
    days: [
      { day: "Mon", dsa: "Linked Lists: implement singly linked list from scratch (no AI)", cs: "DBMS: indexing — what it is, how it speeds up queries, trade-offs", project: "Open Team Task Manager code. List files + structure" },
      { day: "Tue", dsa: "Linked Lists: reverse a linked list (iterative + recursive)", cs: "DBMS: transactions and ACID properties, with a real-world example", project: "Trace: Node.js/Express API routes -> PostgreSQL queries end to end" },
      { day: "Wed", dsa: "Linked Lists: detect cycle (Floyd's algorithm), find middle node", cs: "DBMS: isolation levels (just concept level, dirty reads etc)", project: "Understand your auth flow (if any) and data validation approach" },
      { day: "Thu", dsa: "Stacks: implement from scratch, 2-3 problems (valid parentheses, etc)", cs: "START job applications this week: update resume, apply to 5+ roles", project: "Identify 2-3 gaps in understanding, research them" },
      { day: "Fri", dsa: "Queues: implement from scratch, 2-3 problems", cs: "Apply to 5+ more roles (Naukri, Wellfound, LinkedIn, AngelList)", project: "Write a 1-page architecture summary of Task Manager from memory" },
      { day: "Sat", dsa: "Review: redo hardest linked list + stack problem unaided, timed", cs: "Review DBMS topics — self-quiz, no notes", project: "Catch-up / buffer for any unfinished project tracing this week" }
    ]
  },
  {
    weekNumber: 5,
    phase: "Foundation",
    theme: "Trees I — Binary Trees & BST",
    dsaFocus: "Tree traversals (in/pre/post, BFS), BST operations (~15-20 problems)",
    csFocus: "Networking: HTTP methods/status codes, REST principles, client-server model. Rebuild your Leave Tracker's webhook flow from memory.",
    milestone: "Solve a BST validation problem unaided. Explain REST vs RPC in your own words.",
    days: [
      { day: "Mon", dsa: "Trees: implement binary tree, in-order/pre-order/post-order traversal from scratch", cs: "Networking: client-server model, what happens when you visit a URL", project: "Pick your weakest-understood project, re-trace it fully end to end" },
      { day: "Tue", dsa: "Trees: BFS (level order traversal) — 2-3 problems", cs: "Networking: HTTP methods (GET/POST/PUT/DELETE), status codes (2xx/4xx/5xx)", project: "Write down every API/library call and what it actually does under the hood" },
      { day: "Wed", dsa: "Trees: DFS-based problems — 2-3 (max depth, path sum)", cs: "Networking: REST principles — statelessness, resources, what makes an API RESTful", project: "Research the 'why' behind 2-3 architecture decisions you made (or AI made)" },
      { day: "Thu", dsa: "BST: implement insert/search/delete from scratch", cs: "Networking: TCP vs UDP basics, what is a socket", project: "Practice explaining this project out loud, 3 min, recorded if possible" },
      { day: "Fri", dsa: "BST: validate BST, 2-3 medium problems", cs: "Apply to 5+ more roles this week", project: "Listen back / re-read your explanation — fix unclear parts" },
      { day: "Sat", dsa: "Review: redo hardest tree problem unaided, timed", cs: "Review networking topics — self-quiz, no notes", project: "Buffer / catch-up day" }
    ]
  },
  {
    weekNumber: 6,
    phase: "Foundation + Specialization starts",
    theme: "Trees II + start ML fundamentals",
    dsaFocus: "Tree problems (LCA, diameter, balanced checks), intro Heaps (~15 problems)",
    csFocus: "START Specialization: how transformers work (attention mechanism) — read + summarize in your own words, no copy-paste.",
    milestone: "Solve a tree-LCA style problem unaided. Write a 1-page plain-English explanation of self-attention.",
    days: [
      { day: "Mon", dsa: "Trees: LCA (lowest common ancestor) problem from scratch", cs: "Specialization starts: read about Transformer architecture (attention conceptually)", project: "Re-open PDF QA System — re-read your week 1 architecture summary" },
      { day: "Tue", dsa: "Trees: diameter of tree, balanced tree check — 2 problems", cs: "Write a 1-page plain-English explanation of self-attention — your own words only", project: "Identify exactly which parts use embeddings and how they're generated" },
      { day: "Wed", dsa: "Trees: 2-3 more medium tree problems, mixed", cs: "Understand Q/K/V (query/key/value) at a conceptual level — no heavy math needed", project: "Research: why FAISS specifically? What are the alternatives (Pinecone, Chroma, etc)?" },
      { day: "Thu", dsa: "Heaps intro: what is a heap, implement basic min-heap logic", cs: "Understand positional encoding — why transformers need it", project: "Write down 3 ways you'd improve this project's retrieval quality" },
      { day: "Fri", dsa: "Heaps: 2-3 problems (kth largest element, etc)", cs: "Read about embeddings: what they represent, how similarity is measured (cosine etc)", project: "Buffer / catch-up" },
      { day: "Sat", dsa: "Review: redo hardest tree/heap problem unaided, timed", cs: "Self-quiz: explain attention mechanism out loud, no notes, time yourself", project: "Buffer / catch-up" }
    ]
  },
  {
    weekNumber: 7,
    phase: "Foundation + Specialization",
    theme: "Heaps + Graphs intro",
    dsaFocus: "Heap/Priority Queue problems, Graph representations + BFS/DFS (~15-20 problems)",
    csFocus: "RAG internals: embeddings, vector similarity, chunking strategies. Map exactly how FAISS retrieval works in your PDF QA project.",
    milestone: "Solve a heap-based problem (k-largest etc) unaided. Diagram your RAG pipeline with every step labeled.",
    days: [
      { day: "Mon", dsa: "Heaps: 2-3 more problems (merge k sorted lists style, median finder)", cs: "RAG internals: what is RAG, why it exists (vs pure LLM, vs fine-tuning)", project: "Diagram your full RAG pipeline (PDF QA System) — every step labeled" },
      { day: "Tue", dsa: "Graphs intro: representations (adjacency list/matrix) — code both from scratch", cs: "RAG: chunking strategies — fixed size vs semantic chunking, trade-offs", project: "Identify weakest link in your pipeline (chunking? retrieval? prompt?)" },
      { day: "Wed", dsa: "Graphs: BFS implementation + 2 problems", cs: "RAG: embedding models — what makes a good embedding model", project: "Research how you'd fix/improve that weakest link specifically" },
      { day: "Thu", dsa: "Graphs: DFS implementation + 2 problems", cs: "RAG: retrieval strategies — top-k, re-ranking, hybrid search (concept level)", project: "Note 2-3 questions an interviewer might ask about this project + draft answers" },
      { day: "Fri", dsa: "Graphs: 2-3 mixed BFS/DFS problems (islands, connected components)", cs: "Map out your PDF QA System's RAG pipeline with every step labeled, on paper", project: "Buffer / catch-up" },
      { day: "Sat", dsa: "Review: redo hardest graph problem unaided, timed", cs: "Self-quiz: explain your own RAG pipeline out loud, no notes", project: "Buffer / catch-up" }
    ]
  },
  {
    weekNumber: 8,
    phase: "Foundation wraps + Mock interviews begin",
    theme: "Graphs II + Phase 1 checkpoint",
    dsaFocus: "Graph problems (topological sort, shortest path basics), REVIEW WEEK — redo your logged weak patterns",
    csFocus: "Eval pipelines: how do you measure if a RAG/LLM system is 'good'? Write your own evaluation checklist. FIRST MOCK INTERVIEW this week.",
    milestone: "Pass a self-check: solve 3 random medium problems from weeks 1-7 unaided. Do 1 mock interview.",
    days: [
      { day: "Mon", dsa: "Graphs: topological sort — implement from scratch, 1-2 problems", cs: "Eval pipelines: how do you measure if a RAG/LLM system is 'good'? Research metrics (precision/recall, faithfulness, relevance)", project: "Re-read all 4 project architecture summaries you've written so far" },
      { day: "Tue", dsa: "Graphs: shortest path basics (Dijkstra concept + 1 problem)", cs: "Write your own evaluation checklist for an LLM-based system", project: "Tighten each summary to a clean 60-90 second verbal pitch" },
      { day: "Wed", dsa: "REVIEW DAY: redo 3 problems flagged 'needed help' from weeks 1-3", cs: "Apply your eval checklist to your PDF QA System — where does it fall short?", project: "Practice all 4 pitches out loud, recorded" },
      { day: "Thu", dsa: "REVIEW DAY: redo 3 problems flagged 'needed help' from weeks 4-5", cs: "PREP for first mock interview: review your 4 project summaries", project: "Listen back, identify weakest pitch, rewrite it" },
      { day: "Fri", dsa: "REVIEW DAY: redo 3 problems flagged 'needed help' from weeks 6-7", cs: "PREP: write out likely technical questions for each project + answers", project: "Buffer / catch-up before mock interview" },
      { day: "Sat", dsa: "CHECKPOINT: solve 3 random medium problems (mixed topics) fully unaided, timed", cs: "FIRST MOCK INTERVIEW this week (book it via Pramp or a peer) + review notes after", project: "Post-mock-interview: write down every question you struggled with" }
    ]
  },
  {
    weekNumber: 9,
    phase: "Specialization deepens",
    theme: "Dynamic Programming I",
    dsaFocus: "DP basics: 1D DP, knapsack patterns (~15 problems)",
    csFocus: "Fine-tuning vs RAG: when to use which, LoRA basics conceptually. Start rebuilding PDF QA core logic yourself (no AI-written retrieval logic).",
    milestone: "Solve a 1D DP problem (climbing stairs, house robber style) unaided. Rebuild 30% of PDF QA retrieval logic solo.",
    days: [
      { day: "Mon", dsa: "DP intro: what is memoization vs tabulation — implement fibonacci both ways", cs: "Fine-tuning vs RAG: research when to use which, write comparison notes", project: "Set up a clean branch/copy of PDF QA System for the rebuild" },
      { day: "Tue", dsa: "DP: climbing stairs, house robber style problems (3-4)", cs: "LoRA basics: what it is conceptually, why it's efficient (no need for deep math)", project: "Rebuild chunking logic — test it actually works on a sample PDF" },
      { day: "Wed", dsa: "DP: 0/1 Knapsack — implement from scratch, understand deeply", cs: "Read about prompt engineering vs fine-tuning vs RAG as a decision framework", project: "Rebuild embedding generation call — test + compare output to original" },
      { day: "Thu", dsa: "DP: knapsack variants — 2-3 problems", cs: "Start REBUILD: rewrite PDF QA chunking logic yourself, no AI-generated code", project: "Rebuild FAISS search logic — test retrieval quality" },
      { day: "Fri", dsa: "DP: coin change style problems — 2-3", cs: "Continue REBUILD: rewrite embedding generation call yourself, understand every param", project: "Document what you changed and WHY in a short README" },
      { day: "Sat", dsa: "Review: redo hardest DP problem unaided, timed", cs: "Continue REBUILD: rewrite FAISS index creation/search yourself", project: "Buffer / catch-up on rebuild" }
    ]
  },
  {
    weekNumber: 10,
    phase: "Specialization + Interview reps",
    theme: "Dynamic Programming II",
    dsaFocus: "DP: 2D DP, string DP (LCS, edit distance) (~15 problems)",
    csFocus: "Continue rebuild of PDF QA project core logic. 2nd mock interview this week — focus on explaining this project live.",
    milestone: "Solve a 2D DP problem unaided. Explain your rebuilt project's architecture in a 5-min mock pitch.",
    days: [
      { day: "Mon", dsa: "DP: Longest Common Subsequence (LCS) — implement from scratch", cs: "Continue REBUILD: rewrite the prompt construction / chaining logic yourself", project: "Finish full PDF QA System rebuild — confirm it runs end to end" },
      { day: "Tue", dsa: "DP: Edit Distance — implement from scratch", cs: "Continue REBUILD: rewrite the answer generation call + response handling", project: "Write a clean 5-min mock pitch: 'here's what I personally built and why'" },
      { day: "Wed", dsa: "DP: string DP — 2-3 more problems", cs: "Test full rebuilt pipeline end to end — fix any bugs yourself first before asking AI", project: "Practice the pitch out loud 3x, refine based on what feels shaky" },
      { day: "Thu", dsa: "DP: 2D grid DP — 2-3 problems (unique paths, min path sum)", cs: "PREP for mock interview #2: focus entirely on explaining rebuilt project live", project: "Update GitHub README for this project with your rebuild notes" },
      { day: "Fri", dsa: "Mixed DP review — 2-3 problems, timed, no hints first 30 min", cs: "Practice live coding explanation: screen-share style walkthrough, recorded", project: "Push rebuilt version to GitHub (himnxhu) with clear commit history" },
      { day: "Sat", dsa: "Review: redo hardest 2D DP problem unaided, timed", cs: "MOCK INTERVIEW #2 this week + review notes after", project: "Buffer / post-mock-interview review" }
    ]
  },
  {
    weekNumber: 11,
    phase: "Interview reps + Specialization",
    theme: "Tries + Bit Manipulation",
    dsaFocus: "Tries, basic Bit Manipulation problems (~10-15 problems)",
    csFocus: "Prompt-engineering vs actual engineering: be ready to explain what YOU built vs what AI scaffolded, for every project. Mock interview #3.",
    milestone: "Solve a trie-based problem unaided. Have a clean 1-line answer ready for 'what did AI build vs what did you build' per project.",
    days: [
      { day: "Mon", dsa: "Tries: implement a trie from scratch, 1-2 problems (word search/autocomplete)", cs: "For EACH project, write 1 line: 'what AI scaffolded vs what I personally understand/built'", project: "Pick your 2nd project (Resume Analyzer) — apply same rebuild approach to ONE core piece" },
      { day: "Tue", dsa: "Bit Manipulation: basics (AND/OR/XOR/shifts), 2-3 easy problems", cs: "Practice explaining this honestly in interview language — confident, not defensive", project: "Rebuild the spaCy parsing or matching logic yourself, test it" },
      { day: "Wed", dsa: "Bit Manipulation: 2-3 more problems (single number, count bits)", cs: "Re-verify: can you modify/extend each project's core logic without AI right now? Test it.", project: "Document what changed, push to GitHub" },
      { day: "Thu", dsa: "Mixed review: 2-3 problems from tries/bit manipulation, timed", cs: "PREP for mock interview #3: focus on 'AI usage' questions + technical depth", project: "Update resume bullet points to reflect what you personally built (be specific)" },
      { day: "Fri", dsa: "Catch-up on any weak pattern from weeks 9-10 (DP focus)", cs: "Practice answering 'how did you use AI in this project' out loud, recorded", project: "Buffer / catch-up" },
      { day: "Sat", dsa: "Review: redo hardest trie/bit problem unaided, timed", cs: "MOCK INTERVIEW #3 this week + review notes after", project: "Post-mock-interview review notes" }
    ]
  },
  {
    weekNumber: 12,
    phase: "Interview reps",
    theme: "Sliding Window/Two Pointer advanced + Greedy",
    dsaFocus: "Advanced sliding window, Greedy algorithm problems (~15 problems)",
    csFocus: "Behavioral prep: write out your 'no campus placement, here's what I did' story. Polish resume with rebuilt project details. Mock interview #4.",
    milestone: "Solve a greedy problem unaided. Resume updated with specifics on what you personally built.",
    days: [
      { day: "Mon", dsa: "Sliding Window advanced: 2-3 harder problems (longest substring variants)", cs: "Write out your full 'no campus placement' story — honest, structured (situation -> action -> result)", project: "Finalize resume with all 4 projects reflecting rebuilt/understood work" },
      { day: "Tue", dsa: "Two Pointer advanced: 2-3 harder problems", cs: "Refine the story: cut anything defensive, keep it confident and forward-looking", project: "Make sure GitHub profile (himnxhu) reflects clean commit history on rebuilt projects" },
      { day: "Wed", dsa: "Greedy algorithms: intro + 2-3 problems (activity selection, jump game)", cs: "Practice telling the story out loud, recorded, under 2 minutes", project: "Write/update GitHub README files to be recruiter-readable (clear, not AI-bloated)" },
      { day: "Thu", dsa: "Greedy: 2-3 more problems", cs: "Update full resume: rebuilt projects, specific contributions, clean formatting", project: "Cross-check resume claims against what you can ACTUALLY explain live" },
      { day: "Fri", dsa: "Mixed review: 2-3 problems across all patterns so far, timed", cs: "Get resume reviewed (peer, mentor, or careful AI-assisted critique you actually read)", project: "Buffer / catch-up" },
      { day: "Sat", dsa: "Review: redo hardest greedy problem unaided, timed", cs: "MOCK INTERVIEW #4 this week (behavioral + technical mix) + review notes", project: "Post-mock-interview review notes" }
    ]
  },
  {
    weekNumber: 13,
    phase: "Interview reps",
    theme: "Mixed review + weak pattern focus",
    dsaFocus: "Redo every problem flagged 'solved with help' in your DSA log — no new patterns this week",
    csFocus: "System design basics: how would you scale Rekroo's voice calling to 10k concurrent calls? Practice explaining out loud. Mock interview #5.",
    milestone: "Clear your entire weak-pattern backlog. Give a clean 5-min system design answer for Rekroo scaling.",
    days: [
      { day: "Mon", dsa: "WEAK PATTERN REVIEW: pull your DSA log, list every 'solved with help' problem", cs: "System Design basics: client-server, load balancing, caching — concept level", project: "Review Rekroo's current architecture (Next.js + Prisma) end to end" },
      { day: "Tue", dsa: "Redo all flagged weak problems from Arrays/Strings/Hashing/Recursion", cs: "System Design: databases at scale — read replicas, sharding (concept level)", project: "Identify the actual bottlenecks if this scaled 100x — be specific, not vague" },
      { day: "Wed", dsa: "Redo all flagged weak problems from Trees/Heaps/Graphs", cs: "Apply system design thinking to Rekroo: how would voice calling scale to 10k concurrent calls?", project: "Write a 1-page 'how I'd scale Rekroo' doc — use this as interview material" },
      { day: "Thu", dsa: "Redo all flagged weak problems from DP", cs: "Write out your Rekroo scaling answer in structured form (bottlenecks, solutions)", project: "Buffer / catch-up on weak pattern review" },
      { day: "Fri", dsa: "Redo all flagged weak problems from Tries/Bit Manipulation/Greedy", cs: "Practice explaining it out loud, recorded, refine for clarity", project: "Buffer / catch-up" },
      { day: "Sat", dsa: "Full review: pick 5 random problems across all topics, solve timed, unaided", cs: "MOCK INTERVIEW #5 this week (include a system design question) + review notes", project: "Post-mock-interview review notes" }
    ]
  },
  {
    weekNumber: 14,
    phase: "Interview reps",
    theme: "Timed contest simulation",
    dsaFocus: "2 full timed mock contests (45-60 min, 2-3 problems each), review mistakes deeply",
    csFocus: "CS fundamentals rapid review: OS+DBMS+networking flashcard pass. Mock interview #6.",
    milestone: "Complete 2 timed contests. Score 80%+ on a self-made CS fundamentals quiz.",
    days: [
      { day: "Mon", dsa: "TIMED CONTEST #1: 2-3 mixed problems, 45-60 min, simulate real conditions", cs: "Rapid review: OS flashcard pass — processes, threads, deadlocks, scheduling, memory", project: "Re-read all project architecture docs + scaling doc — refresh memory" },
      { day: "Tue", dsa: "Review contest #1 mistakes deeply — why did you get stuck, what pattern was it", cs: "Rapid review: DBMS flashcard pass — normalization, indexing, ACID, joins", project: "Practice all project pitches back to back, timed, recorded" },
      { day: "Wed", dsa: "TIMED CONTEST #2: 2-3 mixed problems, 45-60 min", cs: "Rapid review: Networking flashcard pass — HTTP, REST, TCP/UDP, client-server", project: "Identify the weakest pitch, rewrite and re-practice it" },
      { day: "Thu", dsa: "Review contest #2 mistakes deeply", cs: "Make yourself a 20-question CS fundamentals quiz, take it cold", project: "Buffer / catch-up" },
      { day: "Fri", dsa: "Light review day: redo 2-3 problems you got wrong in contests, unaided this time", cs: "Review wrong answers from your self-quiz, fix gaps", project: "Buffer / catch-up" },
      { day: "Sat", dsa: "Rest / light review — don't cram new patterns", cs: "MOCK INTERVIEW #6 this week + review notes", project: "Post-mock-interview review notes" }
    ]
  },
  {
    weekNumber: 15,
    phase: "Interview reps + applications push",
    theme: "Full interview simulation week",
    dsaFocus: "Daily 1 timed problem (maintenance, not new learning) + review",
    csFocus: "Apply aggressively (15-20 applications this week). 2 mock interviews back to back, including one with a stranger/peer not just self-review.",
    milestone: "2 mock interviews completed this week. 15+ live applications sent.",
    days: [
      { day: "Mon", dsa: "Maintenance: 1 timed medium problem, unaided", cs: "APPLICATIONS PUSH: apply to 5+ roles today, tailor each application", project: "Final portfolio check: GitHub, resume, LinkedIn all consistent and updated" },
      { day: "Tue", dsa: "Maintenance: 1 timed medium problem, unaided", cs: "APPLICATIONS PUSH: apply to 5+ more roles", project: "Make sure every live project link actually works (test each deployed project)" },
      { day: "Wed", dsa: "Maintenance: 1 timed medium problem, unaided", cs: "APPLICATIONS PUSH: apply to 5+ more roles (target: 15-20 this week)", project: "Prep specific talking points for whichever companies you're actively interviewing with" },
      { day: "Thu", dsa: "Maintenance: 1 timed medium problem, unaided", cs: "Follow up on any applications from week 4 onward that went silent", project: "Buffer / catch-up" },
      { day: "Fri", dsa: "Maintenance: 1 timed medium problem, unaided", cs: "MOCK INTERVIEW #7 (with a peer or stranger, not self-review) + review notes", project: "Post-mock-interview review (interview #7)" },
      { day: "Sat", dsa: "Light review — no new patterns, just stay sharp", cs: "MOCK INTERVIEW #8 same week, different format (phone screen style)", project: "Post-mock-interview review (interview #8)" }
    ]
  },
  {
    weekNumber: 16,
    phase: "Interview reps — final push",
    theme: "Consolidation + confidence week",
    dsaFocus: "Light daily problems only — confidence maintenance, not new patterns",
    csFocus: "Final resume + portfolio polish. Re-record your project explanations. Keep applying + interviewing.",
    milestone: "Walk into any interview able to: solve a medium problem, explain 2 projects deeply, answer 1 system design question, tell your story.",
    days: [
      { day: "Mon", dsa: "Light maintenance: 1 easy-medium problem, confidence-building", cs: "Final resume + portfolio polish — last pass, get a second pair of eyes", project: "Final GitHub cleanup — pin your best repos, clean READMEs" },
      { day: "Tue", dsa: "Light maintenance: 1 easy-medium problem", cs: "Re-record all 4 project explanations one final time — compare to week 8 recordings", project: "Final LinkedIn update reflecting everything you've rebuilt and learned" },
      { day: "Wed", dsa: "Light maintenance: 1 medium problem, timed", cs: "Notice how much clearer/faster your explanations are now — that's real progress", project: "Buffer / interview prep as needed" },
      { day: "Thu", dsa: "Light maintenance: 1 medium problem, timed", cs: "Continue applications + any pending interviews this week", project: "Buffer / interview prep as needed" },
      { day: "Fri", dsa: "Rest / no new problems — trust your prep", cs: "Continue applications + any pending interviews", project: "Buffer / interview prep as needed" },
      { day: "Sat", dsa: "Rest / no new problems", cs: "FINAL REVIEW: can you do all 4 things — solve a medium problem, explain 2 projects deeply, answer 1 system design question, tell your story?", project: "Reflect: write down 3 things you're now confident about that you weren't 16 weeks ago" }
    ]
  }
];
