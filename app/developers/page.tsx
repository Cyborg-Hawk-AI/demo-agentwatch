import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import {
  Code2,
  Activity,
  Mail,
  AlertTriangle,
  Bell,
  ArrowRight,
  Database,
  Cloud,
  CreditCard,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Developer Docs — AgentWatch",
  description:
    "Feature documentation for AgentWatch: integration guide, data flow, and what's mocked vs production.",
};

const features = [
  {
    id: "rest-ping",
    icon: Code2,
    title: "SDK-less REST Ping Integration",
    demoLocation: "Demo → REST Integration tab",
    tryIt: "Click 'Send test ping' to simulate an agent status update. Switch between Python and cURL code tabs. Copy code to clipboard.",
    mocked:
      "Ping is simulated client-side with a 1.2s delay. No actual HTTP request is made. Activity feed and job progress update locally in React state.",
    production:
      "FastAPI endpoint at POST /v1/ping accepts JSON payloads with agent_id, job_id, step, status, progress, and output_summary. Validates Bearer token, upserts job/step records in Supabase, broadcasts via Realtime.",
    dataFlow: [
      "Agent calls POST /v1/ping with status payload",
      "FastAPI validates API key → writes to Supabase jobs + steps tables",
      "Supabase Realtime pushes update to dashboard WebSocket",
      "Edge Function checks anomaly rules on each ping",
    ],
  },
  {
    id: "timeline",
    icon: Activity,
    title: "Real-time Job Timeline",
    demoLocation: "Demo → Jobs & Timeline tab",
    tryIt: "Select any job from the left panel. Click rows to switch timelines. Use status filter dropdown and search box. Click 'Details' for the job modal, then 'View full timeline'.",
    mocked:
      "5 pre-populated jobs with realistic step data. Timeline renders from hardcoded mock-data.ts. Filtering and search work client-side.",
    production:
      "Timeline built from sequential ping records in Supabase. Each step stores duration_ms, expected_ms (rolling baseline), output_summary, and status. Dashboard subscribes to Realtime channel per job_id.",
    dataFlow: [
      "Each ping creates/updates a step row with timestamps",
      "Dashboard subscribes to job_id channel via Supabase Realtime",
      "Step durations computed from started_at / completed_at",
      "Progress bar = completed_steps / total_steps",
    ],
  },
  {
    id: "digests",
    icon: Mail,
    title: "Smart Digest Emails & Slack Messages",
    demoLocation: "Demo → Smart Digests tab",
    tryIt: "Toggle Email/Slack/All channel filter. Click any digest card to see full preview. Click 'Send test digest' to simulate sending.",
    mocked:
      "4 pre-written digest messages with realistic LLM-style summaries. 'Send test digest' adds a toast and activity event — no email actually sent.",
    production:
      "Cron triggers on milestones (step complete, job done) and weekly. Claude API summarizes job log from Supabase. Resend sends email; Slack webhook posts to channel. Template includes step counts, slow steps, and ETA.",
    dataFlow: [
      "Milestone event (job 67% done, job complete, anomaly detected)",
      "Edge Function fetches job log from Supabase",
      "LLM generates human-readable summary",
      "Resend (email) or Slack API delivers message",
    ],
  },
  {
    id: "anomalies",
    icon: AlertTriangle,
    title: "Anomaly Detection",
    demoLocation: "Demo → Anomaly Detection tab",
    tryIt: "Filter by severity (high/medium/low). Toggle 'Show resolved'. Click rows to highlight. Click 'Resolve' on any open anomaly.",
    mocked:
      "5 pre-detected anomalies (stall, loop, duration exceeded, error spike). Resolve button updates local state. No actual detection runs.",
    production:
      "Supabase Edge Function cron every 60 seconds. Rules: (1) no ping > threshold = stall, (2) same step retried >3× = loop, (3) duration >2× 30-day baseline = slow, (4) HTTP errors in output = error spike.",
    dataFlow: [
      "Cron scans all running jobs every minute",
      "Compares last_ping_at, step retry count, duration vs baseline",
      "Creates anomaly record + triggers alert if severity ≥ medium",
      "Dashboard shows anomalies via Realtime subscription",
    ],
  },
  {
    id: "dead-mans",
    icon: Bell,
    title: "Dead-Man's Switch & Webhooks",
    demoLocation: "Demo → Dead-Man's Switch tab",
    tryIt: "Drag the silence threshold slider (1–60 min). Edit the webhook URL. Click 'Fire test webhook'. Acknowledge alerts in the right panel.",
    mocked:
      "Threshold slider and webhook URL are local state only. 'Fire test webhook' shows a toast and adds activity event. 5 pre-populated alerts with acknowledge buttons.",
    production:
      "Per-agent/job configurable silence threshold. Cron checks (now - last_ping_at) > threshold. Fires: (1) in-app alert, (2) email/Slack digest, (3) POST to fallback webhook URL with job context JSON.",
    dataFlow: [
      "Cron runs every 60s on all active jobs",
      "If last_ping_at exceeds threshold → dead_mans_switch event",
      "POST fallback webhook with {job_id, agent_id, last_step, stalled_minutes}",
      "Alert appears in dashboard + notification channels",
    ],
  },
];

const stack = [
  { icon: Database, name: "Supabase", role: "Job/step storage, Realtime, Edge Functions" },
  { icon: Cloud, name: "Vercel", role: "Dashboard hosting, cron triggers" },
  { icon: Mail, name: "Resend", role: "Transactional & digest emails" },
  { icon: MessageSquare, name: "Slack API", role: "Channel digest notifications" },
  { icon: CreditCard, name: "Stripe", role: "Metered billing by ping volume" },
];

export default function DevelopersPage() {
  return (
    <>
      <Header active="developers" />

      <div className="border-b border-surface-border bg-surface-raised/50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Developer Documentation
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Every feature in the demo, what&apos;s mocked, and how it would work
            in production. Click through the{" "}
            <Link href="/demo" className="text-accent-hover hover:underline">
              live demo
            </Link>{" "}
            as you read.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Quick start */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-4">Quick Start (Production)</h2>
          <div className="rounded-xl border border-surface-border bg-surface-raised overflow-hidden">
            <pre className="p-6 text-sm font-mono text-gray-300 leading-relaxed overflow-x-auto">
{`# 1. Get your API key from the dashboard
export AGENTWATCH_API_KEY="aw_live_xxxx"

# 2. Ping from any agent (Python example)
import requests
requests.post("https://api.agentwatch.io/v1/ping", json={
    "agent_id": "my_bot",
    "job_id": "job_abc",
    "step": "Processing",
    "status": "running",
    "progress": 0.5,
    "output_summary": "Halfway done"
}, headers={"Authorization": f"Bearer {AGENTWATCH_API_KEY}"})

# 3. Watch the dashboard update in real time`}
            </pre>
          </div>
        </section>

        {/* Feature docs */}
        <section className="space-y-12">
          <h2 className="text-xl font-semibold">Feature Reference</h2>

          {features.map((feature, idx) => (
            <article
              key={feature.id}
              id={feature.id}
              className="rounded-xl border border-surface-border bg-surface-raised overflow-hidden"
            >
              <div className="flex items-center gap-3 border-b border-surface-border px-6 py-4">
                <div className="rounded-lg bg-accent/15 p-2 ring-1 ring-accent/25">
                  <feature.icon className="h-5 w-5 text-accent-hover" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {idx + 1}. {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    📍 {feature.demoLocation}
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-accent-hover mb-2">
                    How to try it in the demo
                  </h4>
                  <p className="text-sm text-gray-400">{feature.tryIt}</p>
                  <Link
                    href="/demo"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-accent-hover hover:underline"
                  >
                    Open demo <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-surface-border bg-surface p-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      Mocked in demo
                    </h4>
                    <p className="text-sm text-gray-400">{feature.mocked}</p>
                  </div>
                  <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-hover mb-2">
                      Production implementation
                    </h4>
                    <p className="text-sm text-gray-300">{feature.production}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">
                    Intended data flow
                  </h4>
                  <ol className="space-y-2">
                    {feature.dataFlow.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-overlay text-xs font-medium text-gray-500">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Production stack */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-6">Production Stack</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-surface-border bg-surface-raised p-5"
              >
                <item.icon className="h-5 w-5 text-accent mb-3" />
                <h3 className="font-medium">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* API reference */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-4">Ping API Reference</h2>
          <div className="rounded-xl border border-surface-border bg-surface-raised overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-left text-xs text-gray-500">
                  <th className="px-5 py-3 font-medium">Field</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Required</th>
                  <th className="px-5 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border font-mono text-xs">
                {[
                  ["agent_id", "string", "yes", "Unique agent identifier"],
                  ["job_id", "string", "yes", "Job run identifier"],
                  ["step", "string", "yes", "Current step name"],
                  ["status", "enum", "yes", "running | completed | failed"],
                  ["progress", "float", "no", "0.0–1.0 completion fraction"],
                  ["output_summary", "string", "no", "Human-readable step output"],
                ].map(([field, type, req, desc]) => (
                  <tr key={field}>
                    <td className="px-5 py-3 text-accent-hover">{field}</td>
                    <td className="px-5 py-3 text-gray-500">{type}</td>
                    <td className="px-5 py-3 text-gray-500">{req}</td>
                    <td className="px-5 py-3 text-gray-400 font-sans">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DEV NOTE tooltips */}
        <section className="mt-16 rounded-xl border border-surface-border bg-surface-raised p-6">
          <h2 className="text-lg font-semibold mb-2">About DEV NOTE tooltips</h2>
          <p className="text-sm text-gray-400">
            Throughout the demo, blue info icons (<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-accent-hover text-xs align-middle">i</span>) appear beside major controls. Hover or click them for context on what that feature does and how it would work in production. These tooltips are demo-only and won&apos;t appear in the production product.
          </p>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Try the interactive demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
