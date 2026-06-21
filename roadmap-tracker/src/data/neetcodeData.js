export const NEETCODE_CATEGORIES = [
  {
    id: "arrays-hashing",
    name: "Arrays & Hashing",
    x: 50,
    y: 40,
    dependencies: [],
    problems: [
      { id: "contains-duplicate", name: "Contains Duplicate", difficulty: "Easy" },
      { id: "valid-anagram", name: "Valid Anagram", difficulty: "Easy" },
      { id: "two-sum", name: "Two Sum", difficulty: "Easy" },
      { id: "group-anagrams", name: "Group Anagrams", difficulty: "Medium" },
      { id: "top-k-frequent-elements", name: "Top K Frequent Elements", difficulty: "Medium" },
      { id: "product-of-array-except-self", name: "Product of Array Except Self", difficulty: "Medium" },
      { id: "valid-sudoku", name: "Valid Sudoku", difficulty: "Medium" },
      { id: "encode-and-decode-strings", name: "Encode and Decode Strings", difficulty: "Medium" },
      { id: "longest-consecutive-sequence", name: "Longest Consecutive Sequence", difficulty: "Medium" }
    ]
  },
  {
    id: "two-pointers",
    name: "Two Pointers",
    x: 35,
    y: 130,
    dependencies: ["arrays-hashing"],
    problems: [
      { id: "valid-palindrome", name: "Valid Palindrome", difficulty: "Easy" },
      { id: "two-sum-ii-input-array-is-sorted", name: "Two Sum II - Input Array Is Sorted", difficulty: "Medium" },
      { id: "3sum", name: "3Sum", difficulty: "Medium" },
      { id: "container-with-most-water", name: "Container With Most Water", difficulty: "Medium" },
      { id: "trapping-rain-water", name: "Trapping Rain Water", difficulty: "Hard" }
    ]
  },
  {
    id: "stack",
    name: "Stack",
    x: 65,
    y: 130,
    dependencies: ["arrays-hashing"],
    problems: [
      { id: "valid-parentheses", name: "Valid Parentheses", difficulty: "Easy" },
      { id: "min-stack", name: "Min Stack", difficulty: "Medium" },
      { id: "evaluate-reverse-polish-notation", name: "Evaluate Reverse Polish Notation", difficulty: "Medium" },
      { id: "generate-parentheses", name: "Generate Parentheses", difficulty: "Medium" },
      { id: "daily-temperatures", name: "Daily Temperatures", difficulty: "Medium" },
      { id: "car-fleet", name: "Car Fleet", difficulty: "Medium" },
      { id: "largest-rectangle-in-histogram", name: "Largest Rectangle in Histogram", difficulty: "Hard" }
    ]
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    x: 20,
    y: 220,
    dependencies: ["two-pointers"],
    problems: [
      { id: "best-time-to-buy-and-sell-stock", name: "Best Time to Buy and Sell Stock", difficulty: "Easy" },
      { id: "longest-substring-without-repeating-characters", name: "Longest Substring Without Repeating Characters", difficulty: "Medium" },
      { id: "longest-repeating-character-replacement", name: "Longest Repeating Character Replacement", difficulty: "Medium" },
      { id: "permutation-in-string", name: "Permutation in String", difficulty: "Medium" },
      { id: "minimum-window-substring", name: "Minimum Window Substring", difficulty: "Hard" },
      { id: "sliding-window-maximum", name: "Sliding Window Maximum", difficulty: "Hard" }
    ]
  },
  {
    id: "binary-search",
    name: "Binary Search",
    x: 45,
    y: 220,
    dependencies: ["two-pointers"],
    problems: [
      { id: "binary-search", name: "Binary Search", difficulty: "Easy" },
      { id: "search-a-2d-matrix", name: "Search a 2D Matrix", difficulty: "Medium" },
      { id: "koko-eating-bananas", name: "Koko Eating Bananas", difficulty: "Medium" },
      { id: "find-minimum-in-rotated-sorted-array", name: "Find Minimum in Rotated Sorted Array", difficulty: "Medium" },
      { id: "search-in-rotated-sorted-array", name: "Search in Rotated Sorted Array", difficulty: "Medium" },
      { id: "time-based-key-value-store", name: "Time Based Key-Value Store", difficulty: "Medium" },
      { id: "median-of-two-sorted-arrays", name: "Median of Two Sorted Arrays", difficulty: "Hard" }
    ]
  },
  {
    id: "linked-list",
    name: "Linked List",
    x: 80,
    y: 220,
    dependencies: ["arrays-hashing"],
    problems: [
      { id: "reverse-linked-list", name: "Reverse Linked List", difficulty: "Easy" },
      { id: "merge-two-sorted-lists", name: "Merge Two Sorted Lists", difficulty: "Easy" },
      { id: "reorder-list", name: "Reorder List", difficulty: "Medium" },
      { id: "remove-nth-node-from-end-of-list", name: "Remove Nth Node From End of List", difficulty: "Medium" },
      { id: "copy-list-with-random-pointer", name: "Copy List with Random Pointer", difficulty: "Medium" },
      { id: "add-two-numbers", name: "Add Two Numbers", difficulty: "Medium" },
      { id: "linked-list-cycle", name: "Linked List Cycle", difficulty: "Easy" },
      { id: "find-the-duplicate-number", name: "Find the Duplicate Number", difficulty: "Medium" },
      { id: "lru-cache", name: "LRU Cache", difficulty: "Medium" },
      { id: "merge-k-sorted-lists", name: "Merge k Sorted Lists", difficulty: "Hard" },
      { id: "reverse-nodes-in-k-group", name: "Reverse Nodes in k-Group", difficulty: "Hard" }
    ]
  },
  {
    id: "trees",
    name: "Trees",
    x: 80,
    y: 310,
    dependencies: ["linked-list"],
    problems: [
      { id: "invert-binary-tree", name: "Invert Binary Tree", difficulty: "Easy" },
      { id: "maximum-depth-of-binary-tree", name: "Maximum Depth of Binary Tree", difficulty: "Easy" },
      { id: "diameter-of-binary-tree", name: "Diameter of Binary Tree", difficulty: "Easy" },
      { id: "balanced-binary-tree", name: "Balanced Binary Tree", difficulty: "Easy" },
      { id: "same-tree", name: "Same Tree", difficulty: "Easy" },
      { id: "subtree-of-another-tree", name: "Subtree of Another Tree", difficulty: "Easy" },
      { id: "lowest-common-ancestor-of-a-binary-search-tree", name: "Lowest Common Ancestor of a BST", difficulty: "Easy" },
      { id: "binary-tree-level-order-traversal", name: "Binary Tree Level Order Traversal", difficulty: "Medium" },
      { id: "binary-tree-right-side-view", name: "Binary Tree Right Side View", difficulty: "Medium" },
      { id: "count-good-nodes-in-binary-tree", name: "Count Good Nodes in Binary Tree", difficulty: "Medium" },
      { id: "validate-binary-search-tree", name: "Validate Binary Search Tree", difficulty: "Medium" },
      { id: "kth-smallest-element-in-a-bst", name: "Kth Smallest Element in a BST", difficulty: "Medium" },
      { id: "construct-binary-tree-from-preorder-and-inorder-traversal", name: "Construct Binary Tree", difficulty: "Medium" },
      { id: "binary-tree-maximum-path-sum", name: "Binary Tree Maximum Path Sum", difficulty: "Hard" },
      { id: "serialize-and-deserialize-binary-tree", name: "Serialize & Deserialize Binary Tree", difficulty: "Hard" }
    ]
  },
  {
    id: "tries",
    name: "Tries",
    x: 65,
    y: 400,
    dependencies: ["trees"],
    problems: [
      { id: "implement-trie-prefix-tree", name: "Implement Trie (Prefix Tree)", difficulty: "Medium" },
      { id: "design-add-and-search-words-data-structure", name: "Design Add and Search Words", difficulty: "Medium" },
      { id: "word-search-ii", name: "Word Search II", difficulty: "Hard" }
    ]
  },
  {
    id: "heap",
    name: "Heap / Priority Queue",
    x: 80,
    y: 400,
    dependencies: ["trees"],
    problems: [
      { id: "kth-largest-element-in-a-stream", name: "Kth Largest Element in a Stream", difficulty: "Easy" },
      { id: "last-stone-weight", name: "Last Stone Weight", difficulty: "Easy" },
      { id: "k-closest-points-to-origin", name: "K Closest Points to Origin", difficulty: "Medium" },
      { id: "kth-largest-element-in-an-array", name: "Kth Largest Element in an Array", difficulty: "Medium" },
      { id: "task-scheduler", name: "Task Scheduler", difficulty: "Medium" },
      { id: "design-twitter", name: "Design Twitter", difficulty: "Medium" },
      { id: "find-median-from-data-stream", name: "Find Median from Data Stream", difficulty: "Hard" }
    ]
  },
  {
    id: "backtracking",
    name: "Backtracking",
    x: 95,
    y: 400,
    dependencies: ["trees"],
    problems: [
      { id: "subsets", name: "Subsets", difficulty: "Medium" },
      { id: "combination-sum", name: "Combination Sum", difficulty: "Medium" },
      { id: "permutations", name: "Permutations", difficulty: "Medium" },
      { id: "subsets-ii", name: "Subsets II", difficulty: "Medium" },
      { id: "combination-sum-ii", name: "Combination Sum II", difficulty: "Medium" },
      { id: "word-search", name: "Word Search", difficulty: "Medium" },
      { id: "palindrome-partitioning", name: "Palindrome Partitioning", difficulty: "Medium" },
      { id: "letter-combinations-of-a-phone-number", name: "Letter Combinations", difficulty: "Medium" },
      { id: "n-queens", name: "N-Queens", difficulty: "Hard" }
    ]
  },
  {
    id: "graphs",
    name: "Graphs",
    x: 50,
    y: 400,
    dependencies: ["trees"],
    problems: [
      { id: "number-of-islands", name: "Number of Islands", difficulty: "Medium" },
      { id: "clone-graph", name: "Clone Graph", difficulty: "Medium" },
      { id: "max-area-of-island", name: "Max Area of Island", difficulty: "Medium" },
      { id: "pacific-atlantic-water-flow", name: "Pacific Atlantic Water Flow", difficulty: "Medium" },
      { id: "surrounded-regions", name: "Surrounded Regions", difficulty: "Medium" },
      { id: "rotting-oranges", name: "Rotting Oranges", difficulty: "Medium" },
      { id: "walls-and-gates", name: "Walls and Gates", difficulty: "Medium" },
      { id: "course-schedule", name: "Course Schedule", difficulty: "Medium" },
      { id: "course-schedule-ii", name: "Course Schedule II", difficulty: "Medium" },
      { id: "redundant-connection", name: "Redundant Connection", difficulty: "Medium" },
      { id: "number-of-connected-components-in-an-undirected-graph", name: "Connected Components", difficulty: "Medium" },
      { id: "graph-valid-tree", name: "Graph Valid Tree", difficulty: "Medium" },
      { id: "word-ladder", name: "Word Ladder", difficulty: "Hard" }
    ]
  },
  {
    id: "advanced-graphs",
    name: "Advanced Graphs",
    x: 42,
    y: 490,
    dependencies: ["graphs", "heap"],
    problems: [
      { id: "reconstruct-itinerary", name: "Reconstruct Itinerary", difficulty: "Hard" },
      { id: "min-cost-to-connect-all-points", name: "Min Cost to Connect All Points", difficulty: "Medium" },
      { id: "network-delay-time", name: "Network Delay Time", difficulty: "Medium" },
      { id: "swim-in-rising-water", name: "Swim in Rising Water", difficulty: "Hard" },
      { id: "alien-dictionary", name: "Alien Dictionary", difficulty: "Hard" },
      { id: "cheapest-flights-within-k-stops", name: "Cheapest Flights", difficulty: "Medium" }
    ]
  },
  {
    id: "one-d-dp",
    name: "1-D DP",
    x: 95,
    y: 490,
    dependencies: ["backtracking"],
    problems: [
      { id: "climbing-stairs", name: "Climbing Stairs", difficulty: "Easy" },
      { id: "min-cost-climbing-stairs", name: "Min Cost Climbing Stairs", difficulty: "Easy" },
      { id: "house-robber", name: "House Robber", difficulty: "Medium" },
      { id: "house-robber-ii", name: "House Robber II", difficulty: "Medium" },
      { id: "longest-palindromic-substring", name: "Longest Palindromic Substring", difficulty: "Medium" },
      { id: "palindromic-substrings", name: "Palindromic Substrings", difficulty: "Medium" },
      { id: "decode-ways", name: "Decode Ways", difficulty: "Medium" },
      { id: "coin-change", name: "Coin Change", difficulty: "Medium" },
      { id: "maximum-product-subarray", name: "Maximum Product Subarray", difficulty: "Medium" },
      { id: "word-break", name: "Word Break", difficulty: "Medium" },
      { id: "longest-increasing-subsequence", name: "Longest Increasing Subsequence", difficulty: "Medium" },
      { id: "partition-equal-subset-sum", name: "Partition Equal Subset Sum", difficulty: "Medium" }
    ]
  },
  {
    id: "greedy",
    name: "Greedy",
    x: 80,
    y: 490,
    dependencies: ["heap"],
    problems: [
      { id: "maximum-subarray", name: "Maximum Subarray", difficulty: "Medium" },
      { id: "jump-game", name: "Jump Game", difficulty: "Medium" },
      { id: "jump-game-ii", name: "Jump Game II", difficulty: "Medium" },
      { id: "gas-station", name: "Gas Station", difficulty: "Medium" },
      { id: "hand-of-straights", name: "Hand of Straights", difficulty: "Medium" },
      { id: "merge-triplets-to-form-target-triplet", name: "Merge Triplets to Form Target Triplet", difficulty: "Medium" },
      { id: "partition-labels", name: "Partition Labels", difficulty: "Medium" },
      { id: "valid-parenthesis-string", name: "Valid Parenthesis String", difficulty: "Medium" }
    ]
  },
  {
    id: "two-d-dp",
    name: "2-D DP",
    x: 95,
    y: 580,
    dependencies: ["one-d-dp"],
    problems: [
      { id: "unique-paths", name: "Unique Paths", difficulty: "Medium" },
      { id: "longest-common-subsequence", name: "Longest Common Subsequence", difficulty: "Medium" },
      { id: "best-time-to-buy-and-sell-stock-with-cooldown", name: "Stock with Cooldown", difficulty: "Medium" },
      { id: "coin-change-ii", name: "Coin Change II", difficulty: "Medium" },
      { id: "target-sum", name: "Target Sum", difficulty: "Medium" },
      { id: "interleaving-string", name: "Interleaving String", difficulty: "Medium" },
      { id: "longest-increasing-path-in-a-matrix", name: "Longest Increasing Path", difficulty: "Hard" },
      { id: "distinct-subsequences", name: "Distinct Subsequences", difficulty: "Hard" },
      { id: "edit-distance", name: "Edit Distance", difficulty: "Hard" },
      { id: "burst-balloons", name: "Burst Balloons", difficulty: "Hard" },
      { id: "regular-expression-matching", name: "Regular Expression Matching", difficulty: "Hard" }
    ]
  },
  {
    id: "intervals",
    name: "Intervals",
    x: 80,
    y: 580,
    dependencies: ["greedy"],
    problems: [
      { id: "insert-interval", name: "Insert Interval", difficulty: "Medium" },
      { id: "merge-intervals", name: "Merge Intervals", difficulty: "Medium" },
      { id: "non-overlapping-intervals", name: "Non-overlapping Intervals", difficulty: "Medium" },
      { id: "meeting-rooms", name: "Meeting Rooms", difficulty: "Easy" },
      { id: "meeting-rooms-ii", name: "Meeting Rooms II", difficulty: "Medium" },
      { id: "minimum-interval-to-include-each-query", name: "Minimum Interval for Query", difficulty: "Hard" }
    ]
  },
  {
    id: "math-geometry",
    name: "Math & Geometry",
    x: 10,
    y: 130,
    dependencies: ["arrays-hashing"],
    problems: [
      { id: "rotate-image", name: "Rotate Image", difficulty: "Medium" },
      { id: "spiral-matrix", name: "Spiral Matrix", difficulty: "Medium" },
      { id: "set-matrix-zeroes", name: "Set Matrix Zeroes", difficulty: "Medium" },
      { id: "happy-number", name: "Happy Number", difficulty: "Easy" },
      { id: "plus-one", name: "Plus One", difficulty: "Easy" },
      { id: "powx-n", name: "Pow(x, n)", difficulty: "Medium" },
      { id: "multiply-strings", name: "Multiply Strings", difficulty: "Medium" },
      { id: "detect-squares", name: "Detect Squares", difficulty: "Medium" }
    ]
  },
  {
    id: "bit-manipulation",
    name: "Bit Manipulation",
    x: 10,
    y: 220,
    dependencies: [],
    problems: [
      { id: "single-number", name: "Single Number", difficulty: "Easy" },
      { id: "number-of-1-bits", name: "Number of 1 Bits", difficulty: "Easy" },
      { id: "counting-bits", name: "Counting Bits", difficulty: "Easy" },
      { id: "reverse-bits", name: "Reverse Bits", difficulty: "Easy" },
      { id: "missing-number", name: "Missing Number", difficulty: "Easy" },
      { id: "sum-of-two-integers", name: "Sum of Two Integers", difficulty: "Medium" },
      { id: "reverse-integer", name: "Reverse Integer", difficulty: "Medium" }
    ]
  }
];
