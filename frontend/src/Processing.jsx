import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  Sparkles,
  Subtitles,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";

function Processing({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [activeAgent, setActiveAgent] = useState(0);

  const agents = [
    {
      name: "Video Intelligence Agent",
      description: "Analyzing video source",
      icon: Video,
    },
    {
      name: "Transcription Agent",
      description: "Converting speech into text",
      icon: Subtitles,
    },
    {
      name: "Notes Agent",
      description: "Extracting structured knowledge",
      icon: FileText,
    },
    {
      name: "Timestamp Agent",
      description: "Finding important moments",
      icon: Clock3,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((previous) => {
        const next = previous + 1;

        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }

        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent((previous) => {
        if (previous < agents.length - 1) {
          return previous + 1;
        }

        return previous;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [progress, onComplete]);

  return (
    <div className="min-h-screen bg-[#08090d] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[160px]" />
        <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[160px]" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20">
            <Sparkles size={28} />
          </div>

          <h1 className="mt-8 text-4xl font-semibold tracking-tight">
            Your AI team is working
          </h1>

          <p className="mt-3 text-white/40">
            Deep-Dive is transforming your video into structured intelligence.
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-12 w-full max-w-3xl rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 lg:p-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/50">Overall progress</p>
              <p className="mt-2 text-4xl font-semibold">{progress}%</p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/20 bg-violet-400/10">
              <Loader2
                size={25}
                className="animate-spin text-violet-300"
              />
            </div>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-400 to-cyan-300"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <p className="mt-3 text-xs text-white/30">
            Processing your video through multiple specialized AI agents
          </p>
        </motion.div>

        {/* Agents */}
        <div className="mt-8 grid w-full max-w-3xl gap-3">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const isComplete = index < activeAgent;
            const isActive = index === activeAgent;

            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.12 }}
                className={`flex items-center gap-4 rounded-2xl border p-4 transition ${
                  isActive
                    ? "border-violet-400/30 bg-violet-400/[0.08]"
                    : "border-white/[0.07] bg-white/[0.03]"
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    isComplete
                      ? "bg-emerald-400/10 text-emerald-300"
                      : isActive
                        ? "bg-violet-400/15 text-violet-300"
                        : "bg-white/[0.06] text-white/35"
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 size={20} />
                  ) : isActive ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Icon size={20} />
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-white/80">
                    {agent.name}
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    {isComplete
                      ? "Completed successfully"
                      : isActive
                        ? agent.description
                        : "Waiting for previous agent"}
                  </p>
                </div>

                <div className="text-xs">
                  {isComplete ? (
                    <span className="text-emerald-300">Complete</span>
                  ) : isActive ? (
                    <span className="text-violet-300">Working...</span>
                  ) : (
                    <span className="text-white/25">Queued</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-white/25">
          Please keep this window open while your analysis is running.
        </p>
      </main>
    </div>
  );
}

export default Processing;