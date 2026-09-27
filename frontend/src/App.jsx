import Results from "./Results";
import Processing from "./Processing";
import NewAnalysis from "./NewAnalysis";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  FolderOpen,
  Home,
  ListChecks,
  Menu,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  Subtitles,
  Upload,
  Video,
  X,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const stats = [
  {
    label: "Videos analyzed",
    value: "24",
    change: "+12.5%",
    icon: Video,
  },
  {
    label: "Hours processed",
    value: "186",
    change: "+8.2%",
    icon: Clock3,
  },
  {
    label: "Notes generated",
    value: "1,240",
    change: "+18.4%",
    icon: FileText,
  },
  {
    label: "Action items",
    value: "328",
    change: "+6.8%",
    icon: ListChecks,
  },
];

const agents = [
  {
    name: "Transcription Agent",
    role: "Speech → Text",
    status: "Complete",
    icon: Subtitles,
    progress: 100,
  },
  {
    name: "Notes Agent",
    role: "Knowledge Extraction",
    status: "Complete",
    icon: FileText,
    progress: 100,
  },
  {
    name: "Timestamp Agent",
    role: "Key Moments",
    status: "Processing",
    icon: Clock3,
    progress: 72,
  },
  {
    name: "Action Items Agent",
    role: "Task Detection",
    status: "Ready",
    icon: ListChecks,
    progress: 0,
  },
];

const recentAnalyses = [
  {
    title: "Introduction to Neural Networks",
    type: "Lecture",
    duration: "1h 42m",
    date: "Today, 10:24 AM",
    progress: 100,
  },
  {
    title: "AI Product Strategy Meeting",
    type: "Meeting",
    duration: "48m",
    date: "Yesterday, 4:12 PM",
    progress: 100,
  },
  {
    title: "Machine Learning Fundamentals",
    type: "Lecture",
    duration: "2h 18m",
    date: "Jul 22, 2026",
    progress: 100,
  },
];

function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [page, setPage] = useState("dashboard");

  if (page === "new-analysis") {
  return (
    <NewAnalysis
      onBack={() => setPage("dashboard")}
      onStart={() => setPage("processing")}
    />
  );
}

if (page === "processing") {
  return (
    <Processing
       onComplete={() => setPage("results")}
    />
  );
}

if (page === "results") {
  return <Results onBack={() => setPage("dashboard")} />;
}

  const navigation = [
    { name: "Dashboard", icon: Home },
    { name: "New Analysis", icon: Plus },
    { name: "My Analyses", icon: FolderOpen },
    { name: "Transcripts", icon: Subtitles },
    { name: "AI Notes", icon: FileText },
    { name: "Action Items", icon: ListChecks },
  ];

  return (
    <div className="min-h-screen bg-[#08090d] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-purple-600/5 blur-[140px]" />
      </div>

      <div className="relative flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } hidden shrink-0 border-r border-white/[0.07] bg-[#0b0c11]/80 px-4 py-5 backdrop-blur-2xl transition-all duration-300 lg:block`}
        >
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20">
              <Sparkles size={21} />
            </div>

            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-semibold tracking-tight">
                  Deep-Dive
                </h1>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  AI Intelligence
                </p>
              </div>
            )}
          </div>

          <div className="my-8 h-px bg-white/[0.06]" />

          {sidebarOpen && (
            <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              Workspace
            </p>
          )}

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setActiveNav(item.name)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all ${
                    isActive
                      ? "bg-white/[0.09] text-white shadow-inner shadow-white/[0.03]"
                      : "text-white/45 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-cyan-300" : ""}
                  />

                  {sidebarOpen && <span>{item.name}</span>}

                  {isActive && sidebarOpen && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-8">
            {sidebarOpen && (
              <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
                System
              </p>
            )}

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 transition hover:bg-white/[0.05] hover:text-white">
              <Settings size={18} />
              {sidebarOpen && <span>Settings</span>}
            </button>
          </div>

          <div className="absolute bottom-5 left-4 right-4">
            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                {sidebarOpen && (
                  <span className="text-xs text-emerald-300">
                    AI Agents Online
                  </span>
                )}
              </div>

              {sidebarOpen && (
                <p className="mt-2 text-[10px] text-white/35">
                  4 agents ready to collaborate
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {/* Top bar */}
          <header className="flex h-20 items-center justify-between border-b border-white/[0.06] px-6 lg:px-10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden rounded-lg p-2 text-white/50 transition hover:bg-white/[0.06] hover:text-white lg:block"
              >
                <Menu size={20} />
              </button>

              <div className="relative hidden md:block">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  placeholder="Search analyses..."
                  className="w-64 rounded-xl border border-white/[0.07] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-400/40"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 sm:flex">
                <Zap size={13} className="text-yellow-300" />
                <span className="text-xs text-white/55">AI Engine Active</span>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-violet-400 to-cyan-400 text-xs font-bold">
                ZK
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1600px] space-y-8 p-6 lg:p-10">
            {/* Hero */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 lg:p-12"
            >
              <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-violet-500/[0.08] to-transparent" />

              <div className="relative max-w-3xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1.5 text-xs text-violet-200">
                  <Sparkles size={13} />
                  Multi-Agent Video Intelligence
                </div>

                <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white lg:text-6xl">
                  Turn hours of video into{" "}
                  <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
                    structured intelligence.
                  </span>
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-7 text-white/45 lg:text-lg">
                  Your AI team watches, understands, summarizes, and extracts
                  insights from long-form content.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setPage("new-analysis")}
                    className="group flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                  >
                    <Plus size={17} />
                    Start New Analysis
                    <ArrowUpRight
                      size={16}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>

                  <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08] hover:text-white">
                    <Play size={16} />
                    Explore Demo
                  </button>
                </div>
              </div>
            </motion.section>

            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition hover:border-white/[0.14] hover:bg-white/[0.05]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/70">
                        <Icon size={19} />
                      </div>

                      <span className="text-xs text-emerald-300">
                        {stat.change}
                      </span>
                    </div>

                    <p className="mt-5 text-3xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-sm text-white/40">{stat.label}</p>
                  </motion.div>
                );
              })}
            </section>

            {/* Workflow + activity */}
            <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">AI Agent Workflow</h3>
                    <p className="mt-1 text-sm text-white/35">
                      Your intelligent team working together
                    </p>
                  </div>

                  <Activity size={20} className="text-cyan-300" />
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  {[
                    { label: "Video", icon: Video },
                    { label: "Transcribe", icon: Subtitles },
                    { label: "Analyze", icon: Sparkles },
                    { label: "Review", icon: CheckCircle2 },
                  ].map((item, index, arr) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label} className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ y: -3 }}
                          className="flex min-w-[105px] flex-col items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-4"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/10 text-cyan-200">
                            <Icon size={19} />
                          </div>
                          <span className="text-xs text-white/60">
                            {item.label}
                          </span>
                        </motion.div>

                        {index < arr.length - 1 && (
                          <ChevronRight
                            size={18}
                            className="text-white/20"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Agent Activity</h3>
                    <p className="mt-1 text-sm text-white/35">
                      Real-time intelligence pipeline
                    </p>
                  </div>

                  <span className="flex items-center gap-2 text-xs text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {agents.map((agent) => {
                    const Icon = agent.icon;

                    return (
                      <div key={agent.name} className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-white/60">
                          <Icon size={16} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm text-white/80">
                                {agent.name}
                              </p>
                              <p className="text-[11px] text-white/30">
                                {agent.role}
                              </p>
                            </div>

                            <span
                              className={`text-[10px] ${
                                agent.status === "Complete"
                                  ? "text-emerald-300"
                                  : agent.status === "Processing"
                                    ? "text-yellow-300"
                                    : "text-white/30"
                              }`}
                            >
                              {agent.status}
                            </span>
                          </div>

                          {agent.progress > 0 && agent.progress < 100 && (
                            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${agent.progress}%` }}
                                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Recent analyses */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Recent Analyses</h3>
                  <p className="mt-1 text-sm text-white/35">
                    Your latest video intelligence
                  </p>
                </div>

                <button className="text-sm text-white/45 transition hover:text-white">
                  View all →
                </button>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {recentAnalyses.map((analysis, index) => (
                  <motion.div
                    key={analysis.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.05]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/10 text-violet-200">
                        <Video size={20} />
                      </div>

                      <button className="rounded-lg p-2 text-white/30 transition hover:bg-white/[0.08] hover:text-white">
                        <ArrowUpRight size={17} />
                      </button>
                    </div>

                    <h4 className="mt-5 font-medium text-white/85">
                      {analysis.title}
                    </h4>

                    <div className="mt-3 flex items-center gap-3 text-xs text-white/35">
                      <span>{analysis.type}</span>
                      <span>•</span>
                      <span>{analysis.duration}</span>
                    </div>

                    <div className="mt-5 flex items-center justify-between text-[11px] text-white/30">
                      <span>{analysis.date}</span>
                      <span className="flex items-center gap-1 text-emerald-300">
                        <CheckCircle2 size={13} />
                        Complete
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;