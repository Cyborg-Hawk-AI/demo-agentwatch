import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import {
  CheckCircle2,
  ExternalLink,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Target,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Research — How We Found AgentWatch",
  description:
    "The research behind AgentWatch: real pain points from r/vibecoding, validation results, competitive landscape, and go-to-market strategy.",
};

const validationItems = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: true },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: true },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

export default function ResearchPage() {
  return (
    <>
      <Header active="research" />

      <div className="border-b border-surface-border bg-surface-raised/50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" />
            Validation: 9/9 checks passed · Score: 107/130
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How we found this idea
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            AgentWatch was discovered by mining real developer pain on Reddit,
            validated against 9 criteria, and auto-built as a working demo.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Origin story */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">The research: why this exists</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg">
              In{" "}
              <a
                href="https://www.reddit.com/r/vibecoding/"
                className="text-accent-hover hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                r/vibecoding
              </a>
              , a developer described &ldquo;treating AI workflows as long-running
              jobs&rdquo; and struggling with visibility — they were manually
              monitoring agents and using Moyai as a workaround. The complaint was
              that existing tools are either too heavy (full APM platforms) or too
              generic (task managers). Developers said they wanted something that
              &ldquo;just tells me if my agent is stuck or done&rdquo; without
              instrumenting their entire stack. The daily frequency of this pain and
              active tool-seeking behavior signals strong willingness to pay.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-surface-border bg-surface-raised p-5 text-center">
              <Target className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-sm text-gray-500">Cluster</div>
              <div className="font-medium text-sm mt-1">AI agent monitoring & progress tracking</div>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-raised p-5 text-center">
              <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
              <div className="text-sm text-gray-500">Rubric Score</div>
              <div className="font-medium text-2xl mt-1">107/130</div>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-raised p-5 text-center">
              <CheckCircle2 className="h-6 w-6 text-success mx-auto mb-2" />
              <div className="text-sm text-gray-500">Validation</div>
              <div className="font-medium text-2xl mt-1">9/9</div>
            </div>
          </div>
        </section>

        {/* Competitive landscape */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Competitive landscape</h2>
          <div className="rounded-xl border border-surface-border bg-surface-raised p-6">
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">Moyai</strong> is the closest competitor
              but is focused on general task tracking, not AI agent-specific
              telemetry. <strong className="text-white">Datadog</strong> and{" "}
              <strong className="text-white">New Relic</strong> are overkill and
              expensive for this use case. No lightweight, agent-native monitoring
              tool exists today.
            </p>
            <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
              <p className="text-sm text-gray-300">
                <Zap className="inline h-4 w-4 text-accent-hover mr-1" />
                <strong>Unfair advantage:</strong> Zero-dependency REST ping API means
                any agent framework (LangChain, CrewAI, custom Python) can integrate
                in 2 lines of code — no SDK lock-in.
              </p>
            </div>
          </div>
        </section>

        {/* Source pain point */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Source pain points (real posts)</h2>

          <div className="rounded-xl border border-surface-border bg-surface-raised p-6">
            <h3 className="font-semibold text-lg mb-4">
              Tracking long-running AI agents and monitoring their progress is
              time-consuming and requires manual oversight to prevent failures.
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <span className="text-gray-500">Persona</span>
                <p className="text-gray-300">AI workflow developer, automation engineer</p>
              </div>
              <div>
                <span className="text-gray-500">Current workaround</span>
                <p className="text-gray-300">Manually monitoring agents; using Moyai for tracking</p>
              </div>
              <div>
                <span className="text-gray-500">Frequency</span>
                <p className="text-gray-300">Daily</p>
              </div>
              <div>
                <span className="text-gray-500">WTP signal</span>
                <p className="text-gray-300">Pays for Moyai and other workflow tools; actively seeking solutions</p>
              </div>
            </div>

            <a
              href="https://www.reddit.com/r/vibecoding/comments/1uorrnr/ive_started_treating_some_ai_workflows_as/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-accent-hover hover:underline"
            >
              View original Reddit post
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        {/* Validation checklist */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Validation checklist (9/9)</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {validationItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-surface-border bg-surface-raised px-4 py-3"
              >
                <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                <span className="text-sm text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Business automation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">
            How this business runs itself (mailbox money)
          </h2>
          <p className="text-gray-400 mb-6">
            The goal is passive, low-maintenance recurring revenue: AI is how we
            build and operate the business, not necessarily what it sells.
          </p>

          <div className="rounded-xl border border-surface-border bg-surface-raised p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Agent pings arrive at the REST endpoint and are written to Supabase in
              real time. A cron Edge Function checks for stalled jobs every minute and
              fires webhooks/alerts automatically. Weekly digest emails are
              LLM-generated from job history and sent via Resend. Stripe manages all
              subscription events. Support is handled by an AI chat widget.
            </p>

            <div className="grid gap-4 sm:grid-cols-3 pt-4 border-t border-surface-border">
              <div className="text-center">
                <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-accent-hover">~1 hr</div>
                <div className="text-xs text-gray-500">Owner time per week</div>
              </div>
              <div className="text-center">
                <Zap className="h-6 w-6 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold">2.5 wks</div>
                <div className="text-xs text-gray-500">MVP estimate</div>
              </div>
              <div className="text-center">
                <DollarSign className="h-6 w-6 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold">$19+</div>
                <div className="text-xs text-gray-500">Starting price/mo</div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            <strong className="text-gray-400">MVP stack:</strong> FastAPI + Supabase
            + Resend + Slack API; simple React dashboard; 2.5 weeks to launch
          </p>
        </section>

        {/* GTM */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Go-to-market</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "r/vibecoding",
              "r/LangChain",
              "Hacker News Show HN",
              "AI/automation Discord servers",
              "n8n/Flowise community outreach",
            ].map((channel) => (
              <span
                key={channel}
                className="rounded-full border border-surface-border bg-surface-raised px-4 py-2 text-sm text-gray-400"
              >
                <Users className="inline h-3.5 w-3.5 mr-1.5 text-gray-600" />
                {channel}
              </span>
            ))}
          </div>
        </section>

        {/* About Idea Miner */}
        <section className="rounded-xl border border-surface-border bg-surface-raised p-6">
          <h2 className="text-lg font-semibold mb-3">About this program</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            This demo was auto-built by the <strong className="text-gray-300">Idea Miner</strong> pipeline: a twice-daily research program that mines Reddit, Hacker News, Stack Exchange, and GitHub for real people describing real pain, scores the opportunities, and automatically ships a working mock of every idea that passes validation (&gt;=8/9 checks, momentum not declining, not previously built). The bar for every idea: low-maintenance recurring revenue that a solo owner can run in a few hours a week.
          </p>
          <p className="mt-3 text-xs text-gray-600">
            Generated by Idea Miner run 2026-07-10-pm on 2026-07-10 22:06 UTC
          </p>
        </section>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover"
          >
            See the product demo
          </Link>
          <Link
            href="/developers"
            className="text-sm text-gray-400 hover:text-accent-hover transition"
          >
            Read developer docs →
          </Link>
        </div>
      </div>
    </>
  );
}
