import Link from "next/link";
import { Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-raised">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-accent" />
              <span className="font-semibold">AgentWatch</span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Lightweight monitoring for long-running AI agent jobs. SDK-less
              integration, smart digests, anomaly detection.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300">Product</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/demo"
                  className="text-gray-500 transition hover:text-accent-hover"
                >
                  Live Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="text-gray-500 transition hover:text-accent-hover"
                >
                  Developer Docs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300">Research</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/research"
                  className="text-gray-500 transition hover:text-accent-hover"
                >
                  How we found this idea
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-surface-border pt-8 sm:flex-row">
          <p className="text-xs text-gray-600">
            © 2026 AgentWatch. Demo built by Idea Miner.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <Link href="/demo" className="hover:text-gray-400">
              Demo
            </Link>
            <Link href="/developers" className="hover:text-gray-400">
              Developers
            </Link>
            <Link href="/research" className="hover:text-gray-400">
              Research
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
