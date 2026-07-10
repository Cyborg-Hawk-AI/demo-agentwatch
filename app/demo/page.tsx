import type { Metadata } from "next";
import DemoDashboard from "@/components/demo/DemoDashboard";

export const metadata: Metadata = {
  title: "Live Demo — AgentWatch",
  description:
    "Interactive demo of AgentWatch: monitor AI agent jobs, view timelines, smart digests, anomaly detection, and dead-man's switch alerts.",
};

export default function DemoPage() {
  return <DemoDashboard />;
}
