"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import DevNote from "@/components/DevNote";
import Modal from "@/components/Modal";
import ToastContainer, { type Toast } from "@/components/Toast";
import {
  AGENTS,
  JOBS,
  DIGESTS,
  ANOMALIES,
  ALERTS,
  ACTIVITY,
  PING_USAGE,
  PING_CODE_EXAMPLE,
  CURL_EXAMPLE,
  type AgentJob,
  type JobStatus,
} from "@/lib/mock-data";
import { cn, formatDuration, formatRelativeTime, formatTimestamp } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Code2,
  Mail,
  AlertTriangle,
  Bell,
  Search,
  Filter,
  ChevronRight,
  Play,
  Pause,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Webhook,
  Copy,
  Send,
  RefreshCw,
  Settings,
  Eye,
  Zap,
  Radio,
  Circle,
} from "lucide-react";

type Tab = "overview" | "jobs" | "integration" | "digests" | "anomalies" | "alerts";

const STATUS_COLORS: Record<JobStatus, string> = {
  running: "text-accent-hover bg-accent/15 ring-accent/30",
  completed: "text-success bg-success/15 ring-success/30",
  failed: "text-danger bg-danger/15 ring-danger/30",
  stalled: "text-warning bg-warning/15 ring-warning/30",
  warning: "text-warning bg-warning/15 ring-warning/30",
};

const STEP_STATUS_ICON = {
  completed: CheckCircle2,
  running: Play,
  failed: XCircle,
  pending: Clock,
  skipped: Pause,
};

export default function DemoDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedJobId, setSelectedJobId] = useState<string>(JOBS[0].id);
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [codeTab, setCodeTab] = useState<"python" | "curl">("python");
  const [digestChannel, setDigestChannel] = useState<"all" | "email" | "slack">("all");
  const [selectedDigestId, setSelectedDigestId] = useState<string | null>(null);
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string | null>(null);
  const [deadMansMinutes, setDeadMansMinutes] = useState(15);
  const [webhookUrl, setWebhookUrl] = useState("https://hooks.dataforge.io/failover");
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [modalJob, setModalJob] = useState<AgentJob | null>(null);
  const [pingSimulating, setPingSimulating] = useState(false);
  const [localJobs, setLocalJobs] = useState(JOBS);
  const [localAlerts, setLocalAlerts] = useState(ALERTS);
  const [localAnomalies, setLocalAnomalies] = useState(ANOMALIES);
  const [activityFeed, setActivityFeed] = useState(ACTIVITY);
  const [anomalySeverityFilter, setAnomalySeverityFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [showResolvedAnomalies, setShowResolvedAnomalies] = useState(false);

  const addToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = `toast_${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const selectedJob = localJobs.find((j) => j.id === selectedJobId) ?? localJobs[0];

  const filteredJobs = localJobs.filter((job) => {
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredDigests = DIGESTS.filter(
    (d) => digestChannel === "all" || d.channel === digestChannel
  );

  const filteredAnomalies = localAnomalies.filter((a) => {
    const matchesSeverity = anomalySeverityFilter === "all" || a.severity === anomalySeverityFilter;
    const matchesResolved = showResolvedAnomalies || !a.resolved;
    return matchesSeverity && matchesResolved;
  });

  const simulatePing = () => {
    setPingSimulating(true);
    setTimeout(() => {
      setPingSimulating(false);
      const newEvent = {
        id: `act_${Date.now()}`,
        type: "ping" as const,
        message: "Mock ping received: step 5 progress updated to 72%",
        timestamp: new Date().toISOString(),
        jobId: "job_8f3a2b",
        agentId: "agt_research_bot",
      };
      setActivityFeed((prev) => [newEvent, ...prev]);
      setLocalJobs((prev) =>
        prev.map((j) =>
          j.id === "job_8f3a2b"
            ? { ...j, progress: 72, lastPingAt: new Date().toISOString() }
            : j
        )
      );
      addToast("Ping received! Job timeline updated in real time.", "success");
    }, 1200);
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast("Code copied to clipboard", "info");
  };

  const acknowledgeAlert = (alertId: string) => {
    setLocalAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
    addToast("Alert acknowledged", "info");
  };

  const resolveAnomaly = (anomalyId: string) => {
    setLocalAnomalies((prev) =>
      prev.map((a) => (a.id === anomalyId ? { ...a, resolved: true } : a))
    );
    addToast("Anomaly marked as resolved", "success");
  };

  const fireTestWebhook = () => {
    addToast(`Test webhook fired to ${webhookUrl}`, "warning");
    const newEvent = {
      id: `act_${Date.now()}`,
      type: "webhook" as const,
      message: `Test webhook POST → ${webhookUrl} (200 OK)`,
      timestamp: new Date().toISOString(),
    };
    setActivityFeed((prev) => [newEvent, ...prev]);
  };

  const sendTestDigest = () => {
    addToast("Test digest sent to sarah.chen@acmeanalytics.com", "success");
    const newEvent = {
      id: `act_${Date.now()}`,
      type: "digest" as const,
      message: "Test email digest sent to sarah.chen@acmeanalytics.com",
      timestamp: new Date().toISOString(),
      jobId: "job_8f3a2b",
    };
    setActivityFeed((prev) => [newEvent, ...prev]);
  };

  const openJobDetail = (job: AgentJob) => {
    setModalJob(job);
    setShowJobModal(true);
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "jobs", label: "Jobs & Timeline", icon: Briefcase },
    { id: "integration", label: "REST Integration", icon: Code2 },
    { id: "digests", label: "Smart Digests", icon: Mail },
    { id: "anomalies", label: "Anomaly Detection", icon: AlertTriangle },
    { id: "alerts", label: "Dead-Man's Switch", icon: Bell },
  ];

  return (
    <>
      <Header active="demo" />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="border-b border-surface-border bg-surface-raised/50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success ring-1 ring-success/30">
                <Circle className="h-2 w-2 fill-current animate-pulse-slow" />
                Live Demo
              </span>
              <span className="text-sm text-gray-500">
                Acme Analytics workspace · {PING_USAGE.current.toLocaleString()} / {PING_USAGE.limit.toLocaleString()} pings ({PING_USAGE.period})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowSettingsModal(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-surface-border px-3 py-1.5 text-sm text-gray-400 transition hover:border-accent/40 hover:text-gray-200"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Tab navigation */}
        <nav className="mb-6 flex flex-wrap gap-1 rounded-xl border border-surface-border bg-surface-raised p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                activeTab === tab.id
                  ? "bg-accent text-white shadow-sm"
                  : "text-gray-400 hover:bg-surface-overlay hover:text-gray-200"
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Active Jobs", value: localJobs.filter((j) => j.status === "running").length, icon: Play, color: "text-accent-hover" },
                { label: "Stalled / Warning", value: localJobs.filter((j) => j.status === "stalled" || j.status === "warning").length, icon: AlertTriangle, color: "text-warning" },
                { label: "Open Anomalies", value: localAnomalies.filter((a) => !a.resolved).length, icon: Zap, color: "text-danger" },
                { label: "Agents Online", value: AGENTS.filter((a) => a.status === "active").length, icon: Radio, color: "text-success" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-surface-border bg-surface-raised p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{stat.label}</span>
                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                  </div>
                  <div className={cn("mt-2 text-3xl font-bold", stat.color)}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Agents */}
              <div className="rounded-xl border border-surface-border bg-surface-raised">
                <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
                  <h3 className="font-semibold">Registered Agents</h3>
                  <DevNote note="In production, agents self-register on first ping. Each agent gets a unique ID and API key. Tracked in Supabase agents table." />
                </div>
                <div className="divide-y divide-surface-border">
                  {AGENTS.map((agent) => (
                    <button
                      key={agent.id}
                      type="button"
                      onClick={() => {
                        setActiveTab("integration");
                        addToast(`Viewing integration for ${agent.name}`, "info");
                      }}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-surface-overlay"
                    >
                      <div className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        agent.status === "active" ? "bg-success animate-pulse-slow" :
                        agent.status === "idle" ? "bg-warning" : "bg-gray-600"
                      )} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{agent.name}</div>
                        <div className="text-xs text-gray-500">{agent.framework} · {agent.company}</div>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <div>{agent.pingsThisMonth.toLocaleString()} pings</div>
                        <div>{formatRelativeTime(agent.lastPingAt)}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Activity feed */}
              <div className="rounded-xl border border-surface-border bg-surface-raised">
                <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
                  <h3 className="font-semibold">Live Activity</h3>
                  <div className="flex items-center gap-2">
                    <DevNote note="Activity feed streams from Supabase Realtime subscriptions. Every ping, alert, digest, and webhook appears here instantly." />
                    <button
                      type="button"
                      onClick={() => addToast("Activity feed refreshed", "info")}
                      className="rounded-lg p-1.5 text-gray-500 hover:bg-surface-overlay hover:text-gray-300"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-surface-border">
                  {activityFeed.map((event) => (
                    <div key={event.id} className="flex gap-3 px-5 py-3 text-sm">
                      <Activity className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-300">{event.message}</p>
                        <p className="text-xs text-gray-600">{formatRelativeTime(event.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ping usage chart (mock bar) */}
            <div className="rounded-xl border border-surface-border bg-surface-raised p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Ping Usage — {PING_USAGE.period}</h3>
                <DevNote note="Usage tracked per billing period in Supabase. Stripe metered billing fires when limits are exceeded. Free tier: 500 pings/mo." />
              </div>
              <div className="relative h-4 rounded-full bg-surface-overlay overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-accent-hover transition-all"
                  style={{ width: `${(PING_USAGE.current / PING_USAGE.limit) * 100}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>{PING_USAGE.current.toLocaleString()} pings used</span>
                <span>{((PING_USAGE.current / PING_USAGE.limit) * 100).toFixed(1)}% of Starter plan limit</span>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div className="grid gap-6 lg:grid-cols-5 animate-fade-in">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search jobs…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-surface-border bg-surface-overlay py-2 pl-9 pr-3 text-sm text-gray-200 placeholder:text-gray-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
                  />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as JobStatus | "all")}
                    className="appearance-none rounded-lg border border-surface-border bg-surface-overlay py-2 pl-3 pr-8 text-sm text-gray-200 focus:border-accent/50 focus:outline-none"
                  >
                    <option value="all">All statuses</option>
                    <option value="running">Running</option>
                    <option value="completed">Completed</option>
                    <option value="stalled">Stalled</option>
                    <option value="warning">Warning</option>
                    <option value="failed">Failed</option>
                  </select>
                  <Filter className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-raised divide-y divide-surface-border max-h-[600px] overflow-y-auto">
                {filteredJobs.map((job) => (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => setSelectedJobId(job.id)}
                    className={cn(
                      "flex w-full flex-col gap-2 px-4 py-4 text-left transition",
                      selectedJobId === job.id ? "bg-accent/10 border-l-2 border-l-accent" : "hover:bg-surface-overlay"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-sm leading-tight">{job.name}</span>
                      <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ring-1", STATUS_COLORS[job.status])}>
                        {job.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{job.company} · {job.completedSteps}/{job.totalSteps} steps</div>
                    <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
                      <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${job.progress}%` }} />
                    </div>
                  </button>
                ))}
                {filteredJobs.length === 0 && (
                  <div className="px-4 py-8 text-center text-sm text-gray-500">No jobs match your filters</div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="lg:col-span-3 rounded-xl border border-surface-border bg-surface-raised">
              <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
                <div>
                  <h3 className="font-semibold">{selectedJob.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {selectedJob.company} · Started {formatTimestamp(selectedJob.startedAt)} · Last ping {formatRelativeTime(selectedJob.lastPingAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <DevNote note="Timeline built from sequential ping payloads. Each ping records step name, duration, status, and output_summary. Rendered via Supabase Realtime." position="left" />
                  <button
                    type="button"
                    onClick={() => openJobDetail(selectedJob)}
                    className="rounded-lg border border-surface-border px-3 py-1.5 text-xs text-gray-400 hover:border-accent/40 hover:text-gray-200"
                  >
                    <Eye className="h-3.5 w-3.5 inline mr-1" />
                    Details
                  </button>
                </div>
              </div>

              {selectedJob.anomalies.length > 0 && (
                <div className="mx-5 mt-4 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">
                  <AlertTriangle className="inline h-4 w-4 mr-2" />
                  {selectedJob.anomalies.join(" · ")}
                </div>
              )}

              <div className="p-5 space-y-0">
                {selectedJob.steps.map((step, idx) => {
                  const Icon = STEP_STATUS_ICON[step.status];
                  const isSlow = step.durationMs > step.expectedMs * 1.5 && step.status === "completed";
                  return (
                    <div key={step.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full ring-2",
                          step.status === "completed" ? "bg-success/20 ring-success/40 text-success" :
                          step.status === "running" ? "bg-accent/20 ring-accent/40 text-accent-hover animate-pulse-slow" :
                          step.status === "failed" ? "bg-danger/20 ring-danger/40 text-danger" :
                          "bg-surface-overlay ring-surface-border text-gray-600"
                        )}>
                          <Icon className="h-4 w-4" />
                        </div>
                        {idx < selectedJob.steps.length - 1 && (
                          <div className={cn("w-0.5 flex-1 min-h-[2rem]", step.status === "completed" ? "bg-success/30" : "bg-surface-border")} />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{step.name}</span>
                          {step.durationMs > 0 && (
                            <span className={cn("text-xs", isSlow ? "text-warning font-medium" : "text-gray-500")}>
                              {formatDuration(step.durationMs)}
                              {isSlow && " (slow)"}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{step.outputSummary}</p>
                        {step.expectedMs > 0 && step.status !== "pending" && (
                          <div className="mt-2 h-1 rounded-full bg-surface-overlay overflow-hidden max-w-xs">
                            <div
                              className={cn("h-full rounded-full", isSlow ? "bg-warning" : "bg-success/60")}
                              style={{ width: `${Math.min((step.durationMs / step.expectedMs) * 100, 100)}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Integration Tab */}
        {activeTab === "integration" && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-xl border border-surface-border bg-surface-raised p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">SDK-less REST Ping API</h3>
                <DevNote note="Production: FastAPI endpoint at POST /v1/ping. Validates API key, writes to Supabase jobs/steps tables, triggers Realtime broadcast. No SDK — works with any HTTP client." />
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Integrate from LangChain, CrewAI, n8n, or any custom Python/Node agent in 2 lines. No SDK installation required.
              </p>

              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setCodeTab("python")}
                  className={cn("rounded-lg px-4 py-2 text-sm font-medium transition", codeTab === "python" ? "bg-accent text-white" : "text-gray-400 hover:bg-surface-overlay")}
                >
                  Python
                </button>
                <button
                  type="button"
                  onClick={() => setCodeTab("curl")}
                  className={cn("rounded-lg px-4 py-2 text-sm font-medium transition", codeTab === "curl" ? "bg-accent text-white" : "text-gray-400 hover:bg-surface-overlay")}
                >
                  cURL
                </button>
                <button
                  type="button"
                  onClick={() => copyCode(codeTab === "python" ? PING_CODE_EXAMPLE : CURL_EXAMPLE)}
                  className="ml-auto inline-flex items-center gap-2 rounded-lg border border-surface-border px-3 py-2 text-sm text-gray-400 hover:border-accent/40 hover:text-gray-200"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>

              <pre className="overflow-x-auto rounded-lg bg-surface p-4 text-sm font-mono text-gray-300 leading-relaxed">
                {codeTab === "python" ? PING_CODE_EXAMPLE : CURL_EXAMPLE}
              </pre>

              <div className="mt-6 flex items-center gap-4">
                <button
                  type="button"
                  onClick={simulatePing}
                  disabled={pingSimulating}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-hover disabled:opacity-50"
                >
                  {pingSimulating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {pingSimulating ? "Sending ping…" : "Send test ping"}
                </button>
                <span className="text-xs text-gray-500">
                  Simulates a ping from Research Pipeline → updates timeline & activity feed
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { step: "1", title: "Get API key", desc: "Sign up → copy your aw_live_xxxx key from dashboard" },
                { step: "2", title: "Add ping calls", desc: "POST after each agent step with status, progress, output_summary" },
                { step: "3", title: "Watch & relax", desc: "Timeline updates in real time; digests and alerts fire automatically" },
              ].map((item) => (
                <div key={item.step} className="rounded-xl border border-surface-border bg-surface-raised p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent-hover ring-1 ring-accent/30">
                    {item.step}
                  </div>
                  <h4 className="mt-3 font-medium">{item.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Digests Tab */}
        {activeTab === "digests" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Smart Progress Digests</h3>
                <p className="text-sm text-gray-500 mt-1">
                  LLM-generated summaries sent via email (Resend) or Slack
                </p>
              </div>
              <div className="flex items-center gap-3">
                <DevNote note="Production: Weekly cron + on-milestone triggers. LLM (Claude) summarizes job log from Supabase. Sent via Resend (email) or Slack webhook. Template: 'Your agent completed X/Y steps; step N took M min (K× normal).'" />
                <div className="flex rounded-lg border border-surface-border p-0.5">
                  {(["all", "email", "slack"] as const).map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setDigestChannel(ch)}
                      className={cn(
                        "rounded-md px-3 py-1.5 text-xs font-medium capitalize transition",
                        digestChannel === ch ? "bg-accent text-white" : "text-gray-400 hover:text-gray-200"
                      )}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={sendTestDigest}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
                >
                  <Send className="h-4 w-4" />
                  Send test digest
                </button>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {filteredDigests.map((digest) => (
                <button
                  key={digest.id}
                  type="button"
                  onClick={() => setSelectedDigestId(digest.id)}
                  className={cn(
                    "rounded-xl border p-5 text-left transition",
                    selectedDigestId === digest.id
                      ? "border-accent bg-accent/5"
                      : "border-surface-border bg-surface-raised hover:border-accent/30"
                  )}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium ring-1",
                      digest.channel === "email" ? "bg-accent/15 text-accent-hover ring-accent/30" : "bg-success/15 text-success ring-success/30"
                    )}>
                      {digest.channel}
                    </span>
                    <span className="text-xs text-gray-600">{formatRelativeTime(digest.sentAt)}</span>
                  </div>
                  <h4 className="font-medium text-sm">{digest.subject}</h4>
                  <p className="mt-2 text-sm text-gray-400 line-clamp-3">{digest.preview}</p>
                  <div className="mt-3 text-xs text-gray-600">To: {digest.recipient}</div>
                </button>
              ))}
            </div>

            {selectedDigestId && (
              <div className="rounded-xl border border-accent/30 bg-surface-raised p-6">
                <h4 className="font-semibold mb-4">Digest Preview</h4>
                {(() => {
                  const d = DIGESTS.find((dig) => dig.id === selectedDigestId);
                  if (!d) return null;
                  return (
                    <div className="rounded-lg border border-surface-border bg-surface p-5 font-mono text-sm text-gray-300 whitespace-pre-wrap">
                      <div className="text-gray-500 mb-4">─── {d.channel === "email" ? "EMAIL" : "SLACK"} ───</div>
                      <div><strong>To:</strong> {d.recipient}</div>
                      <div><strong>Subject:</strong> {d.subject}</div>
                      <div className="mt-4 border-t border-surface-border pt-4">{d.preview}</div>
                      <div className="mt-4 text-xs text-gray-600">Job: {d.jobName}</div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Anomalies Tab */}
        {activeTab === "anomalies" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Anomaly Detection</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Flags stalls, loops, and duration outliers against baselines
                </p>
              </div>
              <div className="flex items-center gap-3">
                <DevNote note="Production: Supabase Edge Function runs every minute. Compares step durations to rolling 30-day baselines. Detects: no-ping stalls, retry loops (same step >3×), duration >2× baseline, error rate spikes." />
                <select
                  value={anomalySeverityFilter}
                  onChange={(e) => setAnomalySeverityFilter(e.target.value as typeof anomalySeverityFilter)}
                  className="rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm text-gray-200"
                >
                  <option value="all">All severities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showResolvedAnomalies}
                    onChange={(e) => setShowResolvedAnomalies(e.target.checked)}
                    className="rounded border-surface-border bg-surface-overlay text-accent focus:ring-accent"
                  />
                  Show resolved
                </label>
              </div>
            </div>

            <div className="rounded-xl border border-surface-border bg-surface-raised overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-border text-left text-xs text-gray-500">
                    <th className="px-5 py-3 font-medium">Job</th>
                    <th className="px-5 py-3 font-medium">Type</th>
                    <th className="px-5 py-3 font-medium">Severity</th>
                    <th className="px-5 py-3 font-medium hidden md:table-cell">Description</th>
                    <th className="px-5 py-3 font-medium">Detected</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {filteredAnomalies.map((anomaly) => (
                    <tr
                      key={anomaly.id}
                      className={cn(
                        "transition hover:bg-surface-overlay cursor-pointer",
                        selectedAnomalyId === anomaly.id && "bg-accent/5",
                        anomaly.resolved && "opacity-50"
                      )}
                      onClick={() => setSelectedAnomalyId(anomaly.id)}
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium">{anomaly.jobName}</div>
                        <div className="text-xs text-gray-600">{anomaly.company}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-surface-overlay px-2 py-0.5 text-xs capitalize">
                          {anomaly.type.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium ring-1",
                          anomaly.severity === "high" ? "text-danger bg-danger/15 ring-danger/30" :
                          anomaly.severity === "medium" ? "text-warning bg-warning/15 ring-warning/30" :
                          "text-gray-400 bg-surface-overlay ring-surface-border"
                        )}>
                          {anomaly.severity}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell text-gray-400 max-w-xs truncate">
                        {anomaly.description}
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs">
                        {formatRelativeTime(anomaly.detectedAt)}
                      </td>
                      <td className="px-5 py-4">
                        {!anomaly.resolved && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              resolveAnomaly(anomaly.id);
                            }}
                            className="rounded-lg border border-surface-border px-2.5 py-1 text-xs text-gray-400 hover:border-success/40 hover:text-success"
                          >
                            Resolve
                          </button>
                        )}
                        {anomaly.resolved && (
                          <span className="text-xs text-success">Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Alerts / Dead-man's switch Tab */}
        {activeTab === "alerts" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-surface-border bg-surface-raised p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Dead-Man&apos;s Switch</h3>
                  <DevNote note="Production: Cron Edge Function checks last_ping_at every 60s. If (now - last_ping) > threshold, fires alert + optional fallback webhook POST. Configurable per agent/job." />
                </div>
                <p className="text-sm text-gray-400 mb-6">
                  If an agent stops pinging for N minutes, automatically trigger an alert and fire your fallback webhook.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Silence threshold (minutes)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={1}
                        max={60}
                        value={deadMansMinutes}
                        onChange={(e) => setDeadMansMinutes(Number(e.target.value))}
                        className="flex-1 accent-accent"
                      />
                      <span className="w-12 text-center font-mono text-accent-hover">{deadMansMinutes}m</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Fallback webhook URL
                    </label>
                    <input
                      type="url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="w-full rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm font-mono text-gray-200 focus:border-accent/50 focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={fireTestWebhook}
                    className="inline-flex items-center gap-2 rounded-lg border border-warning/40 bg-warning/10 px-4 py-2 text-sm font-medium text-warning hover:bg-warning/20"
                  >
                    <Webhook className="h-4 w-4" />
                    Fire test webhook
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-raised">
                <div className="border-b border-surface-border px-5 py-4">
                  <h3 className="font-semibold">Recent Alerts</h3>
                </div>
                <div className="divide-y divide-surface-border max-h-96 overflow-y-auto">
                  {localAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 px-5 py-4">
                      <Bell className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        alert.type === "dead_mans_switch" ? "text-danger" :
                        alert.type === "failure" ? "text-danger" :
                        alert.type === "completion" ? "text-success" : "text-warning"
                      )} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{alert.jobName}</div>
                        <p className="text-xs text-gray-500 mt-0.5">{alert.message}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                          <span>{formatRelativeTime(alert.triggeredAt)}</span>
                          {alert.webhookFired && (
                            <span className="text-warning">Webhook fired</span>
                          )}
                        </div>
                      </div>
                      {!alert.acknowledged && (
                        <button
                          type="button"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="shrink-0 rounded-lg border border-surface-border px-2 py-1 text-xs text-gray-400 hover:border-accent/40 hover:text-gray-200"
                        >
                          Ack
                        </button>
                      )}
                      {alert.acknowledged && (
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <Modal open={showSettingsModal} onClose={() => setShowSettingsModal(false)} title="Workspace Settings" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Workspace name</label>
            <input
              type="text"
              defaultValue="Acme Analytics"
              className="w-full rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm text-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Default dead-man&apos;s threshold</label>
            <select defaultValue="15" className="w-full rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm text-gray-200">
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Digest frequency</label>
            <select defaultValue="weekly" className="w-full rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm text-gray-200">
              <option value="milestone">On milestone only</option>
              <option value="weekly">Weekly + milestones</option>
              <option value="daily">Daily + milestones</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowSettingsModal(false);
              addToast("Settings saved", "success");
            }}
            className="w-full rounded-lg bg-accent py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Save changes
          </button>
        </div>
      </Modal>

      {/* Job Detail Modal */}
      <Modal open={showJobModal} onClose={() => setShowJobModal(false)} title="Job Details" size="lg">
        {modalJob && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Job ID</span>
                <p className="font-mono text-gray-300">{modalJob.id}</p>
              </div>
              <div>
                <span className="text-gray-500">Agent</span>
                <p className="text-gray-300">{modalJob.agentId}</p>
              </div>
              <div>
                <span className="text-gray-500">Status</span>
                <p className={cn("capitalize", STATUS_COLORS[modalJob.status].split(" ")[0])}>{modalJob.status}</p>
              </div>
              <div>
                <span className="text-gray-500">Duration</span>
                <p className="text-gray-300">{formatDuration(modalJob.durationMs)}</p>
              </div>
              <div>
                <span className="text-gray-500">Progress</span>
                <p className="text-gray-300">{modalJob.completedSteps}/{modalJob.totalSteps} steps ({modalJob.progress}%)</p>
              </div>
              <div>
                <span className="text-gray-500">Dead-man&apos;s threshold</span>
                <p className="text-gray-300">{modalJob.deadMansSwitchMinutes} minutes</p>
              </div>
            </div>
            {modalJob.anomalies.length > 0 && (
              <div className="rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm text-warning">
                {modalJob.anomalies.map((a, i) => (
                  <div key={i}>{a}</div>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                setShowJobModal(false);
                setSelectedJobId(modalJob.id);
                setActiveTab("jobs");
              }}
              className="w-full rounded-lg border border-surface-border py-2 text-sm text-gray-300 hover:border-accent/40"
            >
              View full timeline →
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
