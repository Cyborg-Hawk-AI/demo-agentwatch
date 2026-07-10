export type JobStatus = "running" | "completed" | "failed" | "stalled" | "warning";

export interface AgentStep {
  id: string;
  name: string;
  status: "completed" | "running" | "failed" | "pending" | "skipped";
  durationMs: number;
  expectedMs: number;
  outputSummary: string;
  startedAt: string;
}

export interface AgentJob {
  id: string;
  name: string;
  agentId: string;
  company: string;
  status: JobStatus;
  progress: number;
  totalSteps: number;
  completedSteps: number;
  startedAt: string;
  lastPingAt: string;
  durationMs: number;
  steps: AgentStep[];
  anomalies: string[];
  deadMansSwitchMinutes: number;
}

export interface Agent {
  id: string;
  name: string;
  framework: string;
  company: string;
  status: "active" | "idle" | "offline";
  pingsThisMonth: number;
  lastPingAt: string;
  jobsTotal: number;
  jobsFailed: number;
}

export interface DigestMessage {
  id: string;
  channel: "email" | "slack";
  recipient: string;
  subject: string;
  preview: string;
  sentAt: string;
  jobId: string;
  jobName: string;
}

export interface Anomaly {
  id: string;
  jobId: string;
  jobName: string;
  company: string;
  type: "stall" | "loop" | "duration_exceeded" | "error_spike";
  severity: "low" | "medium" | "high";
  description: string;
  detectedAt: string;
  resolved: boolean;
}

export interface Alert {
  id: string;
  jobId: string;
  jobName: string;
  type: "dead_mans_switch" | "anomaly" | "completion" | "failure";
  message: string;
  triggeredAt: string;
  webhookFired: boolean;
  acknowledged: boolean;
}

export interface ActivityEvent {
  id: string;
  type: "ping" | "step_complete" | "alert" | "digest" | "webhook";
  message: string;
  timestamp: string;
  jobId?: string;
  agentId?: string;
}

export const AGENTS: Agent[] = [
  {
    id: "agt_research_bot",
    name: "Research Pipeline",
    framework: "LangChain",
    company: "Acme Analytics",
    status: "active",
    pingsThisMonth: 2847,
    lastPingAt: "2026-07-10T21:58:12Z",
    jobsTotal: 142,
    jobsFailed: 3,
  },
  {
    id: "agt_content_gen",
    name: "Content Generator",
    framework: "CrewAI",
    company: "Brightwave Media",
    status: "active",
    pingsThisMonth: 1923,
    lastPingAt: "2026-07-10T21:55:44Z",
    jobsTotal: 89,
    jobsFailed: 1,
  },
  {
    id: "agt_data_etl",
    name: "ETL Orchestrator",
    framework: "Custom Python",
    company: "DataForge Inc",
    status: "idle",
    pingsThisMonth: 412,
    lastPingAt: "2026-07-10T20:12:33Z",
    jobsTotal: 56,
    jobsFailed: 2,
  },
];

export const JOBS: AgentJob[] = [
  {
    id: "job_8f3a2b",
    name: "Q3 Market Research — EU Segment",
    agentId: "agt_research_bot",
    company: "Acme Analytics",
    status: "running",
    progress: 67,
    totalSteps: 6,
    completedSteps: 4,
    startedAt: "2026-07-10T19:42:00Z",
    lastPingAt: "2026-07-10T21:58:12Z",
    durationMs: 8172000,
    deadMansSwitchMinutes: 15,
    anomalies: ["Step 3 took 12 min (2× normal baseline)"],
    steps: [
      {
        id: "s1",
        name: "Initialize research context",
        status: "completed",
        durationMs: 45000,
        expectedMs: 60000,
        outputSummary: "Loaded 3 competitor profiles, 12 keyword clusters",
        startedAt: "2026-07-10T19:42:00Z",
      },
      {
        id: "s2",
        name: "Scrape industry reports",
        status: "completed",
        durationMs: 312000,
        expectedMs: 300000,
        outputSummary: "Retrieved 47 PDFs from Gartner, Forrester, Statista",
        startedAt: "2026-07-10T19:42:45Z",
      },
      {
        id: "s3",
        name: "LLM synthesis pass",
        status: "completed",
        durationMs: 720000,
        expectedMs: 360000,
        outputSummary: "Generated 2,400-word competitive analysis draft",
        startedAt: "2026-07-10T19:48:00Z",
      },
      {
        id: "s4",
        name: "Fact-check & citations",
        status: "completed",
        durationMs: 198000,
        expectedMs: 240000,
        outputSummary: "Verified 23 claims, added 18 source links",
        startedAt: "2026-07-10T20:00:12Z",
      },
      {
        id: "s5",
        name: "Generate executive summary",
        status: "running",
        durationMs: 540000,
        expectedMs: 180000,
        outputSummary: "In progress — drafting 1-page summary…",
        startedAt: "2026-07-10T21:03:30Z",
      },
      {
        id: "s6",
        name: "Export to Notion",
        status: "pending",
        durationMs: 0,
        expectedMs: 90000,
        outputSummary: "Waiting for previous step",
        startedAt: "",
      },
    ],
  },
  {
    id: "job_2c9d1e",
    name: "Blog Post Batch — July Week 2",
    agentId: "agt_content_gen",
    company: "Brightwave Media",
    status: "completed",
    progress: 100,
    totalSteps: 5,
    completedSteps: 5,
    startedAt: "2026-07-10T14:00:00Z",
    lastPingAt: "2026-07-10T16:22:18Z",
    durationMs: 8538000,
    deadMansSwitchMinutes: 10,
    anomalies: [],
    steps: [
      {
        id: "s1",
        name: "Topic ideation",
        status: "completed",
        durationMs: 120000,
        expectedMs: 120000,
        outputSummary: "Selected 8 topics from content calendar",
        startedAt: "2026-07-10T14:00:00Z",
      },
      {
        id: "s2",
        name: "Outline generation",
        status: "completed",
        durationMs: 240000,
        expectedMs: 180000,
        outputSummary: "Created H2/H3 outlines for all 8 posts",
        startedAt: "2026-07-10T14:02:00Z",
      },
      {
        id: "s3",
        name: "Draft writing",
        status: "completed",
        durationMs: 4200000,
        expectedMs: 3600000,
        outputSummary: "Wrote 8 posts averaging 1,200 words each",
        startedAt: "2026-07-10T14:06:00Z",
      },
      {
        id: "s4",
        name: "SEO optimization",
        status: "completed",
        durationMs: 900000,
        expectedMs: 600000,
        outputSummary: "Added meta descriptions, internal links, alt text",
        startedAt: "2026-07-10T15:16:00Z",
      },
      {
        id: "s5",
        name: "Publish to WordPress",
        status: "completed",
        durationMs: 378000,
        expectedMs: 300000,
        outputSummary: "Scheduled 8 posts for Jul 14–21",
        startedAt: "2026-07-10T15:31:00Z",
      },
    ],
  },
  {
    id: "job_7a4f8c",
    name: "Customer Churn ETL — Daily Sync",
    agentId: "agt_data_etl",
    company: "DataForge Inc",
    status: "stalled",
    progress: 33,
    totalSteps: 6,
    completedSteps: 2,
    startedAt: "2026-07-10T18:30:00Z",
    lastPingAt: "2026-07-10T19:47:22Z",
    durationMs: 4642000,
    deadMansSwitchMinutes: 5,
    anomalies: [
      "No ping received for 71 minutes (dead-man's switch threshold: 5 min)",
      "Possible loop detected: step 'Transform records' retried 4×",
    ],
    steps: [
      {
        id: "s1",
        name: "Extract from Snowflake",
        status: "completed",
        durationMs: 180000,
        expectedMs: 120000,
        outputSummary: "Pulled 142,847 customer records",
        startedAt: "2026-07-10T18:30:00Z",
      },
      {
        id: "s2",
        name: "Validate schema",
        status: "completed",
        durationMs: 45000,
        expectedMs: 60000,
        outputSummary: "All 24 columns validated, 0 null violations",
        startedAt: "2026-07-10T18:33:00Z",
      },
      {
        id: "s3",
        name: "Transform records",
        status: "running",
        durationMs: 4080000,
        expectedMs: 300000,
        outputSummary: "Stuck — retrying batch 7/12 (attempt 4)",
        startedAt: "2026-07-10T18:34:15Z",
      },
      {
        id: "s4",
        name: "Load to BigQuery",
        status: "pending",
        durationMs: 0,
        expectedMs: 180000,
        outputSummary: "Waiting",
        startedAt: "",
      },
      {
        id: "s5",
        name: "Run churn model",
        status: "pending",
        durationMs: 0,
        expectedMs: 600000,
        outputSummary: "Waiting",
        startedAt: "",
      },
      {
        id: "s6",
        name: "Notify stakeholders",
        status: "pending",
        durationMs: 0,
        expectedMs: 30000,
        outputSummary: "Waiting",
        startedAt: "",
      },
    ],
  },
  {
    id: "job_1b5e9d",
    name: "Competitor Price Scraper",
    agentId: "agt_research_bot",
    company: "Acme Analytics",
    status: "failed",
    progress: 50,
    totalSteps: 4,
    completedSteps: 2,
    startedAt: "2026-07-09T09:15:00Z",
    lastPingAt: "2026-07-09T09:48:33Z",
    durationMs: 2013000,
    deadMansSwitchMinutes: 15,
    anomalies: ["API rate limit exceeded on step 3 (429 after 3 retries)"],
    steps: [
      {
        id: "s1",
        name: "Load target URLs",
        status: "completed",
        durationMs: 12000,
        expectedMs: 15000,
        outputSummary: "Loaded 156 product URLs across 12 retailers",
        startedAt: "2026-07-09T09:15:00Z",
      },
      {
        id: "s2",
        name: "Scrape product pages",
        status: "completed",
        durationMs: 1080000,
        expectedMs: 900000,
        outputSummary: "Scraped 89/156 pages before rate limit",
        startedAt: "2026-07-09T09:15:12Z",
      },
      {
        id: "s3",
        name: "Normalize pricing data",
        status: "failed",
        durationMs: 921000,
        expectedMs: 300000,
        outputSummary: "Error: HTTP 429 Too Many Requests from api.retailer.com",
        startedAt: "2026-07-09T09:33:12Z",
      },
      {
        id: "s4",
        name: "Export CSV",
        status: "skipped",
        durationMs: 0,
        expectedMs: 60000,
        outputSummary: "Skipped due to upstream failure",
        startedAt: "",
      },
    ],
  },
  {
    id: "job_9e2c7a",
    name: "Social Media Calendar — August",
    agentId: "agt_content_gen",
    company: "Brightwave Media",
    status: "warning",
    progress: 80,
    totalSteps: 5,
    completedSteps: 4,
    startedAt: "2026-07-10T08:00:00Z",
    lastPingAt: "2026-07-10T21:55:44Z",
    durationMs: 50144000,
    deadMansSwitchMinutes: 10,
    anomalies: ["Step 4 duration 3.2× baseline — image generation unusually slow"],
    steps: [
      {
        id: "s1",
        name: "Content planning",
        status: "completed",
        durationMs: 300000,
        expectedMs: 300000,
        outputSummary: "Planned 30 posts across LinkedIn, X, Instagram",
        startedAt: "2026-07-10T08:00:00Z",
      },
      {
        id: "s2",
        name: "Copywriting",
        status: "completed",
        durationMs: 1800000,
        expectedMs: 1200000,
        outputSummary: "Wrote captions and hashtags for all 30 posts",
        startedAt: "2026-07-10T08:05:00Z",
      },
      {
        id: "s3",
        name: "Image generation",
        status: "completed",
        durationMs: 7200000,
        expectedMs: 3600000,
        outputSummary: "Generated 30 branded images via DALL·E",
        startedAt: "2026-07-10T08:35:00Z",
      },
      {
        id: "s4",
        name: "Schedule in Buffer",
        status: "running",
        durationMs: 40824000,
        expectedMs: 600000,
        outputSummary: "Scheduling post 24/30 — Buffer API slow",
        startedAt: "2026-07-10T10:35:00Z",
      },
      {
        id: "s5",
        name: "Send approval digest",
        status: "pending",
        durationMs: 0,
        expectedMs: 30000,
        outputSummary: "Waiting",
        startedAt: "",
      },
    ],
  },
];

export const DIGESTS: DigestMessage[] = [
  {
    id: "dig_001",
    channel: "email",
    recipient: "sarah.chen@acmeanalytics.com",
    subject: "AgentWatch Digest: Q3 Market Research — 4/6 steps done",
    preview:
      "Your agent completed 4/6 steps. Step 3 (LLM synthesis) took 12 min — 2× your normal baseline. Step 5 (executive summary) is currently running (9 min so far). ETA to completion: ~15 min.",
    sentAt: "2026-07-10T21:30:00Z",
    jobId: "job_8f3a2b",
    jobName: "Q3 Market Research — EU Segment",
  },
  {
    id: "dig_002",
    channel: "slack",
    recipient: "#agent-alerts",
    subject: "🚨 Dead-man's switch: Customer Churn ETL stalled",
    preview:
      "Job *Customer Churn ETL — Daily Sync* has not pinged in 71 minutes (threshold: 5 min). Step 3 'Transform records' retried 4×. Fallback webhook fired to https://hooks.dataforge.io/failover",
    sentAt: "2026-07-10T20:52:00Z",
    jobId: "job_7a4f8c",
    jobName: "Customer Churn ETL — Daily Sync",
  },
  {
    id: "dig_003",
    channel: "email",
    recipient: "marcus.lee@brightwavemedia.com",
    subject: "AgentWatch Digest: Blog Post Batch — ✅ Complete",
    preview:
      "Your agent completed all 5/5 steps in 2h 22m. Total output: 8 blog posts (9,600 words). Slowest step: Draft writing (70 min). Published to WordPress, scheduled Jul 14–21.",
    sentAt: "2026-07-10T16:25:00Z",
    jobId: "job_2c9d1e",
    jobName: "Blog Post Batch — July Week 2",
  },
  {
    id: "dig_004",
    channel: "slack",
    recipient: "#content-ops",
    subject: "⚠️ Anomaly: Social Media Calendar step running slow",
    preview:
      "Step 4 (Schedule in Buffer) has been running for 11.3 hours — 3.2× normal. Agent is still pinging. Consider checking Buffer API status.",
    sentAt: "2026-07-10T21:00:00Z",
    jobId: "job_9e2c7a",
    jobName: "Social Media Calendar — August",
  },
];

export const ANOMALIES: Anomaly[] = [
  {
    id: "anom_001",
    jobId: "job_8f3a2b",
    jobName: "Q3 Market Research — EU Segment",
    company: "Acme Analytics",
    type: "duration_exceeded",
    severity: "medium",
    description: "Step 3 (LLM synthesis) took 12 min vs 6 min baseline (2×)",
    detectedAt: "2026-07-10T20:00:12Z",
    resolved: false,
  },
  {
    id: "anom_002",
    jobId: "job_7a4f8c",
    jobName: "Customer Churn ETL — Daily Sync",
    company: "DataForge Inc",
    type: "stall",
    severity: "high",
    description: "No ping for 71 min — dead-man's switch triggered",
    detectedAt: "2026-07-10T20:52:00Z",
    resolved: false,
  },
  {
    id: "anom_003",
    jobId: "job_7a4f8c",
    jobName: "Customer Churn ETL — Daily Sync",
    company: "DataForge Inc",
    type: "loop",
    severity: "high",
    description: "Step 'Transform records' retried 4× without progress",
    detectedAt: "2026-07-10T19:15:00Z",
    resolved: false,
  },
  {
    id: "anom_004",
    jobId: "job_9e2c7a",
    jobName: "Social Media Calendar — August",
    company: "Brightwave Media",
    type: "duration_exceeded",
    severity: "medium",
    description: "Step 4 running 3.2× baseline (11.3h vs 3.5h expected)",
    detectedAt: "2026-07-10T21:00:00Z",
    resolved: false,
  },
  {
    id: "anom_005",
    jobId: "job_1b5e9d",
    jobName: "Competitor Price Scraper",
    company: "Acme Analytics",
    type: "error_spike",
    severity: "high",
    description: "HTTP 429 rate limit — job failed after 3 retries",
    detectedAt: "2026-07-09T09:48:33Z",
    resolved: true,
  },
];

export const ALERTS: Alert[] = [
  {
    id: "alert_001",
    jobId: "job_7a4f8c",
    jobName: "Customer Churn ETL — Daily Sync",
    type: "dead_mans_switch",
    message: "Agent stopped reporting for 71 min — fallback webhook fired",
    triggeredAt: "2026-07-10T20:52:00Z",
    webhookFired: true,
    acknowledged: false,
  },
  {
    id: "alert_002",
    jobId: "job_8f3a2b",
    jobName: "Q3 Market Research — EU Segment",
    type: "anomaly",
    message: "Step 3 duration exceeded 2× baseline",
    triggeredAt: "2026-07-10T20:00:12Z",
    webhookFired: false,
    acknowledged: true,
  },
  {
    id: "alert_003",
    jobId: "job_2c9d1e",
    jobName: "Blog Post Batch — July Week 2",
    type: "completion",
    message: "Job completed successfully in 2h 22m",
    triggeredAt: "2026-07-10T16:22:18Z",
    webhookFired: true,
    acknowledged: true,
  },
  {
    id: "alert_004",
    jobId: "job_1b5e9d",
    jobName: "Competitor Price Scraper",
    type: "failure",
    message: "Job failed at step 3: HTTP 429 Too Many Requests",
    triggeredAt: "2026-07-09T09:48:33Z",
    webhookFired: true,
    acknowledged: true,
  },
  {
    id: "alert_005",
    jobId: "job_9e2c7a",
    jobName: "Social Media Calendar — August",
    type: "anomaly",
    message: "Step 4 running 3.2× longer than baseline",
    triggeredAt: "2026-07-10T21:00:00Z",
    webhookFired: false,
    acknowledged: false,
  },
];

export const ACTIVITY: ActivityEvent[] = [
  {
    id: "act_001",
    type: "ping",
    message: "Research Pipeline pinged: step 5 in progress (67%)",
    timestamp: "2026-07-10T21:58:12Z",
    jobId: "job_8f3a2b",
    agentId: "agt_research_bot",
  },
  {
    id: "act_002",
    type: "ping",
    message: "Content Generator pinged: step 4 scheduling (80%)",
    timestamp: "2026-07-10T21:55:44Z",
    jobId: "job_9e2c7a",
    agentId: "agt_content_gen",
  },
  {
    id: "act_003",
    type: "alert",
    message: "Dead-man's switch triggered for Customer Churn ETL",
    timestamp: "2026-07-10T20:52:00Z",
    jobId: "job_7a4f8c",
    agentId: "agt_data_etl",
  },
  {
    id: "act_004",
    type: "webhook",
    message: "Fallback webhook POST → https://hooks.dataforge.io/failover (200 OK)",
    timestamp: "2026-07-10T20:52:01Z",
    jobId: "job_7a4f8c",
  },
  {
    id: "act_005",
    type: "digest",
    message: "Email digest sent to sarah.chen@acmeanalytics.com",
    timestamp: "2026-07-10T21:30:00Z",
    jobId: "job_8f3a2b",
  },
  {
    id: "act_006",
    type: "step_complete",
    message: "Fact-check & citations completed (3m 18s)",
    timestamp: "2026-07-10T20:03:30Z",
    jobId: "job_8f3a2b",
  },
  {
    id: "act_007",
    type: "digest",
    message: "Slack digest posted to #content-ops",
    timestamp: "2026-07-10T21:00:00Z",
    jobId: "job_9e2c7a",
  },
  {
    id: "act_008",
    type: "ping",
    message: "Research Pipeline pinged: step 4 complete",
    timestamp: "2026-07-10T20:03:30Z",
    jobId: "job_8f3a2b",
    agentId: "agt_research_bot",
  },
];

export const PING_USAGE = {
  current: 4182,
  limit: 10000,
  period: "July 2026",
};

export const PRICING_TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    pings: "500 pings/mo",
    agents: "3 agents",
    features: ["REST ping API", "Job timeline", "Email digests", "7-day retention"],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    pings: "10,000 pings/mo",
    agents: "10 agents",
    features: [
      "Everything in Free",
      "Slack digests",
      "Anomaly detection",
      "Dead-man's switch",
      "30-day retention",
    ],
    cta: "Start trial",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    pings: "100,000 pings/mo",
    agents: "50 agents",
    features: [
      "Everything in Starter",
      "Custom webhooks",
      "Team access (5 seats)",
      "90-day retention",
      "Priority support",
    ],
    cta: "Start trial",
    highlighted: false,
  },
  {
    name: "Unlimited",
    price: "$149",
    period: "/month",
    pings: "Unlimited pings",
    agents: "Unlimited agents",
    features: [
      "Everything in Pro",
      "SSO & audit logs",
      "Dedicated Slack channel",
      "1-year retention",
      "Custom SLA",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export function formatDuration(ms: number): string {
  if (ms < 60000) return `${Math.round(ms / 1000)}s`;
  if (ms < 3600000) return `${Math.round(ms / 60000)}m`;
  const hours = Math.floor(ms / 3600000);
  const mins = Math.round((ms % 3600000) / 60000);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date("2026-07-10T22:06:00Z");
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export const PING_CODE_EXAMPLE = `import requests

# Ping AgentWatch from any agent — no SDK required
requests.post(
    "https://api.agentwatch.io/v1/ping",
    json={
        "agent_id": "agt_research_bot",
        "job_id": "job_8f3a2b",
        "step": "Generate executive summary",
        "status": "running",
        "progress": 0.67,
        "output_summary": "Drafting 1-page summary…"
    },
    headers={"Authorization": "Bearer aw_live_xxxx"}
)`;

export const CURL_EXAMPLE = `curl -X POST https://api.agentwatch.io/v1/ping \\
  -H "Authorization: Bearer aw_live_xxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "agt_research_bot",
    "job_id": "job_8f3a2b",
    "step": "Generate executive summary",
    "status": "running",
    "progress": 0.67,
    "output_summary": "Drafting 1-page summary…"
  }'`;
