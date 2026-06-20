// Dynamic Roadmap Generator and Topic Database
import { ROADMAP_WEEKS as ORIGINAL_WEEKS } from './roadmapData';

export const SYLLABUS_OPTIONS = [
  { id: 'dsa', name: 'Data Structures & Algorithms', icon: 'Award', color: 'text-brass-light' },
  { id: 'cs', name: 'CS Fundamentals (OS, DBMS, Networks)', icon: 'BookOpen', color: 'text-neon-cyan' },
  { id: 'genai', name: 'GenAI & Machine Learning Engineering', icon: 'Zap', color: 'text-neon-purple' },
  { id: 'webdev', name: 'Full-Stack Web Development', icon: 'FileText', color: 'text-emerald-400' },
  { id: 'systemdesign', name: 'System Design (HLD & LLD)', icon: 'Target', color: 'text-amber-400' }
];

export const DAYS_OF_WEEK = [
  { id: 'Mon', name: 'Monday' },
  { id: 'Tue', name: 'Tuesday' },
  { id: 'Wed', name: 'Wednesday' },
  { id: 'Thu', name: 'Thursday' },
  { id: 'Fri', name: 'Friday' },
  { id: 'Sat', name: 'Saturday' },
  { id: 'Sun', name: 'Sunday' }
];

// Topic databases containing progressive 16-week content
const TOPIC_DATABASE = {
  dsa: [
    { theme: "Arrays, Strings, Hashing", focus: "Arrays & Strings basics, Two Pointers, Sliding Window", tasks: [
      "Arrays basics: 3-4 easy problems (max subarray, rotate array)",
      "Strings basics: 3-4 easy problems (reverse, palindrome check, anagrams)",
      "Two Pointers pattern: 3-4 problems (pair sum, remove duplicates)",
      "Two Pointers continued: 3-4 medium problems",
      "Sliding Window intro: 3-4 problems (max subarray sum of size k)",
      "Sliding Window continued: 3-4 medium problems (longest substring without repeating chars)",
      "Mixed review of week's patterns & timed practice"
    ]},
    { theme: "Hashing Deep-dive & Recursion Intro", focus: "HashMaps/HashSets, Frequency problems, Recursion", tasks: [
      "HashMaps: 3-4 problems (two sum, first unique char)",
      "HashSets: 3-4 problems (duplicates, intersections)",
      "Frequency counting problems: 3-4 (anagram groups, top k frequent)",
      "Recursion intro: factorial, fibonacci, sum of digits from scratch",
      "Recursion: 3-4 easy problems (power function, reverse string recursively)",
      "Recursion patterns: backtracking warm-up (subsets list)",
      "Mixed review: redo 2 hardest problems from this week unaided"
    ]},
    { theme: "Recursion & Backtracking", focus: "Recursion patterns, Backtracking (subsets, permutations)", tasks: [
      "Recursion: backtracking intro — subsets problem from scratch",
      "Backtracking: permutations problem",
      "Backtracking: combination sum problem",
      "Backtracking: 2-3 medium problems (N-Queens intro level, word search)",
      "Mixed recursion/backtracking: 2-3 problems, no hints first 25 min",
      "Backtracking advanced: sudoku solver concept or palindrome partitioning",
      "Review week: redo your 2 hardest backtracking problems unaided"
    ]},
    { theme: "Linked Lists & Stacks/Queues", focus: "Linked List ops, reversal, cycle detection, Stack/Queue", tasks: [
      "Linked Lists: implement singly linked list from scratch",
      "Linked Lists: reverse a linked list (iterative + recursive)",
      "Linked Lists: detect cycle (Floyd's algorithm), find middle node",
      "Stacks: implement from scratch, 2-3 problems (valid parentheses)",
      "Queues: implement from scratch, 2-3 problems",
      "Stacks/Queues: implement queue using stacks / stack using queues",
      "Review: redo hardest linked list + stack problem unaided"
    ]},
    { theme: "Trees I — Binary Trees & BST", focus: "Tree traversals (in/pre/post, BFS), BST operations", tasks: [
      "Trees: implement binary tree, in-order/pre-order/post-order traversal",
      "Trees: BFS (level order traversal) — 2-3 problems",
      "Trees: DFS-based problems — 2-3 (max depth, path sum)",
      "BST: implement insert/search/delete from scratch",
      "BST: validate BST, 2-3 medium problems",
      "BST: find lowest common ancestor in BST",
      "Review: redo hardest tree problem unaided, timed"
    ]},
    { theme: "Trees II & Heap Foundations", focus: "Tree problems (LCA, diameter, balanced checks), intro Heaps", tasks: [
      "Trees: LCA (lowest common ancestor) problem in binary tree",
      "Trees: diameter of tree, balanced tree check — 2 problems",
      "Trees: 2-3 more medium tree problems, mixed (flatten tree, path sum III)",
      "Heaps intro: what is a heap, implement basic min-heap logic",
      "Heaps: 2-3 problems (kth largest element in array)",
      "Heaps: k-way merge problems (merge k sorted lists)",
      "Review: redo hardest tree/heap problem"
    ]},
    { theme: "Heaps & Graphs Intro", focus: "Heap/Priority Queue, Graph representations, BFS/DFS", tasks: [
      "Heaps: 2-3 more problems (median finder in data stream)",
      "Graphs intro: representations (adjacency list/matrix) from scratch",
      "Graphs: BFS implementation + 2 problems",
      "Graphs: DFS implementation + 2 problems",
      "Graphs: 2-3 mixed BFS/DFS problems (islands, connected components)",
      "Graphs: detect cycle in directed and undirected graphs",
      "Review: redo hardest graph problem unaided"
    ]},
    { theme: "Graphs II & Shortest Paths", focus: "Graph problems (topological sort, shortest path, Dijkstra)", tasks: [
      "Graphs: topological sort — implement from scratch, Course Schedule",
      "Graphs: shortest path in unweighted graph using BFS",
      "Graphs: Dijkstra's algorithm conceptually + 1 problem",
      "Graphs: Minimum Spanning Tree (Kruskal/Prim concept)",
      "Graphs: Bellman-Ford or Floyd-Warshall shortest path concepts",
      "Graphs: review weak areas and solve 2 medium problems",
      "Checkpoint: solve 3 random medium problems (mixed topics)"
    ]},
    { theme: "Dynamic Programming I", focus: "DP basics: 1D DP, memoization vs tabulation, knapsack patterns", tasks: [
      "DP intro: memoization vs tabulation — fibonacci both ways",
      "DP: climbing stairs, house robber style problems (3-4)",
      "DP: 0/1 Knapsack — implement from scratch, understand deeply",
      "DP: knapsack variants — Partition Equal Subset Sum",
      "DP: coin change style problems — 2-3",
      "DP: Longest Increasing Subsequence (LIS) intro",
      "Review: redo hardest DP problem unaided, timed"
    ]},
    { theme: "Dynamic Programming II", focus: "DP: 2D DP, string DP (LCS, edit distance)", tasks: [
      "DP: Longest Common Subsequence (LCS) — implement from scratch",
      "DP: Edit Distance — implement from scratch",
      "DP: string DP — 2-3 more problems (distinct subsequences)",
      "DP: 2D grid DP — 2-3 problems (unique paths, min path sum)",
      "DP: partition DP basics (matrix chain multiplication concept)",
      "DP: advanced state-machine DP (buy and sell stock with cooldown)",
      "Review: redo hardest 2D DP problem unaided"
    ]},
    { theme: "Tries & Segment Trees", focus: "Tries implementation, basic Segment Tree / Range Query", tasks: [
      "Tries: implement a trie from scratch (insert, search, startsWith)",
      "Tries: 2 problems (word search II, map sum pairs)",
      "Tries: prefix matching and autocomplete design problems",
      "Segment Trees: concept and basic array query implementations",
      "Range Queries: Fenwick tree / Binary Indexed Tree concepts",
      "Mixed review: 2-3 problems from tries/bit manipulation",
      "Review: redo hardest trie problem"
    ]},
    { theme: "Greedy Algorithms & Interval Scheduling", focus: "Greedy algorithm heuristics, interval overlapping problems", tasks: [
      "Greedy algorithms: intro + Activity Selection problem",
      "Greedy: Jump Game I & II from scratch",
      "Greedy: Job Sequencing with deadlines",
      "Intervals: Merge Intervals, Insert Interval",
      "Intervals: Minimum Meeting Rooms required",
      "Greedy: gas station problem or Huffman coding concept",
      "Review: redo hardest greedy/interval problem"
    ]},
    { theme: "Bit Manipulation & Math Basics", focus: "Bitwise operators, masks, basic number theory algorithms", tasks: [
      "Bit Manipulation: basics (AND/OR/XOR/shifts), 2-3 easy problems",
      "Bit Manipulation: 2-3 more problems (single number, count bits)",
      "Bit Manipulation: power of two, reverse bits, sum of two integers without plus",
      "Math: Sieve of Eratosthenes for prime numbers",
      "Math: Greatest Common Divisor (GCD) / Euclidean algorithm",
      "Math: modular exponentiation and basic combinations",
      "Review: redo hardest bit manipulation problem"
    ]},
    { theme: "Sliding Window Advanced & Two Pointers Advanced", focus: "Non-trivial sliding window (shrinking/growing), advanced pointers", tasks: [
      "Sliding Window: minimum window substring",
      "Two Pointers: trapping rain water",
      "Two Pointers: 4Sum / container with most water",
      "Sliding Window: substring with concatenation of all words",
      "Mixed review: 2-3 problems across advanced structures",
      "Contest practice: timed solving of 2 medium-hard problems",
      "Review: redo trapping rain water from memory"
    ]},
    { theme: "Weekly Contest Simulations & Revision", focus: "Timed coding rounds, pattern speed-running", tasks: [
      "Contest simulation: solve 3 medium problems in 60 minutes",
      "Review contest mistakes deeply, identify weak patterns",
      "Speed-run: solve 5 easy problems in under 30 minutes",
      "Speed-run: solve 3 medium problems in under 45 minutes",
      "DP/Graphs rapid-fire review: 2 medium problems",
      "Tries/Heaps rapid-fire review: 2 medium problems",
      "Review errors and clean up code structures"
    ]},
    { theme: "Final Coding Interview Reps", focus: "Comprehensive mock rounds, final DSA consolidation", tasks: [
      "Full interview simulation: 45 min live DSA session (online platform/peer)",
      "Self-test: solve 1 random hard problem in 45 minutes",
      "Review DSA formula sheet, complexity chart, key templates",
      "Final DSA review: solve 3 medium questions from your weak backlog",
      "Analyze optimal space/time complexity trade-offs for 5 common patterns",
      "Double check code patterns, recursion base-case checklists",
      "Rest/relaxation - keep mind fresh for technical assessments"
    ]}
  ],
  cs: [
    { theme: "OS Basics: Processes & Threads", focus: "Processes, threads, states, context switching", tasks: [
      "OS: What is a process vs thread? Draw state transitions.",
      "OS: Trace a context switch. What data is saved and where?",
      "OS: Process Control Block (PCB) structure and thread local storage.",
      "OS: User-level threads vs kernel-level threads.",
      "OS: Review process scheduling queues (ready, wait, I/O)."
    ]},
    { theme: "OS: Process Scheduling & Coordination", focus: "Scheduling algorithms, CPU performance metrics", tasks: [
      "OS: CPU Scheduling - FCFS, Shortest Job First, Round Robin.",
      "OS: Priority scheduling and multilevel feedback queues.",
      "OS: Starvation and aging concepts in CPU scheduling.",
      "OS: Preemptive vs non-preemptive scheduling algorithms.",
      "OS: Practice numerical problems on waiting time/turnaround time."
    ]},
    { theme: "OS: Inter-Process Communication & Synchronization", focus: "Semaphores, Mutex, Race conditions, Critical section", tasks: [
      "OS: Race conditions and the critical section problem.",
      "OS: Mutex locks vs Semaphores (binary and counting).",
      "OS: Classic synchronization problems: Producer-Consumer, Reader-Writer.",
      "OS: Dining Philosophers problem and solutions.",
      "OS: Thread safety concepts and reentrancy."
    ]},
    { theme: "OS: Memory Management & Virtual Memory", focus: "Paging, segmentation, address translation", tasks: [
      "OS: Memory Management - logical vs physical address spaces.",
      "OS: Paging internals: page tables, frame allocation, TLB.",
      "OS: Virtual Memory: demand paging and page faults.",
      "OS: Page Replacement Algorithms (FIFO, LRU, Optimal).",
      "OS: Thrashing - causes, detection, and working set model."
    ]},
    { theme: "OS: Deadlocks", focus: "Deadlock conditions, prevention, avoidance, detection", tasks: [
      "OS: Deadlocks - 4 necessary conditions (Coffman conditions).",
      "OS: Deadlock prevention strategies (breaking conditions).",
      "OS: Deadlock avoidance: Banker's Algorithm conceptually.",
      "OS: Deadlock detection and recovery methods.",
      "OS: Review deadlocks vs livelocks vs starvation."
    ]},
    { theme: "DBMS: Relational Model & SQL", focus: "Tables, schemas, constraints, basic queries", tasks: [
      "DBMS: Relational model concepts and attributes.",
      "DBMS: Integrity constraints (primary key, foreign key, unique).",
      "DBMS: Write SQL queries for CRUD operations.",
      "DBMS: SQL aggregate functions (GROUP BY, HAVING).",
      "DBMS: Nested subqueries and correlated subqueries."
    ]},
    { theme: "DBMS: Joins & Normalization", focus: "Types of Joins, normalization anomalies", tasks: [
      "DBMS: SQL Joins - Inner, Left, Right, Full Outer, Cross Joins.",
      "DBMS: Database anomalies (Insert, Update, Delete).",
      "DBMS: 1st Normal Form (1NF) & 2nd Normal Form (2NF) rules.",
      "DBMS: 3rd Normal Form (3NF) & Boyce-Codd Normal Form (BCNF).",
      "DBMS: Lossless join and dependency preserving decompositions."
    ]},
    { theme: "DBMS: Indexing & Query Optimization", focus: "B-Trees, B+ Trees, hash indexes, execution plans", tasks: [
      "DBMS: Indexing - primary, secondary, clustered vs non-clustered.",
      "DBMS: B-Tree and B+ Tree structures and why they fit databases.",
      "DBMS: Indexing trade-offs: read speed vs write overhead.",
      "DBMS: Query optimization: explain plans and scan types.",
      "DBMS: Designing indexes for complex queries."
    ]},
    { theme: "DBMS: Transactions & ACID Properties", focus: "ACID properties, transaction states", tasks: [
      "DBMS: Transactions - what they are, states of transaction.",
      "DBMS: ACID properties explained with real-world scenarios.",
      "DBMS: Write-Ahead Logging (WAL) and recovery concepts.",
      "DBMS: Commit and rollback actions in SQL.",
      "DBMS: Checkpoints and log-based recovery schemes."
    ]},
    { theme: "DBMS: Concurrency Control", focus: "Serializability, locking protocols, isolation levels", tasks: [
      "DBMS: Conflict serializability vs view serializability.",
      "DBMS: Lock-based protocols: 2-Phase Locking (2PL).",
      "DBMS: Transaction isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable).",
      "DBMS: Read anomalies: dirty reads, non-repeatable reads, phantom reads.",
      "DBMS: Deadlocks in databases and prevention."
    ]},
    { theme: "Computer Networks: Physical & Data Link Layers", focus: "Network models, OSI/TCP-IP layers, MAC addresses", tasks: [
      "Networking: OSI Model vs TCP/IP Suite - layer duties.",
      "Networking: Data Link Layer - framing, error control, flow control.",
      "Networking: MAC addresses, ARP protocol, Ethernet switches.",
      "Networking: Collision domains vs broadcast domains.",
      "Networking: Sockets and ports - basic connections."
    ]},
    { theme: "Computer Networks: Network Layer", focus: "IP routing, subnets, DHCP", tasks: [
      "Networking: IP addressing - IPv4 structures, CIDR notation.",
      "Networking: Subnetting - design subnets for a network.",
      "Networking: Routing protocols - link state vs distance vector (concepts).",
      "Networking: ICMP and ping tools.",
      "Networking: DHCP and NAT - how local IPs map to public IPs."
    ]},
    { theme: "Computer Networks: Transport Layer", focus: "TCP vs UDP, connection steps, flow control", tasks: [
      "Networking: Transport Layer duties - port multiplexing.",
      "Networking: TCP vs UDP - key differences, headers.",
      "Networking: TCP 3-way handshake and connection teardown.",
      "Networking: TCP Flow Control (sliding window) and Congestion Control.",
      "Networking: UDP packet delivery and real-time streams."
    ]},
    { theme: "Computer Networks: Application Layer", focus: "DNS, HTTP, FTP, SMTP protocols", tasks: [
      "Networking: DNS - domain name resolution steps.",
      "Networking: HTTP protocol - methods, request/response format.",
      "Networking: HTTPS - SSL/TLS handshake and certificate auth.",
      "Networking: Cookies vs Sessions vs JWT at network level.",
      "Networking: SMTP, IMAP, and FTP protocols."
    ]},
    { theme: "CS Fundamentals: Rapid Fire Reviews", focus: "Quick-fire assessments of core subjects", tasks: [
      "CS Quiz: write 15 questions on OS memory and answer them.",
      "CS Quiz: write 15 questions on DBMS transaction isolation and answer them.",
      "CS Quiz: write 15 questions on Networking headers/TCP and answer them.",
      "Mock: oral explanation of page-replacement algorithms and B+ Trees.",
      "Flashcards: quick review of OSI layers and HTTP status codes."
    ]},
    { theme: "CS Interview Prep Checklists", focus: "Final polishing of CS concepts for interviews", tasks: [
      "Review: cheat-sheet of OS/DBMS/CN definitions.",
      "Explain virtual memory, index scans, and TCP handshake under 3 mins.",
      "Practice answering: 'what happens when you search google.com?'",
      "Prepare answers for typical database design interview questions.",
      "Final review of common networking questions."
    ]}
  ],
  genai: [
    { theme: "ML Fundamentals", focus: "Linear algebra, gradient descent, regressions", tasks: [
      "Math: vectors, matrices, dot products, eigenvalues conceptually.",
      "ML: Supervised vs unsupervised learning.",
      "ML: Gradient descent - how weights update.",
      "ML: Linear and Logistic regression models.",
      "ML: Model evaluation metrics (precision, recall, F1, accuracy)."
    ]},
    { theme: "Neural Networks Intro", focus: "Perceptrons, activation functions, backpropagation", tasks: [
      "NN: What is a perceptron? Multi-layer perceptrons.",
      "NN: Activation functions (ReLU, Sigmoid, Tanh, Softmax).",
      "NN: Forward propagation and Backpropagation mathematical concepts.",
      "NN: Loss functions - Mean Squared Error, Cross-Entropy.",
      "NN: Optimizers - SGD, Adam, learning rate schedules."
    ]},
    { theme: "NLP Foundations", focus: "Tokenization, text representation, RNNs", tasks: [
      "NLP: Text preprocessing - tokenization, stemming, lemmatization.",
      "NLP: Bag of Words and TF-IDF representations.",
      "NLP: Word Embeddings - Word2Vec and GloVe concepts.",
      "NLP: Recurrent Neural Networks (RNN) and LSTMs.",
      "NLP: Seq2Seq models and the encoder-decoder bottleneck."
    ]},
    { theme: "The Attention Mechanism", focus: "Self-attention queries, keys, values", tasks: [
      "Attention: The encoder-decoder bottleneck solution.",
      "Attention: Self-attention math: Q, K, V vectors.",
      "Attention: Scaled dot-product attention calculation.",
      "Attention: Multi-head attention - why project into subspaces?",
      "Read: The Illustrated Transformer (Jay Alammar) first half."
    ]},
    { theme: "Transformer Architecture I", focus: "Encoder, decoder, positional encoding", tasks: [
      "Transformer: Full encoder block structure - layer norm, skip connections.",
      "Transformer: Positional encoding - why order matters.",
      "Transformer: Decoder block: masked self-attention, cross-attention.",
      "Transformer: Softmax projection to vocabulary tokens.",
      "Read: The Illustrated Transformer second half."
    ]},
    { theme: "Transformer Architecture II", focus: "Seminal papers, BERT, GPT models", tasks: [
      "Transformers: BERT (Encoder-only) vs GPT (Decoder-only) vs T5 (Seq2Seq).",
      "Transformers: Autoregressive generation and decoding strategies (greedy, beam search).",
      "Paper: Read 'Attention Is All You Need' abstract and sections 1-3.",
      "Paper: Read 'Attention Is All You Need' sections 4-5.",
      "Write a 1-page summary of Transformer architecture."
    ]},
    { theme: "LLM Foundations", focus: "Model size, training phases, scaling laws", tasks: [
      "LLM: Pre-training (causal language modeling) vs Fine-tuning.",
      "LLM: Context window limitations and tokenizers (Byte-Pair Encoding).",
      "LLM: Scaling laws - compute, dataset size, parameters.",
      "LLM: Hallucination - causes and mitigation strategies.",
      "Concept: RLHF (Reinforcement Learning from Human Feedback)."
    ]},
    { theme: "RAG Internals: Embeddings & Vector Stores", focus: "Chunking, embeddings, indexing", tasks: [
      "RAG: What is Retrieval Augmented Generation and why use it?",
      "RAG: Document parsing and chunking strategies (fixed, semantic).",
      "RAG: Vector Embeddings - cosine similarity vs dot product.",
      "RAG: Vector Databases (Chroma, Pinecone, FAISS) - indexing.",
      "RAG: Write diagram of RAG pipeline on paper."
    ]},
    { theme: "RAG Internals: Retrieval & Generation", focus: "Query formulation, prompts, LLM integration", tasks: [
      "RAG: Retrieval stage - top-k documents extraction.",
      "RAG: Prompt construction with context injection.",
      "RAG: Generation stage - passing context to LLM.",
      "RAG: Context stuffing and 'lost in the middle' phenomenon.",
      "RAG: Query translation and expansion strategies."
    ]},
    { theme: "RAG Advanced: Re-ranking & Evaluation", focus: "Cross-encoders, Ragas framework, evaluations", tasks: [
      "RAG: Re-ranking - Bi-encoders vs Cross-encoders.",
      "RAG: RAG Evaluation metrics - Faithfulness, Answer Relevance, Context Recall.",
      "RAG: Introduction to Ragas or TruLens evaluation libraries.",
      "RAG: Hybrid search - combining keyword (BM25) with vector search.",
      "RAG: Metadata filtering in vector search."
    ]},
    { theme: "Fine-Tuning: Methods & Datasets", focus: "SFT, datasets, PEFT concept", tasks: [
      "Fine-Tuning: Instruction fine-tuning vs domain adaptation.",
      "Fine-Tuning: Supervised Fine-Tuning (SFT) dataset formats.",
      "Fine-Tuning: PEFT (Parameter-Efficient Fine-Tuning) introduction.",
      "Fine-Tuning: Preparing datasets, cleaning tokenized inputs.",
      "Fine-Tuning: Prompt template structures (Alpaca, ChatML)."
    ]},
    { theme: "Fine-Tuning: LoRA & QLoRA", focus: "Low-Rank Adaptation, quantization, memory budgets", tasks: [
      "LoRA: Weight matrices update math. Low-rank decomposition.",
      "LoRA: Rank parameter (r) and alpha scaling parameter.",
      "QLoRA: 4-bit NormalFloat quantization, double quantization.",
      "LoRA: Memory saving calculations - VRAM requirements.",
      "Fine-Tuning: Training loss tracking, overfitting signs."
    ]},
    { theme: "Agentic AI Foundations", focus: "ReAct pattern, tools, LLM planning", tasks: [
      "Agents: What is an AI Agent? Planning, memory, tools.",
      "Agents: The ReAct (Reason + Action) loop structure.",
      "Agents: Tool integration - parsing JSON function calls.",
      "Agents: Memory - short-term (chat history) vs long-term.",
      "Agents: Agent frameworks (LangChain, CrewAI, AutoGen)."
    ]},
    { theme: "Agentic AI: Advanced Patterns", focus: "Multi-agent systems, human-in-the-loop, evals", tasks: [
      "Agents: Multi-agent collaboration architectures.",
      "Agents: Human-in-the-loop validation checkpoints.",
      "Agents: State machines in agent loops (LangGraph concept).",
      "Agents: Evaluating agent actions and tool execution safety.",
      "Agents: Error handling and recovery loops in agents."
    ]},
    { theme: "GenAI Engineering: Evals & Deployment", focus: "System validation, LLM serving", tasks: [
      "GenAI: LLM serving tools (vLLM, Ollama, Hugging Face TGI).",
      "GenAI: Quantization levels - GGUF vs GPTQ vs AWQ.",
      "GenAI: Latency metrics: Time to First Token (TTFT), tokens per second.",
      "GenAI: Cost modeling - tokens input vs tokens output.",
      "GenAI: Security in LLM apps (Prompt injection, guardrails)."
    ]},
    { theme: "GenAI Project Architecture Review", focus: "Analyzing end-to-end AI project structures", tasks: [
      "Review: LLM app architecture from scratch (API to DB).",
      "Explain LoRA, RAG pipeline, and ReAct loop to a peer.",
      "Identify 3 bottlenecks in a vector search app and how to fix them.",
      "Write deployment architecture sheet for an LLM-based system.",
      "Final review of GenAI terms and definitions."
    ]}
  ],
  webdev: [
    { theme: "HTML5 & CSS3 Foundations", focus: "Semantic tags, CSS Layouts (Grid/Flexbox)", tasks: [
      "WebDev: HTML5 semantic tags (header, section, article).",
      "WebDev: CSS flexbox properties - alignment, flex growth.",
      "WebDev: CSS Grid layout - template areas, auto-fill/fit.",
      "WebDev: Media queries and responsive mobile-first designs.",
      "WebDev: CSS variables and dark-mode styling systems."
    ]},
    { theme: "Modern JavaScript (ES6+)", focus: "Async execution, event loop, APIs", tasks: [
      "JS: ES6 features - destructuring, arrow functions, template literals.",
      "JS: Promises, async/await, and error handling with try/catch.",
      "JS: DOM API - selectors, event listeners, document fragment.",
      "JS: Fetch API - making network calls, parsing JSON.",
      "JS: Event Loop - macro-tasks vs micro-tasks conceptually."
    ]},
    { theme: "React Core Concepts", focus: "JSX, components, state, props", tasks: [
      "React: JSX rules, rendering elements, list keys.",
      "React: Functional components, passing props, destructuring.",
      "React: State with useState - updater function, immutable updates.",
      "React: React event handling and synthetic events.",
      "React: Conditional rendering and forms in React."
    ]},
    { theme: "React Hooks & Lifecycle", focus: "useEffect, useRef, custom hooks", tasks: [
      "React: useEffect hook - dependency array, cleanup functions.",
      "React: useRef hook - DOM access, persisting values across renders.",
      "React: Custom hooks - extracting reusable stateful logic.",
      "React: Context API - setting up global state providers.",
      "React: Performance: memo, useMemo, and useCallback concepts."
    ]},
    { theme: "Next.js & Frontend Routing", focus: "Routing structures, SSR vs SSG", tasks: [
      "Next.js: App router file structures (layout, page, loading).",
      "Next.js: Server Components vs Client Components.",
      "Next.js: Data fetching methods - fetch options, caching.",
      "Next.js: Dynamic routes and routing links.",
      "Next.js: SSR (Server-Side Rendering) vs SSG (Static Site Generation)."
    ]},
    { theme: "Node.js & Express Basics", focus: "Server setup, routing, middleware", tasks: [
      "Node: What is Node.js? V8 engine, single threaded event loop.",
      "Express: Set up Express server, write basic GET/POST endpoints.",
      "Express: Router middleware - request/response logs, parsing JSON.",
      "Express: Error handling middleware structures.",
      "Express: Routing variables and query strings."
    ]},
    { theme: "APIs & Databases (SQL)", focus: "REST guidelines, Database models, SQL connections", tasks: [
      "API: REST principles - endpoints, HTTP verbs, status codes.",
      "DB: PostgreSQL setup, connecting Node app to database.",
      "DB: Writing queries via database driver (pg pool) in Node.",
      "DB: Primary/Foreign key constraints in tables.",
      "DB: SQL Joins in Express endpoints, mapping JSON."
    ]},
    { theme: "Databases (NoSQL) & ORMs", focus: "Mongoose, database schemas, ORMs vs raw query", tasks: [
      "DB: NoSQL vs SQL - when to use MongoDB.",
      "ORM: Mongoose schemas, models, and validation.",
      "ORM: Prisma setup and schema definition (SQL & NoSQL).",
      "DB: Relational mapping in Prisma.",
      "DB: Database indexing for query speed."
    ]},
    { theme: "Authentication & Security", focus: "JWT, cookies, password hashing", tasks: [
      "Auth: Hashing passwords with bcrypt.",
      "Auth: JWT (JSON Web Token) - sign, verify, token structure.",
      "Auth: HTTPOnly cookies vs localStorage for JWT safety.",
      "Auth: Authentication middleware in Express.",
      "Security: CORS configuration, Helmet, rate-limiting."
    ]},
    { theme: "State Management in React", focus: "Redux Toolkit, Zustand, global states", tasks: [
      "State: Global state vs local state - Redux RTK concepts.",
      "Zustand: Setup store, action functions, hook consumption.",
      "State: Async actions and middle-tier data stores.",
      "State: Persisting state (localStorage integration).",
      "State: Debugging state changes, DevTools."
    ]},
    { theme: "Testing Web Applications", focus: "Unit testing, integration testing, Cypress", tasks: [
      "Testing: Jest and React Testing Library setup.",
      "Testing: Unit tests for helper functions and hooks.",
      "Testing: Component testing - clicks, text matching, mock API.",
      "Testing: E2E testing with Cypress or Playwright conceptually.",
      "Testing: Mocking database calls in backend tests."
    ]},
    { theme: "CI/CD & Deployment Foundations", focus: "Docker containerization, hosting platforms", tasks: [
      "Docker: Write a Dockerfile for a React/Node app.",
      "Docker: Compose files (React + Node + Postgres).",
      "Vite: Build configurations, environment variables.",
      "Deploy: Hosting frontend on Vercel/Netlify.",
      "Deploy: Hosting backend on Render, Fly.io, or AWS EC2."
    ]},
    { theme: "Caching & Performance Optimizations", focus: "Redis, CDNs, asset compression", tasks: [
      "Cache: Setting up Redis in Express APIs.",
      "Cache: Eviction policies, cache-control headers.",
      "Performance: Lazy loading, dynamic imports in React.",
      "Performance: Image optimization, webp, CDN distribution.",
      "Performance: Lighthouse score audits - core web vitals."
    ]},
    { theme: "Real-Time Web Apps", focus: "WebSockets, Socket.io, server events", tasks: [
      "WebSockets: Connection lifecycle, upgrade header.",
      "Socket.io: Express server integration, event triggers.",
      "Socket.io: Client-side connection, room management.",
      "Real-time: Reconnection logic, fallback formats.",
      "Real-time: Building a basic real-time chat page."
    ]},
    { theme: "Advanced Backend Architectures", focus: "Microservices, API Gateways, queues", tasks: [
      "Architecture: Monolith vs Microservices tradeoffs.",
      "Architecture: API Gateway concept - routing, auth offloading.",
      "Architecture: Message Broker (RabbitMQ/Kafka) background queues.",
      "Architecture: Serverless functions - AWS Lambda, Vercel Serverless.",
      "Architecture: Designing file upload (S3 pre-signed URLs)."
    ]},
    { theme: "Full-Stack Project Capstone", focus: "Complete architectural sweep and build review", tasks: [
      "Review: Full-stack codebase walkthrough (Auth, DB, Server, UI).",
      "Explain JWT flow, CORS, Docker setup, and Redux/Zustand.",
      "Audit app security: SQL injection checks, XSS filters.",
      "Write load test scripts (e.g. k6) and check response rates.",
      "Final review of WebDev interview checklists."
    ]}
  ],
  systemdesign: [
    { theme: "Scaling Foundations", focus: "Horizontal vs vertical scaling, load balancers, DNS", tasks: [
      "System: What is scale? CPU vs I/O bound systems.",
      "System: Vertical scaling limits vs Horizontal scaling challenges.",
      "System: DNS resolution, GeoDNS, routing requests.",
      "System: Load Balancers - Layer 4 vs Layer 7, Nginx/HAProxy.",
      "System: Load balancing algorithms (Round Robin, Least Conn, Consistent Hash)."
    ]},
    { theme: "Network & Communication Protocols", focus: "REST, GraphQL, gRPC, WebSockets", tasks: [
      "Protocol: HTTP/1.1 vs HTTP/2 vs HTTP/3.",
      "Protocol: REST API constraints, payload formats.",
      "Protocol: GraphQL - schemas, resolvers, n+1 query issue.",
      "Protocol: gRPC - Protocol Buffers, HTTP/2 streaming.",
      "Protocol: WebSockets vs Long Polling vs Server-Sent Events."
    ]},
    { theme: "Database Scaling I: SQL & Replication", focus: "Replication, read replicas, multi-leader", tasks: [
      "DB: Relational database limits under load.",
      "DB: Master-Slave replication - synchronous vs asynchronous.",
      "DB: Read replicas - scaling read throughput, replication lag.",
      "DB: Master-Master (Multi-Leader) replication conflicts.",
      "DB: Connection pooling - PgBouncer, thread limits."
    ]},
    { theme: "Database Scaling II: Sharding & NoSQL", focus: "Database sharding, Partitioning, CAP theorem", tasks: [
      "DB: Sharding - horizontal partitioning vs vertical partitioning.",
      "DB: Sharding keys - range-based, hash-based, directory-based.",
      "DB: CAP Theorem - Consistency, Availability, Partition Tolerance.",
      "DB: PACELC Theorem - extending CAP.",
      "DB: Document vs Key-Value vs Graph vs Columnar databases."
    ]},
    { theme: "Caching Architectures", focus: "CDN, Redis, Cache invalidation", tasks: [
      "Cache: Cache hit ratio, caching locations (browser, CDN, API, DB).",
      "CDN: Edge caching, dynamic vs static content caching.",
      "Cache: Eviction policies - LRU, LFU, FIFO.",
      "Cache: Cache write strategies - Write-Through, Write-Around, Write-Back.",
      "Cache: Cache invalidation - Cache-Aside pattern, TTLs."
    ]},
    { theme: "Message Queues & Event Streaming", focus: "Pub/sub, message brokers, Kafka", tasks: [
      "System: Asynchronous processing - why decouple?",
      "Queue: Message Queue (RabbitMQ) vs Event Stream (Kafka).",
      "System: Pub/sub model, fan-out architecture.",
      "System: Message delivery guarantees - At-least-once, At-most-once, Exactly-once.",
      "System: Consumer groups, partition scaling in Kafka."
    ]},
    { theme: "Distributed Systems Coordination", focus: "Service discovery, consensus, configuration", tasks: [
      "System: Service Discovery - Consul, ZooKeeper, Eureka.",
      "System: Consensus algorithms - Raft and Paxos conceptually.",
      "System: Distributed locks - Redlock pattern with Redis.",
      "System: Distributed configuration management.",
      "System: Heartbeats, gossip protocol for membership."
    ]},
    { theme: "API Gateways & Security", focus: "Reverse proxy, rate limiting, auth offloading", tasks: [
      "Gateway: API Gateway duties - routing, SSL termination, throttling.",
      "System: Rate Limiting algorithms - Token Bucket, Leaky Bucket, Sliding Window.",
      "Gateway: Auth offloading - stateless tokens validation.",
      "Security: DDoS protection, Web Application Firewalls (WAF).",
      "System: Circuit Breaker pattern - open, closed, half-open states."
    ]},
    { theme: "Distributed Transactions", focus: "2PC, Saga pattern, eventual consistency", tasks: [
      "Transaction: ACID vs BASE transaction properties.",
      "Transaction: Two-Phase Commit (2PC) - coordinator, voting, commit.",
      "Transaction: Saga pattern - orchestrator vs choreography.",
      "Transaction: Compensating transactions for rollback.",
      "Transaction: Eventual consistency models, conflict-free replicated data types (CRDTs)."
    ]},
    { theme: "Distributed Search & Analytics", focus: "Elasticsearch, inverted index, logs aggregation", tasks: [
      "Search: Inverted index conceptually (Lucene).",
      "Search: Elasticsearch cluster - nodes, shards, replicas.",
      "Analytics: Log collection pipelines - ELK stack / Prometheus.",
      "Analytics: Time-series databases (InfluxDB) vs Relational.",
      "Search: Document indexing, search query scoring."
    ]},
    { theme: "LLD: OOP Principles & SOLID", focus: "Encapsulation, SOLID design rules", tasks: [
      "LLD: Object-Oriented Programming (OOP) core pillars.",
      "SOLID: Single Responsibility & Open/Closed principles.",
      "SOLID: Liskov Substitution & Interface Segregation.",
      "SOLID: Dependency Inversion principle.",
      "LLD: UML Class diagrams - associations, aggregations, compositions."
    ]},
    { theme: "LLD: Creational & Structural Design Patterns", focus: "Singleton, Factory, Builder, Adapter patterns", tasks: [
      "Pattern: Singleton pattern - implementation, thread safety.",
      "Pattern: Factory Method and Abstract Factory patterns.",
      "Pattern: Builder pattern for complex object creation.",
      "Pattern: Adapter and Decorator patterns.",
      "Pattern: Proxy and Facade patterns."
    ]},
    { theme: "LLD: Behavioral Design Patterns", focus: "Observer, Strategy, State patterns", tasks: [
      "Pattern: Observer pattern - publisher/subscriber connections.",
      "Pattern: Strategy pattern - swapping algorithms at runtime.",
      "Pattern: State pattern - state-specific behaviors.",
      "Pattern: Command pattern - encapsulating requests as objects.",
      "Pattern: Template Method and Iterator patterns."
    ]},
    { theme: "System Case Study I: Video Streaming & Chats", focus: "Design Netflix, Design WhatsApp", tasks: [
      "Case Study: Design WhatsApp - WebSocket connection, database storage, offline queue.",
      "Case Study: Design Netflix - video encoding, CDN storage, user catalog routing.",
      "Design: Database schema for chat history and message statuses.",
      "Design: Real-time user presence indicator system.",
      "Design: High-throughput video transcoding queue."
    ]},
    { theme: "System Case Study II: Ride Sharing & Feeds", focus: "Design Uber, Design Twitter/X", tasks: [
      "Case Study: Design Uber - Geospatial indexing, Quadtrees, matching drivers.",
      "Case Study: Design Twitter - Feed generation, Fan-out on write vs read.",
      "Design: Database structures for geospatial lat/long tracking.",
      "Design: Cache structures for timeline delivery.",
      "Design: Scaling notification engines for high-load systems."
    ]},
    { theme: "System Design Final Reviews", focus: "Comprehensive interview templates and cheat sheets", tasks: [
      "Review: System design step-by-step checklist (requirements, API, scale, diagram).",
      "Explain CAP theorem, CDN caching, and rate limiting in under 3 mins.",
      "Explain Singleton pattern, Observer pattern, and SOLID rules.",
      "Write architectural diagrams for a payment processing system.",
      "Final review of system design guidelines."
    ]}
  ]
};

// Generates a fully dynamic roadmap weeks array
export function generateRoadmap(settings) {
  const { name, weeksCount, studyDays, syllabus, customSubjects } = settings;
  const targetWeeksCount = parseInt(weeksCount) || 16;
  const activeSyllabi = [...(syllabus || [])];
  const customList = [...(customSubjects || [])];

  const generatedWeeks = [];

  // Determine study days
  const activeDays = studyDays && studyDays.length > 0 ? studyDays : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let w = 1; w <= targetWeeksCount; w++) {
    // Map current week index w to database index (0 to 15)
    // Formula scales 1 to targetWeeksCount down to 0 to 15
    const dbIndex = Math.min(15, Math.floor(((w - 1) / targetWeeksCount) * 16));

    // Combine themes and focuses for the selected active syllabi
    let themeList = [];
    let focusList = [];
    let dailyTaskBanks = {};

    // Get DSA data if checked
    if (activeSyllabi.includes('dsa') && TOPIC_DATABASE.dsa[dbIndex]) {
      themeList.push(TOPIC_DATABASE.dsa[dbIndex].theme);
      focusList.push(TOPIC_DATABASE.dsa[dbIndex].focus);
      dailyTaskBanks.dsa = TOPIC_DATABASE.dsa[dbIndex].tasks;
    }

    // Get CS data if checked
    if (activeSyllabi.includes('cs') && TOPIC_DATABASE.cs[dbIndex]) {
      themeList.push("CS: " + TOPIC_DATABASE.cs[dbIndex].theme.replace("OS: ", "").replace("DBMS: ", ""));
      focusList.push(TOPIC_DATABASE.cs[dbIndex].focus);
      dailyTaskBanks.cs = TOPIC_DATABASE.cs[dbIndex].tasks;
    }

    // Get GenAI data if checked
    if (activeSyllabi.includes('genai') && TOPIC_DATABASE.genai[dbIndex]) {
      themeList.push("AI: " + TOPIC_DATABASE.genai[dbIndex].theme);
      focusList.push(TOPIC_DATABASE.genai[dbIndex].focus);
      dailyTaskBanks.genai = TOPIC_DATABASE.genai[dbIndex].tasks;
    }

    // Get WebDev data if checked
    if (activeSyllabi.includes('webdev') && TOPIC_DATABASE.webdev[dbIndex]) {
      themeList.push("WebDev: " + TOPIC_DATABASE.webdev[dbIndex].theme);
      focusList.push(TOPIC_DATABASE.webdev[dbIndex].focus);
      dailyTaskBanks.webdev = TOPIC_DATABASE.webdev[dbIndex].tasks;
    }

    // Get System Design if checked
    if (activeSyllabi.includes('systemdesign') && TOPIC_DATABASE.systemdesign[dbIndex]) {
      themeList.push("SysDesign: " + TOPIC_DATABASE.systemdesign[dbIndex].theme);
      focusList.push(TOPIC_DATABASE.systemdesign[dbIndex].focus);
      dailyTaskBanks.systemdesign = TOPIC_DATABASE.systemdesign[dbIndex].tasks;
    }

    // Process custom subjects
    customList.forEach((cName) => {
      themeList.push(`${cName} Prep`);
      focusList.push(`${cName} Progressive Study`);
      dailyTaskBanks[cName] = [
        `${cName} - Fundamentals & concepts`,
        `${cName} - Intermediate structure tracing`,
        `${cName} - Practical applications & coding`,
        `${cName} - Review and note taking`,
        `${cName} - Solve typical interview problems`,
        `${cName} - Advanced concepts study`,
        `${cName} - Review and weak areas patch`
      ];
    });

    // Default theme if nothing is selected
    const weekTheme = themeList.length > 0 ? themeList.join(" | ") : "Self-directed Study & Practice";
    const dsaFocusText = focusList.length > 0 ? focusList[0] : "General problem solving";
    const csFocusText = focusList.length > 1 ? focusList[1] : "Review fundamentals";
    const milestoneText = `Complete weekly syllabus objectives and log DSA attempts.`;

    // Phase definition based on weeks percentage
    const progressPct = w / targetWeeksCount;
    let phase = "Foundation";
    if (progressPct > 0.5 && progressPct <= 0.8) phase = "Specialization";
    else if (progressPct > 0.8) phase = "Interview Reps";

    // Generate days of the week tasks
    const daysArray = activeDays.map((dayName, dIdx) => {
      // Assemble day tasks
      let dsaTask = "Self-directed coding practice (1-2 problems)";
      let csTask = "Review notes / study resource library";
      let projectTask = "Work on personal coding projects / trace codebase";

      // Dynamically select tasks from task banks using day index
      if (dailyTaskBanks.dsa && dailyTaskBanks.dsa[dIdx % dailyTaskBanks.dsa.length]) {
        dsaTask = dailyTaskBanks.dsa[dIdx % dailyTaskBanks.dsa.length];
      }
      if (dailyTaskBanks.cs && dailyTaskBanks.cs[dIdx % dailyTaskBanks.cs.length]) {
        csTask = dailyTaskBanks.cs[dIdx % dailyTaskBanks.cs.length];
      }
      // If genai / webdev / systemdesign exist, use them for CS/Project tasks to balance focus
      if (dailyTaskBanks.genai && dailyTaskBanks.genai[dIdx % dailyTaskBanks.genai.length]) {
        projectTask = dailyTaskBanks.genai[dIdx % dailyTaskBanks.genai.length];
      } else if (dailyTaskBanks.webdev && dailyTaskBanks.webdev[dIdx % dailyTaskBanks.webdev.length]) {
        projectTask = dailyTaskBanks.webdev[dIdx % dailyTaskBanks.webdev.length];
      } else if (dailyTaskBanks.systemdesign && dailyTaskBanks.systemdesign[dIdx % dailyTaskBanks.systemdesign.length]) {
        projectTask = dailyTaskBanks.systemdesign[dIdx % dailyTaskBanks.systemdesign.length];
      }

      // If custom subjects are present, overwrite tasks accordingly
      customList.forEach((cName) => {
        if (dailyTaskBanks[cName] && dailyTaskBanks[cName][dIdx % dailyTaskBanks[cName].length]) {
          csTask = dailyTaskBanks[cName][dIdx % dailyTaskBanks[cName].length];
        }
      });

      return {
        day: dayName,
        dsa: dsaTask,
        cs: csTask,
        project: projectTask
      };
    });

    generatedWeeks.push({
      weekNumber: w,
      phase,
      theme: weekTheme,
      dsaFocus: dsaFocusText,
      csFocus: csFocusText,
      milestone: milestoneText,
      days: daysArray
    });
  }

  // Generate dynamic phases descriptions based on targetWeeksCount
  const w1 = Math.round(targetWeeksCount * 0.5);
  const w2 = Math.round(targetWeeksCount * 0.8);

  const generatedPhases = [
    {
      name: "Phase 1: Foundation",
      weeks: `Weeks 1-${w1}`,
      focus: "DSA patterns + CS fundamentals + core subject concepts",
      exitCriteria: "Solve easy-medium DSA in 20-30 min. Explain core rules of subjects cold."
    },
    {
      name: "Phase 2: Specialization",
      weeks: `Weeks ${w1 + 1}-${w2}`,
      focus: "Deep engineering specialization - framework internals, system architectures, pipelines",
      exitCriteria: "Build and scale module libraries yourself without relying on helper prompts."
    },
    {
      name: "Phase 3: Interview Reps",
      weeks: `Weeks ${w2 + 1}-${targetWeeksCount}`,
      focus: "Mock interviews, behavioral prep, speed-coding, resume optimization",
      exitCriteria: "Comfortable in live screening rounds and explain architecture flows clearly."
    }
  ];

  // Derive sources lists dynamically based on syllabi
  const generatedSources = {};
  if (activeSyllabi.includes('dsa')) generatedSources.dsa = ORIGINAL_WEEKS ? [
    { title: "Striver's SDE Sheet (180 Problems)", url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/", description: "Curated 180 questions for pattern mastery.", recommended: true },
    { title: "NeetCode 150", url: "https://neetcode.io/practice", description: "150 categorized questions with video explainers." }
  ] : [];

  if (activeSyllabi.includes('cs')) generatedSources.cs = [
    { title: "GeeksforGeeks Operating Systems Prep", url: "https://www.geeksforgeeks.org/operating-systems/", description: "Consolidated, interview-focused OS articles." },
    { title: "GeeksforGeeks DBMS Prep", url: "https://www.geeksforgeeks.org/dbms/", description: "Core indexing, normalizations, and keys." }
  ];

  if (activeSyllabi.includes('genai')) generatedSources.genai = [
    { title: "The Illustrated Transformer (Jay Alammar)", url: "https://jalammar.github.io/illustrated-transformer/", description: "Seminal visual explanation of Attention query/keys/values.", recommended: true },
    { title: "Pinecone Learning Center (RAG & Embeddings)", url: "https://www.pinecone.io/learn/", description: "Vector databases, chunking, and similarity math." }
  ];

  if (activeSyllabi.includes('webdev')) generatedSources.webdev = [
    { title: "MDN Web Docs", url: "https://developer.mozilla.org/", description: "The definitive reference manual for HTML, CSS, and JS.", recommended: true },
    { title: "React Official Documentation", url: "https://react.dev/", description: "Deep dive hook explainers, rules of hooks, state flows." }
  ];

  if (activeSyllabi.includes('systemdesign')) generatedSources.systemdesign = [
    { title: "System Design Primer (ByteByteGo)", url: "https://github.com/donnemartin/system-design-primer", description: "Open source gold standard guide to distributed systems.", recommended: true },
    { title: "Guru99 LLD / SOLID Patterns", url: "https://www.guru99.com/solid-principles.html", description: "Object oriented design rules and patterns code snippets." }
  ];

  customList.forEach((cName) => {
    generatedSources[cName.toLowerCase().replace(/\s+/g, '')] = [
      { title: `${cName} Official Documentation`, url: "https://google.com", description: `Check official tutorials and reference indexes for ${cName}.` }
    ];
  });

  return {
    weeks: generatedWeeks,
    phases: generatedPhases,
    sources: generatedSources
  };
}
