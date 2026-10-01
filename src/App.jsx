import { useMemo, useState } from 'react'
import './App.css'
import './solution-outline.css'
import { analyzeProblemLocally } from './problemAnalysis.js'

const examples = ['Find two numbers with a target sum', 'Search an element in a sorted array', 'Find the shortest path in a weighted graph', 'Find the longest substring without repeating characters', 'Sort an array efficiently', 'Find the maximum subarray sum', 'Detect a cycle in a graph', 'Find the longest common subsequence']
const stages = ['Processing problem statement', 'Extracting keywords', 'Detecting problem pattern', 'Comparing algorithms', 'Analyzing constraints', 'Generating recommendations']
const algorithms = [
  ['HashMap', 'Hashing', 'Fast lookup for pairs, frequencies, and duplicates.', 'O(n) avg', 'O(n)'], ['Binary Search', 'Searching', 'Halve a sorted search space each step.', 'O(log n)', 'O(1)'], ['Two Pointer', 'Arrays', 'Move two indexes through ordered data.', 'O(n)', 'O(1)'], ['Sliding Window', 'Arrays', 'Track a changing contiguous range.', 'O(n)', 'O(k)'], ['Prefix Sum', 'Arrays', 'Answer range-sum queries efficiently.', 'O(n)', 'O(n)'], ["Kadane's Algorithm", 'Arrays', 'Find the maximum subarray sum.', 'O(n)', 'O(1)'], ['Merge Sort', 'Sorting', 'Stable divide-and-conquer sorting.', 'O(n log n)', 'O(n)'], ['Quick Sort', 'Sorting', 'Partition data around a pivot.', 'O(n log n)', 'O(log n)'], ['Heap Sort', 'Sorting', 'Sort with a binary heap.', 'O(n log n)', 'O(1)'], ['Stack', 'Stack', 'Manage last-in-first-out operations.', 'O(n)', 'O(n)'], ['Queue', 'Queue', 'Process first-in-first-out data.', 'O(n)', 'O(n)'], ['BFS', 'Graphs', 'Explore a graph layer by layer.', 'O(V + E)', 'O(V)'], ['DFS', 'Graphs', 'Traverse deeply through connected paths.', 'O(V + E)', 'O(V)'], ['Dijkstra', 'Graphs', 'Shortest paths with non-negative weights.', 'O(E log V)', 'O(V)'], ['Bellman-Ford', 'Graphs', 'Shortest paths with negative edges.', 'O(VE)', 'O(V)'], ['Floyd-Warshall', 'Graphs', 'All-pairs shortest paths.', 'O(V³)', 'O(V²)'], ['Topological Sort', 'Graphs', 'Order dependencies in a DAG.', 'O(V + E)', 'O(V)'], ['Union-Find', 'Graphs', 'Track connected components.', 'O(α(n))', 'O(n)'], ['Dynamic Programming', 'Dynamic Programming', 'Build answers from overlapping subproblems.', 'varies', 'varies'], ['Knapsack', 'Dynamic Programming', 'Optimize value under a capacity.', 'O(nW)', 'O(nW)'], ['Longest Common Subsequence', 'Strings', 'Compare ordered character sequences.', 'O(mn)', 'O(mn)'], ['Fast and Slow Pointer', 'Linked List', 'Detect cycles and midpoints.', 'O(n)', 'O(1)'], ['Backtracking', 'Backtracking', 'Explore and undo candidate choices.', 'O(2ⁿ)', 'O(n)'], ['N-Queens', 'Backtracking', 'Place queens without conflicts.', 'O(n!)', 'O(n)'],
]
const javaCode = `public int[] twoSum(int[] nums, int target) {
  Map<Integer, Integer> seen = new HashMap<>();
  for (int i = 0; i < nums.length; i++) {
    int need = target - nums[i];
    if (seen.containsKey(need)) return new int[] {seen.get(need), i};
    seen.put(nums[i], i);
  }
  return new int[] {-1, -1};
}`

function Flowchart() {
  const steps = [['01', 'Read problem', 'Natural language'], ['02', 'NLP processing', 'Keywords + intent'], ['03', 'Detect pattern', 'Array / pair search'], ['04', 'Match algorithms', 'TF-IDF similarity'], ['05', 'Recommend', 'Explain + complexity']]
  return <div className="phase-flow">{steps.map(([number, title, detail], index) => <div className="phase-flow-item" key={title}><div className="phase-flow-node"><span>{number}</span><b>{title}</b><small>{detail}</small></div>{index < steps.length - 1 && <i>↓</i>}</div>)}</div>
}

function ArchitecturePipeline() {
  const stages = ['ALGOFINDER', 'User Problem', 'NLP Processing', 'Sentence Embedding', 'Semantic Similarity', 'Problem Pattern Detection', 'Constraint Analysis', 'Algorithm Recommendation', 'Explanation + Complexity', 'Alternative Algorithms', 'Code']
  return <div className="architecture-pipeline" aria-label="AlgoFinder recommendation pipeline">{stages.map((stage, index) => <div className="architecture-step" key={stage}><div className={index === 0 ? 'architecture-node root' : 'architecture-node'}><span>{index === 0 ? '✦' : String(index).padStart(2, '0')}</span><b>{stage}</b></div>{index < stages.length - 1 && <i>↓</i>}</div>)}</div>
}

function HybridArchitecture() {
  return <div className="hybrid-architecture" aria-label="Phase 4 hybrid machine learning architecture"><div className="hybrid-box accent">Dorik Frontend</div><div className="hybrid-arrow">↓<small>Problem Text</small></div><div className="hybrid-box">FastAPI</div><div className="hybrid-arrow">↓</div><div className="hybrid-box">NLP Processing</div><div className="hybrid-arrow">↓</div><div className="hybrid-box">Semantic Model</div><div className="hybrid-arrow">↓</div><div className="hybrid-branch"><div><span className="hybrid-branch-line"></span><div className="hybrid-box branch-box">Feature Extraction</div></div><div><span className="hybrid-branch-line"></span><div className="hybrid-box branch-box">Constraint Analysis</div></div></div><div className="hybrid-merge">↘ <span>↙</span></div><div className="hybrid-box">Candidate Retrieval</div><div className="hybrid-arrow">↓</div><div className="hybrid-box">ML Ranking</div><div className="hybrid-arrow">↓</div><div className="hybrid-box">Algorithm Knowledge Base</div><div className="hybrid-arrow">↓</div><div className="hybrid-box">Recommendation + Reason</div><div className="hybrid-arrow">↓</div><div className="hybrid-box">Complexity + Alternatives</div><div className="hybrid-arrow">↓</div><div className="hybrid-box accent">Code</div></div>
}

function TeachingArchitecture() {
  return <div className="teaching-architecture" aria-label="Phase 5 LLM teaching architecture"><div className="teaching-node user-node">USER</div><div className="teaching-arrow">↓</div><div className="teaching-node">Problem Statement</div><div className="teaching-arrow">↓</div><div className="teaching-node">ML ENGINE <small>Phase 4</small></div><div className="teaching-arrow">↓</div><div className="teaching-node">Recommended Algorithm</div><div className="teaching-arrow">↓</div><div className="teaching-node">Algorithm Knowledge Base</div><div className="teaching-arrow">↓</div><div className="teaching-node llm-node">LLM ENGINE <small>Phase 5</small></div><div className="teaching-arrow">↓</div><div className="teaching-outputs"><div><span>↓</span><b>Explanation</b></div><div><span>↓</span><b>Dry Run</b></div><div><span>↓</span><b>AI Tutor</b></div></div><div className="teaching-merge">└──────────────┼──────────────┘<br /><b>Learn &amp; Solve</b></div></div>
}

function CodeIntelligenceArchitecture() {
  return <div className="code-intelligence-architecture" aria-label="Phase 7 AI Code Intelligence architecture"><div className="ci-node user">USER CODE</div><div className="ci-arrow">↓</div><div className="ci-node static">STATIC ANALYSIS <small>+ AST</small></div><div className="ci-arrow">↓</div><div className="ci-node">CODE INTELLIGENCE</div><div className="ci-branches"><div><span>↓</span><div className="ci-node">ALGORITHM<br />DETECTION</div></div><div><span>↓</span><div className="ci-node">COMPLEXITY<br />ANALYSIS</div></div></div><div className="ci-merge">↘ <span>↙</span></div><div className="ci-node llm">LLM <small>Explanation layer</small></div><div className="ci-arrow">↓</div><div className="ci-outputs"><div><b>Explanation + Review</b></div><div><b>Optimization</b></div></div><div className="ci-final">↓<strong>PHASE 8 EXECUTION</strong></div></div>
}

function CodeBlock({ language, children }) {
  const copy = () => navigator.clipboard?.writeText(children)
  return <div className="code-block"><div><span>{language}</span><button type="button" onClick={copy}>Copy Code</button></div><pre><code>{children}</code></pre></div>
}

const studioCode = {
  java: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[]{map.get(complement), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`,
  python: `def two_sum(nums, target):\n    seen = {}\n    for index, value in enumerate(nums):\n        complement = target - value\n        if complement in seen:\n            return [seen[complement], index]\n        seen[value] = index\n    return []`,
  cpp: `#include <unordered_map>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (seen.count(complement)) return {seen[complement], i};\n        seen[nums[i]] = i;\n    }\n    return {};\n}`,
}

function StudioStatus({ label, value = 'Ready' }) { return <span className="studio-status"><i></i>{label} <b>{value}</b></span> }

function CodeStudio({ problem, algorithm = 'HashMap' }) {
  const [language, setLanguage] = useState('java')
  const [style, setStyle] = useState('clean')
  const [comments, setComments] = useState('helpful')
  const [format, setFormat] = useState('leetcode')
  const [code, setCode] = useState(studioCode.java)
  const [busy, setBusy] = useState(false)
  const [panel, setPanel] = useState('explanation')
  const [message, setMessage] = useState('')
  const generate = async () => {
    setBusy(true); setMessage('')
    try {
      const response = await fetch('/generate-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ problem, algorithm, language, style, comments, format }) })
      if (!response.ok) throw new Error('Generation unavailable')
      const data = await response.json(); setCode(data.code || studioCode[language])
    } catch { setCode(studioCode[language]); setMessage('AI Code Generation Unavailable. Showing a fallback template from the algorithm knowledge base.') }
    finally { setBusy(false) }
  }
  const copyCode = () => navigator.clipboard?.writeText(code)
  const downloadCode = () => { const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([code], { type: 'text/plain' })); link.download = `solution.${language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : 'java'}`; link.click(); URL.revokeObjectURL(link.href) }
  return <section className="studio-page page-shell shell"><div className="page-heading"><span className="section-label">PHASE 6 • AI CODE GENERATION</span><h2>AI Code <em>Studio</em></h2><p>From problem to algorithm, explanation, code, tests, and review. Generated code is a starting point and should be tested before use.</p></div><div className="studio-pipeline">{['PROBLEM', 'ALGORITHM', 'EXPLANATION', 'GENERATE', 'REVIEW', 'OPTIMIZE'].map((item, index) => <span className={index === 3 ? 'current' : ''} key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}{index < 5 && <i>→</i>}</span>)}</div><div className="studio-grid"><aside className="studio-context"><div className="studio-panel-title"><span>Solution Context</span><StudioStatus label="AI Engine" value="Backend-ready" /></div><div className="studio-problem"><span className="panel-label">PROBLEM</span><p>{problem || 'Find two numbers whose sum equals a target.'}</p></div><div className="context-list"><span><small>Algorithm</small><b>{algorithm}</b></span><span><small>Pattern</small><b>Pair Search</b></span><span><small>Time</small><b>O(n)</b></span><span><small>Space</small><b>O(n)</b></span></div><span className="panel-label">CODE SETTINGS</span><label>Language<select value={language} onChange={(event) => { setLanguage(event.target.value); setCode(studioCode[event.target.value]) }}><option value="java">Java</option><option value="python">Python</option><option value="cpp">C++</option></select></label><label>Code Style<select value={style} onChange={(event) => setStyle(event.target.value)}><option value="beginner">Beginner</option><option value="clean">Clean</option><option value="interview">Interview</option><option value="optimized">Optimized</option></select></label><label>Comments<select value={comments} onChange={(event) => setComments(event.target.value)}><option value="minimal">Minimal</option><option value="helpful">Helpful</option><option value="detailed">Detailed</option></select></label><label>Output Format<select value={format} onChange={(event) => setFormat(event.target.value)}><option value="function">Function Only</option><option value="leetcode">LeetCode Style</option><option value="program">Complete Program</option><option value="competitive">Competitive Programming</option></select></label><button className="primary-button studio-generate" type="button" onClick={generate}>{busy ? 'Generating...' : '⚡ Generate Solution'}</button>{message && <p className="studio-message">{message}</p>}</aside><section className="studio-editor"><div className="editor-toolbar"><span>{language === 'java' ? 'Solution.java' : language === 'python' ? 'solution.py' : 'solution.cpp'}</span><div><button type="button" onClick={copyCode}>Copy</button><button type="button" onClick={downloadCode}>Download</button><button type="button" onClick={generate}>Regenerate</button></div></div><div className="editor-body"><ol>{code.split('\n').map((_, index) => <li key={index}>{index + 1}</li>)}</ol><pre><code>{code}</code></pre></div><div className="quality-row"><StudioStatus label="AI Generated" /><StudioStatus label="Complexity Available" /><StudioStatus label="Ready for Review" /></div></section></div><section className="studio-bottom"><div className="studio-tabs">{[['explanation', 'Explanation'], ['tests', 'Test Cases'], ['review', 'Code Review'], ['optimize', 'Optimize'], ['chat', 'Ask About Code']].map(([key, label]) => <button className={panel === key ? 'selected' : ''} type="button" onClick={() => setPanel(key)} key={key}>{label}</button>)}</div>{panel === 'explanation' && <div className="studio-result"><h3>Understand the code</h3><p>The HashMap stores each value with its index. For every number, the solution calculates the complement needed to reach the target, checks whether it was seen, and returns the pair of indexes.</p><div className="complexity-pair"><span>TIME<b>O(n)</b></span><span>SPACE<b>O(n)</b></span></div></div>}{panel === 'tests' && <div className="studio-result"><h3>AI Test Case Generator</h3><p>These are generated test ideas, not execution results.</p><div className="test-grid"><span>Basic<br /><b>[2, 7, 11, 15], 9 → [0, 1]</b></span><span>Duplicate<br /><b>[3, 3], 6 → [0, 1]</b></span><span>No solution<br /><b>[1, 2], 9 → []</b></span></div></div>}{panel === 'review' && <div className="studio-result"><h3>AI Code Review</h3><div className="review-list"><p><b>Algorithm</b> Matches the selected HashMap approach.</p><p><b>Complexity</b> Expected O(n) time and O(n) space.</p><p><b>Potential issue</b> Define the no-solution behavior for the problem contract.</p></div></div>}{panel === 'optimize' && <div className="studio-result"><h3>Optimize My Code</h3><p>Optimization suggestions will come from the backend review service. No complexity change is claimed without analysis.</p><button className="ghost-button" type="button" onClick={() => setMessage('Optimization request is ready for POST /optimize-code.')}>⚡ Find Improvements</button></div>}{panel === 'chat' && <div className="studio-result"><h3>Ask About Your Code</h3><p>Context sent to `/code-chat`: problem, algorithm, language, and current code.</p><div className="chat-composer"><input placeholder="Why is HashMap used here?" /><button type="button" onClick={() => setMessage('Code chat is ready for POST /code-chat.')}>Ask →</button></div></div>}</section></section>
}

function CodeRunner() {
  const [language, setLanguage] = useState('python')
  const [code, setCode] = useState('a = int(input())\nb = int(input())\nprint(a + b)')
  const [input, setInput] = useState('10\n20')
  const [activeTab, setActiveTab] = useState('output')
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [tests, setTests] = useState([{ input: '2\n3', expected: '5' }, { input: '10\n20', expected: '30' }])
  const [error, setError] = useState('')
  const run = async (endpoint, body) => {
    setStatus('running'); setError(''); setResult(null)
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!response.ok) throw new Error('Execution service unavailable')
      const data = await response.json(); setResult(data); setStatus(data.status || 'completed')
    } catch { setStatus('unavailable'); setError('AlgoFinder execution services are currently unavailable. No code was executed.') }
  }
  const runCode = () => run('/execute', { language, code, input })
  const runTests = () => run('/run-tests', { language, code, test_cases: tests })
  const addTest = () => setTests([...tests, { input: '', expected: '' }])
  return <section className="page-shell shell runner-page"><div className="page-heading"><span className="section-label">PHASE 8 • SECURE EXECUTION</span><h2>Run. Test. <em>Debug.</em> Improve.</h2><p>Execute DSA code in an isolated backend sandbox, inspect real output, and validate test cases. Phase 8 never runs untrusted code in the browser or frontend server.</p></div><div className="runner-toolbar"><label>Language<select value={language} onChange={(event) => setLanguage(event.target.value)}><option value="python">Python</option><option value="java">Java</option><option value="cpp">C++</option><option value="javascript">JavaScript</option></select></label><span className="sandbox-badge"><i></i> Sandbox backend required</span><button className="ghost-button" type="button" onClick={() => setCode('')}>Reset</button><button className="primary-button" type="button" onClick={runCode} disabled={status === 'running'}>{status === 'running' ? 'Running...' : '▶ Run Code'}</button><button className="primary-button" type="button" onClick={runTests} disabled={status === 'running'}>🧪 Run Tests</button></div><div className="runner-grid"><section className="runner-editor"><div className="runner-title"><span>Code Editor</span><span>Untrusted code stays in the sandbox</span></div><div className="runner-code"><ol>{code.split('\n').map((_, index) => <li key={index}>{index + 1}</li>)}</ol><textarea aria-label="Code editor" value={code} onChange={(event) => setCode(event.target.value)} spellCheck="false" /></div><div className="runner-input"><label>Custom Input<textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Enter program input" /></label></div></section><aside className="test-panel"><div className="runner-title"><span>Test Cases</span><button type="button" onClick={addTest}>+ Add test</button></div>{tests.map((test, index) => <div className="test-row" key={index}><b>Test {index + 1}</b><textarea aria-label={`Test ${index + 1} input`} value={test.input} onChange={(event) => setTests(tests.map((item, itemIndex) => itemIndex === index ? { ...item, input: event.target.value } : item))} placeholder="Input" /><textarea aria-label={`Test ${index + 1} expected output`} value={test.expected} onChange={(event) => setTests(tests.map((item, itemIndex) => itemIndex === index ? { ...item, expected: event.target.value } : item))} placeholder="Expected output" /></div>)}</aside></div>{error && <div className="runner-error"><b>Execution Service Unavailable</b><p>{error}</p><span>Configure the FastAPI sandbox with POST /execute and POST /run-tests.</span></div>}<section className="runner-console"><div className="console-tabs">{['output', 'errors', 'tests', 'performance'].map((tab) => <button type="button" className={activeTab === tab ? 'selected' : ''} onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}</div>{activeTab === 'output' && <pre>{result?.stdout || (status === 'idle' ? 'Run code to view actual stdout.' : status === 'unavailable' ? 'No output. Execution was not started.' : '')}</pre>}{activeTab === 'errors' && <pre>{result?.stderr || error || 'No errors reported by the execution service.'}</pre>}{activeTab === 'tests' && <div className="test-summary">{result ? <><b>{result.passed ?? 0} passed</b><span>{result.failed ?? 0} failed</span><small>{result.total_tests ?? 0} total tests</small></> : 'No tests executed.'}</div>}{activeTab === 'performance' && <div className="performance-summary"><span>Status <b>{result?.status || (status === 'idle' ? 'Not executed' : status)}</b></span><span>Observed runtime <b>{result?.execution_time_ms != null ? `${result.execution_time_ms} ms` : 'Unavailable'}</b></span><span>Memory <b>{result?.memory_used_mb != null ? `${result.memory_used_mb} MB` : 'Unavailable'}</b></span></div>}</section></section>
}

function LearningDashboard() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [goal, setGoal] = useState('DSA Fundamentals')
  const [dailyTarget, setDailyTarget] = useState(3)
  const loadDashboard = async () => {
    setLoading(true); setError('')
    try {
      const response = await fetch('/dashboard')
      if (!response.ok) throw new Error('Learning service unavailable')
      setDashboard(await response.json())
    } catch { setDashboard(null); setError('Personalized progress is not connected yet. Your private activity will appear here after the learning backend is enabled.') }
    finally { setLoading(false) }
  }
  return <section className="page-shell shell learning-page"><div className="page-heading"><span className="section-label">PHASE 9 • PERSONALIZED LEARNING</span><h2>Your DSA <em>Journey</em></h2><p>Understand your progress, strengthen weak areas, and discover what to practice next. Insights are calculated from your stored learning activity.</p></div><div className="learning-actions"><button className="primary-button" type="button" onClick={loadDashboard}>{loading ? 'Loading profile...' : '↻ Refresh Progress'}</button><button className="ghost-button" type="button">Continue Learning →</button></div>{error && <div className="learning-notice"><b>Learning data unavailable</b><p>{error}</p></div>}{dashboard?.stats ? <DashboardData data={dashboard} /> : <EmptyLearningState />}</section>
}

function EmptyLearningState() {
  return <><div className="learning-empty"><span className="empty-orbit">✦</span><span className="section-label">NEW LEARNER PROFILE</span><h3>Build your personalized learning profile</h3><p>There is not enough activity data yet. Solve a few problems, run tests, and view explanations to unlock progress insights.</p><div className="empty-actions"><button className="primary-button" type="button">Start Learning →</button><span>Activity is private to your account and calculated from real records.</span></div></div><div className="learning-preferences"><div><span className="panel-label">SET YOUR DIRECTION</span><h3>Learning preferences</h3><p>Choose a goal now; recommendations will use it once your profile has activity.</p></div><label>Learning goal<select><option>DSA Fundamentals</option><option>Interview Preparation</option><option>Competitive Programming</option><option>University Study</option><option>Algorithm Mastery</option></select></label><label>Daily problems<input type="number" min="1" max="20" defaultValue="3" /></label><label>Daily minutes<input type="number" min="10" max="240" defaultValue="45" /></label></div></>
}

function DashboardData({ data }) {
  const stats = data.stats || {}
  return <><div className="learning-stat-grid">{[['Problems solved', stats.problems_solved], ['Attempts', stats.attempts], ['Topics practiced', stats.topics_practiced], ['Current streak', stats.current_streak ? `${stats.current_streak} days` : 'No active streak']].map(([label, value]) => <article key={label}><span>{label}</span><b>{value ?? '—'}</b></article>)}</div><div className="learning-grid"><section className="learning-card"><div className="learning-card-head"><span>Learning progress</span><small>Estimated from activity</small></div>{data.progress?.length ? data.progress.map((item) => <div className="progress-row" key={item.topic}><span>{item.topic}</span><i><b style={{ width: `${Math.min(item.mastery_score || 0, 100)}%` }}></b></i><strong>{item.level || 'Developing'}</strong></div>) : <p className="muted-copy">Your progress chart will appear as you practice more problems.</p>}</section><section className="learning-card"><div className="learning-card-head"><span>Topics to practice</span><small>Based on stored activity</small></div>{data.practice_topics?.length ? data.practice_topics.map((item) => <div className="topic-suggestion" key={item.topic}><b>{item.topic}</b><span>{item.level || 'Needs practice'}</span><small>{item.reason}</small></div>) : <p className="muted-copy">No topics need additional practice right now.</p>}</section><section className="learning-card"><div className="learning-card-head"><span>Recommended next problem</span><small>Personalized recommendation</small></div>{data.recommendations?.length ? data.recommendations.slice(0, 2).map((item) => <div className="next-problem" key={item.problem_id}><span>{item.difficulty}</span><h3>{item.title}</h3><p>{item.reason}</p><button type="button">Solve problem →</button></div>) : <p className="muted-copy">Recommendations will appear after enough activity is recorded.</p>}</section><section className="learning-card"><div className="learning-card-head"><span>Recent activity</span><small>Private account history</small></div>{data.recent_activity?.length ? data.recent_activity.map((item) => <div className="activity-row" key={item.activity_id}><b>{item.activity_type}</b><span>{item.topic || 'DSA'} · {item.created_at}</span></div>) : <p className="muted-copy">Your learning history will appear here after your first activity.</p>}</section></div></>
}

function InterviewPage() {
  const [config, setConfig] = useState({ mode: 'mock', difficulty: 'medium', topic: 'mixed', language: 'java', duration_minutes: 30, hints_enabled: true, followups_enabled: true })
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const startInterview = async () => {
    setLoading(true); setError('')
    try {
      const response = await fetch('/interview/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config) })
      if (!response.ok) throw new Error('Interview service unavailable')
      setSession(await response.json())
    } catch { setError('The interview engine is not connected yet. No interview session or timer was started.') }
    finally { setLoading(false) }
  }
  if (session) return <InterviewSession session={session} config={config} onExit={() => setSession(null)} />
  return <section className="page-shell shell interview-page"><div className="page-heading"><span className="section-label">PHASE 10 • AI INTERVIEW PREPARATION</span><h2>AI DSA <em>Interview</em></h2><p>Practice explaining your thinking, selecting an algorithm, writing code, testing it, and discussing trade-offs. The interviewer guides the session without immediately revealing the solution.</p></div><div className="interview-setup"><div className="setup-intro"><span className="interview-mark">◎</span><span className="section-label">INTERVIEW SETUP</span><h3>Choose your practice conditions</h3><p>Use your Phase 9 profile to inform recommendations when the interview backend is connected.</p><div className="interview-recommendation"><b>Personalized recommendation</b><span>Available after learning activity is connected.</span></div></div><div className="setup-controls"><label>Interview type<select value={config.mode} onChange={(event) => setConfig({ ...config, mode: event.target.value })}><option value="practice">Practice Interview</option><option value="mock">Mock Interview</option><option value="simulation">Interview Simulation</option><option value="topic">Topic Interview</option></select></label><label>Difficulty<select value={config.difficulty} onChange={(event) => setConfig({ ...config, difficulty: event.target.value })}><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option><option value="mixed">Mixed</option></select></label><label>Topic<select value={config.topic} onChange={(event) => setConfig({ ...config, topic: event.target.value })}><option value="mixed">Mixed</option><option value="arrays">Arrays</option><option value="strings">Strings</option><option value="graphs">Graphs</option><option value="trees">Trees</option><option value="dynamic-programming">Dynamic Programming</option><option value="hashing">Hashing</option></select></label><label>Language<select value={config.language} onChange={(event) => setConfig({ ...config, language: event.target.value })}><option value="java">Java</option><option value="python">Python</option><option value="cpp">C++</option><option value="javascript">JavaScript</option></select></label><label>Duration<select value={config.duration_minutes} onChange={(event) => setConfig({ ...config, duration_minutes: Number(event.target.value) })}><option value="15">15 minutes</option><option value="30">30 minutes</option><option value="45">45 minutes</option></select></label><label className="check-label"><input type="checkbox" checked={config.hints_enabled} onChange={(event) => setConfig({ ...config, hints_enabled: event.target.checked })} /> Hints enabled</label><label className="check-label"><input type="checkbox" checked={config.followups_enabled} onChange={(event) => setConfig({ ...config, followups_enabled: event.target.checked })} /> Follow-ups enabled</label><button className="primary-button" type="button" onClick={startInterview} disabled={loading}>{loading ? 'Starting...' : 'Start Interview →'}</button></div></div>{error && <div className="interview-notice"><b>Interview engine unavailable</b><p>{error}</p></div>}<div className="interview-principles"><span>INTERVIEW FLOW</span><b>Problem</b><i>→</i><b>Approach</b><i>→</i><b>Algorithm</b><i>→</i><b>Code</b><i>→</i><b>Feedback</b></div></section>
}

function InterviewSession({ session, config, onExit }) {
  const [response, setResponse] = useState('')
  const [stage, setStage] = useState(session.state || 'problem_presented')
  const [message, setMessage] = useState('Tell me how you would approach this problem.')
  const [code, setCode] = useState('')
  const [complexity, setComplexity] = useState({ time: '', space: '' })
  const [busy, setBusy] = useState(false)
  const send = async (endpoint, payload) => { setBusy(true); try { const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id: session.session_id, ...payload }) }); if (!res.ok) throw new Error(); const data = await res.json(); setStage(data.next_stage || data.state || stage); setMessage(data.interviewer_message || 'Continue by explaining your reasoning.'); } catch { setMessage('Interview backend unavailable. Your response has not been marked as saved.'); } finally { setBusy(false) } }
  return <section className="page-shell shell session-page"><div className="session-header"><div><span className="section-label">AI DSA INTERVIEW</span><h2>{session.problem?.title || 'Interview Problem'}</h2></div><span className="session-state">{stage}</span></div><div className="session-grid"><article className="session-problem"><span className="panel-label">PROBLEM</span><p>{session.problem?.description || 'The problem statement will be supplied by the interview backend.'}</p><div className="session-meta"><span>Difficulty <b>{config.difficulty}</b></span><span>Topic <b>{config.topic}</b></span><span>Language <b>{config.language}</b></span></div></article><aside className="interviewer-card"><span className="panel-label">AI INTERVIEWER</span><div className="interviewer-message">{message}</div><textarea value={response} onChange={(event) => setResponse(event.target.value)} placeholder="Explain your thinking..." /><button className="primary-button" type="button" disabled={busy || !response.trim()} onClick={() => { send('/interview/respond', { stage, response }); setResponse('') }}>{busy ? 'Sending...' : 'Send Response →'}</button><button className="hint-button" type="button" disabled={!config.hints_enabled || busy} onClick={() => send('/interview/hint', { level: 1 })}>💡 Request Hint</button></aside></div><section className="session-code"><div className="runner-title"><span>Code Editor</span><span>Phase 8 sandbox integration</span></div><textarea value={code} onChange={(event) => setCode(event.target.value)} placeholder="Write your solution here. The interviewer will not reveal the solution during the session." /><div className="session-code-actions"><button className="primary-button" type="button" onClick={() => send('/interview/run-code', { code, language: config.language })}>▶ Run Code</button><button className="ghost-button" type="button" onClick={() => send('/interview/complexity', { time_complexity: complexity.time, space_complexity: complexity.space })}>Submit Complexity</button></div></section><section className="complexity-entry"><label>Time complexity<input value={complexity.time} onChange={(event) => setComplexity({ ...complexity, time: event.target.value })} placeholder="O(n)" /></label><label>Space complexity<input value={complexity.space} onChange={(event) => setComplexity({ ...complexity, space: event.target.value })} placeholder="O(n)" /></label><button className="ghost-button" type="button" onClick={onExit}>Exit Session</button></section></section>
}

function InterviewHistory({ analytics = false }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const load = async () => {
    setLoading(true); setError('')
    try {
      const response = await fetch(analytics ? '/interview/analytics' : '/interview/history')
      if (!response.ok) throw new Error()
      setData(await response.json())
    } catch { setData(null); setError('Interview history is not connected yet. Complete an authenticated interview session to populate this view.') }
    finally { setLoading(false) }
  }
  return <section className="page-shell shell interview-history"><div className="page-heading"><span className="section-label">PHASE 10 • {analytics ? 'ANALYTICS' : 'HISTORY'}</span><h2>Interview <em>{analytics ? 'Analytics' : 'History'}</em></h2><p>{analytics ? 'Review patterns across your recorded practice sessions without turning them into hiring predictions.' : 'Review your completed interview sessions, evidence, and practice feedback.'}</p></div><button className="primary-button" type="button" onClick={load}>{loading ? 'Loading...' : `Refresh ${analytics ? 'Analytics' : 'History'}`}</button>{error && <div className="interview-notice"><b>Interview data unavailable</b><p>{error}</p></div>}{data ? <div className="history-content">{analytics ? <div className="analytics-grid">{Object.entries(data.metrics || {}).map(([key, value]) => <article key={key}><span>{key.replaceAll('_', ' ')}</span><b>{value}</b></article>)}</div> : <div className="history-list">{(data.sessions || []).map((item) => <article key={item.session_id}><div><span>{item.difficulty} · {item.topic}</span><h3>{item.problem_title}</h3><small>{item.created_at}</small></div><b>{item.status}</b></article>)}</div>}</div> : <div className="learning-empty interview-empty"><span className="empty-orbit">◎</span><span className="section-label">NO SESSION DATA</span><h3>Complete an interview to unlock this view</h3><p>No interview history or analytics are available yet. Your sessions will appear here after the backend records them.</p></div>}</section>
}

function App() {
  const [problem, setProblem] = useState('')
  const [status, setStatus] = useState('idle')
  const stage = 0
  const [error, setError] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [characteristics, setCharacteristics] = useState(null)
  const [activeView, setActiveView] = useState('home')
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [light, setLight] = useState(false)

  const analyze = () => {
    if (!problem.trim()) { setStatus('invalid'); setError('Please enter a programming problem before analyzing.'); return }
    setStatus('loading'); setError(''); setRecommendations([])
    const result = analyzeProblemLocally(problem)
    setRecommendations(result.recommendations)
    setCharacteristics(result.characteristics)
    setStatus('success')
  }
  const filteredAlgorithms = useMemo(() => algorithms.filter(([name, group, description]) => (category === 'All' || group === category) && `${name} ${group} ${description}`.toLowerCase().includes(query.toLowerCase())), [query, category])
  const displayedRecommendations = recommendations
  const categories = ['All', ...new Set(algorithms.map((item) => item[1]))]
  const go = (view) => { setActiveView(view); setMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <div className={light ? 'app light' : 'app'}>
    <header className="nav shell"><a className="brand" href="#home" onClick={() => go('home')}><span className="brand-mark"><img src="/algofinder-mark.svg" alt="" /></span>AlgoFinder</a><button className="mobile-menu" type="button" onClick={() => setMobileMenu(!mobileMenu)}>☰</button><nav className={mobileMenu ? 'open' : ''}><button onClick={() => go('home')}>Home</button><button onClick={() => go('analyzer')}>Analyzer</button><button onClick={() => go('algorithms')}>Algorithms</button><button onClick={() => go('studio')}>Code Studio</button><button onClick={() => go('runner')}>Code Runner</button><button onClick={() => go('dashboard')}>Learning Dashboard</button><button onClick={() => go('interview')}>Interview</button><button onClick={() => go('how')}>How It Works</button><button onClick={() => go('about')}>About</button></nav><div className="nav-actions"><span className="nav-engine"><i></i> AI Engine</span><button className="theme-toggle" type="button" onClick={() => setLight(!light)}>☼ <i className={light ? 'on' : ''}></i> ☾</button><button className="nav-cta" type="button" onClick={() => go('analyzer')}>Analyze Problem →</button></div></header>
    <main>
      {(activeView === 'interview' || activeView === 'interview-history' || activeView === 'interview-analytics') && <div className="phase10-shortcuts shell"><button type="button" onClick={() => go('interview-history')}>Interview History</button><button type="button" onClick={() => go('interview-analytics')}>Interview Analytics</button></div>}
      {activeView === 'home' && <><section className="hero shell" id="home"><div className="hero-copy"><div className="eyebrow"><span></span> SMART ALGORITHMS <b>•</b> NLP <b>•</b> DATA STRUCTURES</div><h1>Find the right <em>algorithm</em><br />for your problem.</h1><p className="hero-subtitle">Describe your programming problem in natural language and AlgoFinder analyzes patterns, constraints, and similarity to recommend a suitable approach.</p><div className="hero-actions"><button className="primary-button" type="button" onClick={() => go('analyzer')}>✦ Analyze Problem <span>→</span></button><button className="ghost-button" type="button" onClick={() => go('algorithms')}>Explore Algorithms</button></div></div><div className="code-float">&lt;/&gt;</div><div className="feature-float"><p>ALGORITHM GRAPH</p><span>Connected structures</span><strong>DSA / NLP</strong></div></section><section className="signal-band shell"><span>01 / NLP</span><b>Natural language in</b><i>→</i><span>02 / MATCHING</span><b>Similarity + constraints</b><i>→</i><span>03 / OUTPUT</span><b>Explainable recommendation</b></section></>}

      {activeView === 'analyzer' && <section className="page-shell shell analyzer-page"><div className="page-heading"><span className="section-label">CORE WORKSPACE</span><h2>AI Algorithm <em>Analyzer</em></h2><p>Describe your DSA problem in your own words. AlgoFinder will analyze the problem and recommend suitable algorithms.</p></div><div className="analyzer-layout"><div className="problem-card"><div className="input-head"><span className="search-icon">⌕</span><span>PROBLEM STATEMENT</span><span className="input-status">{status === 'loading' ? 'PROCESSING' : 'READY'}</span></div><textarea maxLength="1000" value={problem} onChange={(event) => { setProblem(event.target.value); setStatus('idle'); setError('') }} placeholder="Example: Find two numbers in an array whose sum is equal to a target value." /><div className="input-foot"><span>{problem.length} / 1000</span><div><button className="ghost-button" type="button" onClick={() => { setProblem(''); setStatus('idle'); setError('') }}>Clear</button><button className="primary-button" type="button" onClick={analyze}>✦ Analyze Problem <span>→</span></button></div></div></div><div className="examples-panel"><span className="panel-label">EXAMPLE PROBLEMS</span>{examples.map((value) => <button type="button" key={value} onClick={() => setProblem(value)}>⌁ {value}</button>)}</div></div>{status === 'loading' && <div className="loading-state"><div className="loader-ring"></div><div><b>Analyzing Problem...</b><div className="loading-stages">{stages.map((item, index) => <span className={index <= stage ? 'done' : ''} key={item}>{index <= stage ? '✓' : '○'} {item}</span>)}</div></div></div>}{(status === 'error' || status === 'invalid') && <div className="error-state"><b>{status === 'invalid' ? 'Invalid Problem' : 'Unable to analyze the problem.'}</b><p>{error}</p><button className="ghost-button" type="button" onClick={analyze}>{status === 'invalid' ? 'Try Again' : 'Retry Analysis'}</button></div>}{status === 'success' && <RecommendationDashboard recommendations={displayedRecommendations} characteristics={characteristics} onExplore={(name) => { setSelectedAlgorithm(name); setActiveView('detail') }} onRetry={() => setStatus('idle')} />}</section>}

      {activeView === 'algorithms' && <section className="page-shell shell"><div className="page-heading"><span className="section-label">KNOWLEDGE BASE</span><h2>Explore <em>Algorithms</em></h2><p>Browse the algorithm knowledge base used by AlgoFinder.</p></div><div className="explorer-tools"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search algorithms..." />{categories.map((item) => <button type="button" className={category === item ? 'selected' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><div className="explorer-grid">{filteredAlgorithms.map(([name, group, description, time, space]) => <article className="explorer-card" key={name}><span>{group}</span><h3>{name}</h3><p>{description}</p><div><b>{time}</b><b>{space}</b></div><button type="button" onClick={() => { setSelectedAlgorithm(name); setActiveView('detail') }}>View Details →</button></article>)}</div></section>}

      {activeView === 'detail' && <AlgorithmDetail name={selectedAlgorithm || 'HashMap'} onBack={() => go('algorithms')} />}
      {activeView === 'studio' && <CodeStudio problem={problem} algorithm={selectedAlgorithm || 'HashMap'} />}
      {activeView === 'runner' && <CodeRunner />}
      {activeView === 'dashboard' && <LearningDashboard />}
      {activeView === 'interview' && <InterviewPage />}
      {activeView === 'interview-history' && <InterviewHistory />}
      {activeView === 'interview-analytics' && <InterviewHistory analytics />}
      {activeView === 'how' && <InfoPage title="How It Works" label="PHASE 7 CODE INTELLIGENCE" description="Static analysis establishes code facts first; the LLM explains those facts and suggests improvements. Execution remains a Phase 8 capability."><CodeIntelligenceArchitecture /><TeachingArchitecture /><HybridArchitecture /><ArchitecturePipeline /><div className="method-grid"><article><span>STATIC ANALYSIS</span><h3>Understand Structure</h3><p>Parsing, AST, control flow, data structures, and complexity analysis establish the implementation facts.</p></article><article><span>LLM LAYER</span><h3>Explain + Review</h3><p>The language model turns analysis results into educational explanations and contextual suggestions.</p></article><article><span>PHASE 8</span><h3>Execution Boundary</h3><p>Compilation, execution, and measured validation are intentionally kept outside Phase 7.</p></article></div></InfoPage>}
      {activeView === 'about' && <InfoPage title="About AlgoFinder" label="THE PROJECT" description="AlgoFinder is an educational intelligent system designed to help students and programmers understand which data structure or algorithm may be appropriate for a programming problem."><div className="about-grid"><article><h3>Project Objective</h3><p>Make algorithm selection more understandable, explainable, and connected to the way students describe problems.</p></article><article><h3>Proposed Solution</h3><p>Combine natural-language processing, similarity-based recommendation, algorithm knowledge, and constraint analysis.</p></article><article><h3>Built With</h3><p>Frontend: React / Vite<br />Backend: Python + FastAPI<br />NLP: preprocessing + TF-IDF<br />Knowledge base: structured JSON dataset</p></article><article><h3>Future Scope</h3><p>Sentence embeddings, hybrid ML recommendations, LLM explanations, and code analysis.</p></article></div><div className="roadmap"><span>ROADMAP</span><div>{['Rule-based', 'NLP + TF-IDF', 'Embeddings', 'Hybrid ML', 'LLM explanations', 'Code execution'].map((item, index) => <article key={item}><b>0{index + 1}</b><strong>{item}</strong></article>)}</div></div></InfoPage>}
    </main>
    <footer className="footer shell"><a className="brand" href="#home" onClick={() => go('home')}><span className="brand-mark"><img src="/algofinder-mark.svg" alt="" /></span>AlgoFinder</a><p>Find the Right Algorithm for Your Problem</p><div className="footer-links"><button onClick={() => go('home')}>Home</button><button onClick={() => go('analyzer')}>Analyzer</button><button onClick={() => go('algorithms')}>Algorithms</button><button onClick={() => go('studio')}>Code Studio</button><button onClick={() => go('runner')}>Code Runner</button><button onClick={() => go('dashboard')}>Learning Dashboard</button><button onClick={() => go('interview')}>Interview</button><button onClick={() => go('how')}>How It Works</button><button onClick={() => go('about')}>About</button></div><small>Built as an educational Computer Science project. © 2026 AlgoFinder</small></footer>
  </div>
}

function RecommendationDashboard({ recommendations, characteristics, onExplore, onRetry }) {
  const primary = recommendations[0]
  const alternatives = recommendations.slice(1)
  const traits = characteristics || [['Problem Type', 'Array'], ['Pattern', 'Pair Search'], ['Input', 'Unsorted Array'], ['Target', 'Sum'], ['Data Structure', 'Array'], ['Expected Complexity', primary.time_complexity]]
  const steps = primary.steps || []
  const reasons = primary.reasons || []
  const canExplore = algorithms.some(([name]) => name === primary.algorithm)
  return <div className="recommendation-dashboard">
    <div className="dashboard-heading">
      <div><span className="section-label">ANALYSIS RESULTS</span><h2>Algorithm <em>Recommendation</em></h2><p>Pattern matches are heuristic guidance based on wording. Check the full constraints before choosing an approach.</p></div>
      <button className="ghost-button" type="button" onClick={onRetry}>Try Another Problem</button>
    </div>
    <div className="recommendation-layout">
      <article className="primary-recommendation">
        <span className="panel-label">{canExplore ? 'RECOMMENDED ALGORITHM' : 'PATTERN NOT IDENTIFIED'}</span>
        <h3>{primary.algorithm}</h3>
        {primary.similarity > 0 && <div className="match-score"><b>{Number(primary.similarity).toFixed(0)}%</b><span>Heuristic pattern fit</span></div>}
        <p><b>{canExplore ? 'Why this approach?' : 'What to clarify?'}</b><br />{primary.explanation}</p>
        <div className="complexity-pair"><span>TIME <b>{primary.time_complexity}</b></span><span>SPACE <b>{primary.space_complexity}</b></span></div>
        {canExplore && <button className="primary-button" type="button" onClick={() => onExplore(primary.algorithm)}>View Algorithm →</button>}
        {steps.length > 0 && <div className="solution-outline"><span className="panel-label">SOLUTION OUTLINE</span><ol>{steps.map((step) => <li key={step}>{step}</li>)}</ol></div>}
      </article>
      <div className="dashboard-side">
        <div className="dashboard-block"><span className="panel-label">DETECTED PROBLEM CHARACTERISTICS</span><div className="trait-grid">{traits.map(([label, value]) => <span key={label}><small>{label}</small><b>{value}</b></span>)}</div></div>
        {reasons.length > 0 && <div className="dashboard-block"><span className="panel-label">WHY THIS MATCH?</span><ol className="reason-list">{reasons.map((reason) => <li key={reason}>{reason}</li>)}</ol></div>}
      </div>
    </div>
    {alternatives.length > 0 && <div className="alternatives-block"><span className="section-label">ALTERNATIVE ALGORITHMS</span><div className="alternative-cards">{alternatives.slice(0, 3).map((item) => <article key={item.algorithm}><span>{Number(item.similarity).toFixed(0)}% heuristic fit</span><h3>{item.algorithm}</h3><p>{item.explanation}</p><b>{item.time_complexity} · {item.space_complexity}</b><button type="button" onClick={() => onExplore(item.algorithm)}>View Details →</button></article>)}</div></div>}
  </div>
}

function AlgorithmDetail({ name, onBack }) {
  const item = algorithms.find(([algorithm]) => algorithm === name) || algorithms[0]
  return <section className="page-shell shell detail-page"><button className="back-button" type="button" onClick={onBack}>← Back to algorithms</button><div className="detail-header"><span className="section-label">{item[1]}</span><h2>{item[0]}</h2><p>{item[2]}</p></div><div className="detail-grid"><div><article className="detail-card"><h3>When to use</h3><ul><li>Finding pairs and fast lookups</li><li>Frequency counting</li><li>Duplicate detection</li><li>Key-value mapping</li></ul></article><article className="detail-card"><h3>Complexity</h3><div className="complexity-pair"><span>TIME <b>{item[3]}</b></span><span>SPACE <b>{item[4]}</b></span></div></article></div><CodeBlock language="Java" >{javaCode}</CodeBlock></div></section>
}

function InfoPage({ title, label, description, children }) { return <section className="page-shell shell info-page"><div className="page-heading"><span className="section-label">{label}</span><h2>{title}</h2><p>{description}</p></div>{children}</section> }

export default App
