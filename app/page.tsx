import Link from "next/link";
import Header from "@/components/Header";
import {
  Radio,
  Zap,
  Clock,
  Mail,
  AlertTriangle,
  Shield,
  ArrowRight,
  Check,
  Code2,
  Activity,
} from "lucide-react";
import { PRICING_TIERS } from "@/lib/mock-data";

const features = [
  {
    icon: Code2,
    title: "SDK-less REST pings",
    description:
      "Any agent framework integrates in 2 lines. POST status updates to a simple endpoint — no SDK lock-in.",
  },
  {
    icon: Activity,
    title: "Real-time job timeline",
    description:
      "See every agent step, duration, and output summary in a live timeline. Know exactly where your job is.",
  },
  {
    icon: Mail,
    title: "Smart digest alerts",
    description:
      "Get emails or Slack messages like: 'Your agent completed 4/6 steps; step 3 took 12 min (2× normal).'",
  },
  {
    icon: AlertTriangle,
    title: "Anomaly detection",
    description:
      "Automatically flags jobs that stall, loop, or exceed expected duration based on your baselines.",
  },
  {
    icon: Shield,
    title: "Dead-man's switch",
    description:
      "If an agent stops reporting for N minutes, trigger an alert or fire a fallback webhook automatically.",
  },
  {
    icon: Clock,
    title: "Zero babysitting",
    description:
      "Set it and forget it. AgentWatch watches your agents so you can focus on building, not monitoring.",
  },
];

export default function HomePage() {
  return (
    <>
      <Header active="home" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-surface to-surface" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGg0djRoLTR6TTAgMzRoNHY0SDB6TTAgMGg0djRoLTR6TTM2IDBoNHY0aC00eiIgZmlsbD0iIzMzMzMzMyIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-40" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent-hover">
              <Radio className="h-4 w-4" />
              Built for AI workflow developers
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Know if your agent is{" "}
              <span className="gradient-text">stuck or done</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              AgentWatch monitors long-running AI agent pipelines with a
              lightweight REST ping API. Get smart progress digests, anomaly
              alerts, and dead-man&apos;s switch webhooks — without instrumenting
              your entire stack.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-hover"
              >
                Try the interactive demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/developers"
                className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface-raised px-6 py-3 text-base font-semibold text-gray-300 transition hover:border-accent/40 hover:text-white"
              >
                View integration docs
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              Free tier: 3 agents, 500 pings/month · No credit card required
            </p>
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Integration time", value: "2 lines" },
              { label: "Ping latency", value: "<50ms" },
              { label: "Owner time/week", value: "<1 hr" },
              { label: "Validation score", value: "9/9" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-surface-border bg-surface-raised/50 p-4 text-center"
              >
                <div className="text-2xl font-bold text-accent-hover">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-surface-border bg-surface-raised/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need to stop babysitting agents
            </h2>
            <p className="mt-4 text-gray-400">
              Five core features that solve the #1 pain for AI workflow
              developers: visibility without overhead.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-surface-border bg-surface-raised p-6 transition hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="mb-4 inline-flex rounded-lg bg-accent/15 p-3 ring-1 ring-accent/25">
                  <feature.icon className="h-5 w-5 text-accent-hover" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Two lines of code. Full visibility.
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-xl border border-surface-border bg-surface-raised">
            <div className="flex items-center gap-2 border-b border-surface-border px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-danger/80" />
              <div className="h-3 w-3 rounded-full bg-warning/80" />
              <div className="h-3 w-3 rounded-full bg-success/80" />
              <span className="ml-2 text-xs text-gray-500 font-mono">
                agent_ping.py
              </span>
            </div>
            <pre className="overflow-x-auto p-6 text-sm leading-relaxed text-gray-300 font-mono">
{`import requests

requests.post("https://api.agentwatch.io/v1/ping", json={
    "agent_id": "my_research_bot",
    "job_id": "job_abc123",
    "step": "LLM synthesis",
    "status": "running",
    "progress": 0.67,
    "output_summary": "Drafting summary…"
})`}
            </pre>
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 text-accent-hover hover:text-accent transition"
            >
              <Zap className="h-4 w-4" />
              See it in action in the live demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-surface-border bg-surface-raised/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Usage-based pricing
            </h2>
            <p className="mt-4 text-gray-400">
              Pay for pings, not seats. Scale from side projects to production
              pipelines.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-6 ${
                  tier.highlighted
                    ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                    : "border-surface-border bg-surface-raised"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-medium text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-sm text-gray-500">{tier.period}</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">{tier.pings}</p>
                <p className="text-sm text-gray-500">{tier.agents}</p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-gray-400"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/demo"
                  className={`mt-8 block w-full rounded-lg py-2.5 text-center text-sm font-medium transition ${
                    tier.highlighted
                      ? "bg-accent text-white hover:bg-accent-hover"
                      : "border border-surface-border text-gray-300 hover:border-accent/40 hover:text-white"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/20 via-surface-raised to-surface p-12 text-center">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight">
                Stop watching. Start building.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-400">
                Join AI workflow developers who replaced manual agent monitoring
                with smart digests and automatic anomaly detection.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 text-base font-semibold text-white transition hover:bg-accent-hover"
                >
                  Explore the demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/research"
                  className="text-sm text-gray-400 hover:text-accent-hover transition"
                >
                  Read how we found this idea →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
