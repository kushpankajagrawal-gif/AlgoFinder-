const patterns = [
  {
    algorithm: "Kadane's Algorithm",
    match: /maximum subarray|largest sum.*contiguous|maximum sum.*contiguous/i,
    similarity: 96,
    time_complexity: 'O(n)',
    space_complexity: 'O(1)',
    explanation: 'The goal is to maximize a sum over a contiguous subarray. Kadane\'s algorithm tracks the best subarray ending at each position in one pass.',
    reasons: ['The requested result is a maximum contiguous sum.', 'Each position only needs the best sum ending there.', 'A running best avoids checking every possible subarray.'],
    steps: ['Set the current and best sums to the first value.', 'For each next value, choose between starting fresh or extending the current subarray.', 'Update the best sum and return it.'],
  },
  {
    algorithm: 'Dijkstra',
    match: /shortest path|minimum distance|minimum cost/i,
    exclude: /(?:^|[^-])negative (?:weights?|edges?)/i,
    require: /weighted|weight|nonnegative|non-negative|cost/i,
    similarity: 95,
    time_complexity: 'O((V + E) log V)',
    space_complexity: 'O(V)',
    explanation: 'This is a shortest-path problem on a weighted graph with non-negative edge costs. Dijkstra expands the currently cheapest known route first.',
    reasons: ['The goal is a minimum-cost route.', 'Edges have weights or costs.', 'Non-negative weights let settled distances remain final.'],
    steps: ['Initialize the source distance to zero and all others to infinity.', 'Use a min-priority queue to visit the closest unsettled vertex.', 'Relax its outgoing edges and continue until the destination is settled.'],
  },
  {
    algorithm: 'Bellman-Ford',
    match: /shortest path|minimum distance|minimum cost/i,
    require: /(?:^|[^-])negative (?:weights?|edges?)/i,
    similarity: 97,
    time_complexity: 'O(VE)',
    space_complexity: 'O(V)',
    explanation: 'Negative edge weights rule out Dijkstra. Bellman-Ford repeatedly relaxes every edge and can also detect reachable negative cycles.',
    reasons: ['The goal is a shortest path.', 'The graph may contain negative edge weights.', 'Repeated edge relaxation supports negative weights.'],
    steps: ['Set the source distance to zero and all other distances to infinity.', 'Relax every edge up to V - 1 times, stopping early if nothing changes.', 'Check once more for a reachable negative cycle.'],
  },
  {
    algorithm: 'Topological Sort',
    match: /dependency|prerequisite|course schedule|build order|task order|ordering.*directed acyclic|\bdag\b/i,
    similarity: 94,
    time_complexity: 'O(V + E)',
    space_complexity: 'O(V)',
    explanation: 'The problem describes dependencies. Topological sorting produces an order that places every prerequisite before the item that depends on it.',
    reasons: ['Some items must come before dependent items.', 'Dependencies form directed edges.', 'A topological order exists only when there is no dependency cycle.'],
    steps: ['Build the directed graph and count each vertex\'s incoming edges.', 'Queue vertices with no remaining prerequisites.', 'Remove them one by one, decrementing neighbors\' counts; fewer than V outputs means a cycle exists.'],
  },
  {
    algorithm: 'Sliding Window',
    match: /longest substring|shortest substring|longest subarray|shortest subarray|contiguous.{0,30}(window|length|unique|distinct)|window of size|without repeating|no duplicates/i,
    similarity: 93,
    time_complexity: 'O(n)',
    space_complexity: 'O(k)',
    explanation: 'The problem asks about a contiguous range. A sliding window updates the range incrementally instead of recomputing every candidate.',
    reasons: ['The answer concerns a contiguous substring or subarray.', 'The window can be expanded and then adjusted as constraints change.', 'Each element can be processed a constant number of times.'],
    steps: ['Move the right edge forward one element at a time.', 'Update counts or other state for the current window.', 'Move the left edge until the window is valid, then record the best answer.'],
  },
  {
    algorithm: 'BFS',
    match: /shortest path|fewest (steps|moves|edges)|minimum moves|level order|nearest/i,
    require: /graph|tree|grid|maze|unweighted|moves/i,
    similarity: 92,
    time_complexity: 'O(V + E)',
    space_complexity: 'O(V)',
    explanation: 'For an unweighted graph or grid, breadth-first search visits states by distance, so the first visit to a target uses the fewest edges or moves.',
    reasons: ['The goal minimizes the number of edges or moves.', 'The states form an unweighted graph or grid.', 'BFS explores one distance layer at a time.'],
    steps: ['Put the starting state in a queue and mark it visited.', 'Process states in queue order and add each valid unseen neighbor.', 'Stop when the target is reached; its BFS distance is minimal.'],
  },
  {
    algorithm: 'Binary Search',
    match: /binary search|sorted (?:array|list).{0,35}(?:search|find|target|position)|(?:search|find).{0,35}sorted (?:array|list)|first (?:and )?last position|lower bound|upper bound|search in a sorted|minimum feasible|find the smallest.*(?:threshold|capacity|value)/i,
    similarity: 92,
    time_complexity: 'O(log n)',
    space_complexity: 'O(1)',
    explanation: 'The input is sorted or the answer has a monotonic condition. Binary search repeatedly discards half of the remaining search space.',
    reasons: ['The input order or feasibility condition is monotonic.', 'A linear scan would inspect candidates that can be ruled out in groups.', 'Each comparison halves the remaining search interval.'],
    steps: ['Set low and high bounds for the candidate range.', 'Check the midpoint and keep the half that can still contain the answer.', 'Repeat until the target or boundary is identified.'],
  },
  {
    algorithm: 'Two Pointer',
    match: /two pointer|sorted.*(?:pair|sum)|pair.*(?:in|from).*sorted|palindrome/i,
    require: /sorted|palindrome|two pointer/i,
    similarity: 94,
    time_complexity: 'O(n)',
    space_complexity: 'O(1)',
    explanation: 'Two indexes can move from opposite ends of ordered data, using the ordering to discard many candidate pairs without extra storage.',
    reasons: ['The task compares values at two positions.', 'Sorted order or symmetry tells which pointer to move.', 'The scan uses constant extra space.'],
    steps: ['Place pointers at the relevant ends of the ordered input.', 'Evaluate the pair or condition at those positions.', 'Move the pointer that makes progress toward the target and stop when they meet.'],
  },
  {
    algorithm: 'HashMap',
    match: /two sum|target sum|sum to a target|sum equals|complement|frequency|count occurrences|duplicate|seen before|first unique/i,
    similarity: 90,
    time_complexity: 'O(n) average',
    space_complexity: 'O(n)',
    explanation: 'The problem involves fast lookup, matching values, or counting. A hash map stores information seen so far so each item can be handled in one pass on average.',
    reasons: ['Previously seen values or counts help answer the current step.', 'A hash map supports average constant-time lookup and updates.', 'One pass is often enough to build the result.'],
    steps: ['Create a map for the values or counts needed so far.', 'Scan the input and check the map before recording the current item.', 'Update the map and return the requested match or counts.'],
  },
  {
    algorithm: 'Stack',
    match: /balanced parentheses|valid parentheses|matching brackets|nested expression|next greater|previous greater|undo|last in first out/i,
    similarity: 93,
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    explanation: 'The problem depends on the most recently opened or encountered item. A stack naturally models this last-in-first-out relationship.',
    reasons: ['Recent unmatched items must be handled first.', 'Nested structure or next-element relationships fit stack operations.', 'Each item is pushed and popped at most once.'],
    steps: ['Scan the input from left to right.', 'Push items that need a later match; on a closing item, inspect and remove the stack top.', 'After the scan, verify that all required matches were found.'],
  },
  {
    algorithm: 'Union-Find',
    match: /connected components|connectivity|merge groups|number of islands|redundant connection|cycle in an undirected/i,
    similarity: 91,
    time_complexity: 'O(α(n)) per operation',
    space_complexity: 'O(n)',
    explanation: 'The task repeatedly joins groups or asks whether items are connected. Union-Find answers those operations efficiently with path compression and union by rank.',
    reasons: ['The problem asks about connected groups.', 'Connections are added as pairs of items.', 'Union-Find avoids repeatedly traversing the whole graph.'],
    steps: ['Start each item in its own set.', 'For each connection, find both set representatives.', 'If they differ, union the sets; compare representatives to answer connectivity.'],
  },
  {
    algorithm: 'Dynamic Programming',
    match: /longest common subsequence|edit distance|knapsack|minimum coins|coin change|number of ways|maximum value|overlapping subproblems|subsequence/i,
    similarity: 89,
    time_complexity: 'Depends on state count',
    space_complexity: 'Depends on stored states',
    explanation: 'The wording suggests overlapping subproblems or choices whose best result can be built from smaller states. Dynamic programming is a likely fit; the exact state depends on the constraints.',
    reasons: ['The problem combines repeated smaller subproblems.', 'Choices or prefixes can be represented as states.', 'A recurrence avoids recomputing the same cases.'],
    steps: ['Define a state that captures the smallest sufficient subproblem.', 'Write the recurrence and base cases.', 'Fill states in dependency order and recover the requested result.'],
  },
  {
    algorithm: 'Backtracking',
    match: /all (?:possible )?(?:combinations|permutations|subsets|arrangements)|generate.*(?:combination|permutation|subset)|n.?queens|word search|valid configurations/i,
    similarity: 90,
    time_complexity: 'Exponential in the worst case',
    space_complexity: 'O(depth)',
    explanation: 'The task asks for candidate arrangements or configurations. Backtracking explores choices and abandons a partial candidate as soon as it cannot lead to a valid answer.',
    reasons: ['The output consists of candidate combinations or arrangements.', 'Each partial answer can be extended by making another choice.', 'Early constraint checks can prune invalid branches.'],
    steps: ['Choose one available option and add it to the partial answer.', 'Recurse if the partial answer still satisfies the constraints.', 'Undo the choice and continue; save complete valid answers.'],
  },
  {
    algorithm: 'DFS',
    match: /traverse.*graph|graph traversal|reachability|path exists|tree traversal|cycle in a directed graph|explore all connected/i,
    similarity: 87,
    time_complexity: 'O(V + E)',
    space_complexity: 'O(V)',
    explanation: 'The problem requires exploring graph or tree connectivity. Depth-first search follows each branch as far as possible while marking visited states.',
    reasons: ['The task asks to explore connected states or determine reachability.', 'DFS visits each vertex and edge at most a constant number of times.', 'A visited set prevents repeated work and cycles.'],
    steps: ['Start from the source and mark it visited.', 'Visit each unvisited neighbor recursively or with an explicit stack.', 'Use the visited set or traversal result to answer the query.'],
  },
]

function matchesPattern(pattern, text) {
  return pattern.match.test(text)
    && (!pattern.exclude || !pattern.exclude.test(text))
    && (!pattern.require || pattern.require.test(text))
}

export function analyzeProblemLocally(problem) {
  const text = problem.trim().replace(/\s+/g, ' ')
  const ranked = patterns
    .filter((pattern) => matchesPattern(pattern, text))
    .sort((left, right) => right.similarity - left.similarity)
    .slice(0, 4)
    .map(({ algorithm, similarity, time_complexity, space_complexity, explanation, reasons, steps }) => ({
      algorithm,
      similarity,
      time_complexity,
      space_complexity,
      explanation,
      reasons,
      steps,
    }))

  const primary = ranked[0]
  const problemType = /graph|vertex|vertices|edge|path|island/i.test(text)
    ? 'Graph'
    : /tree|binary tree|node/i.test(text)
      ? 'Tree'
      : /string|substring|character|word/i.test(text)
        ? 'String'
        : /array|list|subarray|sequence/i.test(text)
          ? 'Array or sequence'
          : 'Not clear from the statement'
  const inputShape = /sorted/i.test(text)
    ? 'Sorted input'
    : /weighted|weight|negative edge|cost/i.test(text)
      ? 'Weighted input'
      : /grid|maze/i.test(text)
        ? 'Grid'
        : 'Not stated'
  const goal = /shortest|fewest|minimum/i.test(text)
    ? 'Minimize distance, cost, or steps'
    : /longest|maximum|largest/i.test(text)
      ? 'Maximize length, value, or sum'
      : /count|number of ways|frequency/i.test(text)
        ? 'Count matches or possibilities'
        : /find|search|determine|check/i.test(text)
          ? 'Find or check a condition'
          : 'Not clear from the statement'
  const constraint = text.match(/10\s*\^\s*\d+|\d{1,3}(?:,\d{3})+|\b(?:large|small|millions?|thousands?)\b/i)?.[0] || 'Not stated'

  if (!primary) {
    return {
      recommendations: [{
        algorithm: 'More detail needed',
        similarity: 0,
        time_complexity: 'Unknown',
        space_complexity: 'Unknown',
        explanation: 'No supported algorithm pattern matched this wording. Add the input format, constraints, expected output, and any important edge cases to get a useful recommendation.',
        reasons: ['The problem statement does not expose a recognizable pattern yet.', 'Algorithm choice depends on input size, ordering, and required output.'],
        steps: ['Specify the inputs and expected output.', 'Include constraints such as input size, ordering, and weight rules.', 'Mention edge cases or an example so the intended behavior is clear.'],
      }],
      characteristics: [['Problem Type', problemType], ['Detected Goal', goal], ['Input Shape', inputShape], ['Constraint Clue', constraint]],
    }
  }

  return {
    recommendations: ranked,
    characteristics: [['Problem Type', problemType], ['Detected Pattern', primary.algorithm], ['Detected Goal', goal], ['Input Shape', inputShape], ['Constraint Clue', constraint]],
  }
}