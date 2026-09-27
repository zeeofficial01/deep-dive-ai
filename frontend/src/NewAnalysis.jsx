import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  FileVideo,
  Link2,
  Play,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { useState } from "react";

function NewAnalysis({ onBack, onStart }) {

    const handleStartAnalysis = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        youtube_url: "https://www.youtube.com/watch?v=example",
      }),
    });

    const data = await response.json();

    console.log("Backend response:", data);

    onStart();
  } catch (error) {
    console.error("Error connecting to backend:", error);
  }
};

  const [inputType, setInputType] = useState("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[150px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 py-8 lg:px-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1.5 text-xs text-violet-200">
            <Sparkles size={13} />
            AI Video Intelligence
          </div>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-14 text-center"
        >
          <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
            Start a new{" "}
            <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
              analysis
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/40">
            Give your AI team a video. They will watch, understand, and turn
            it into structured intelligence.
          </p>
        </motion.div>

        {/* Input selection */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="grid grid-cols-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1.5">
            <button
              onClick={() => setInputType("youtube")}
              className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm transition ${
                inputType === "youtube"
                  ? "bg-white text-black"
                  : "text-white/45 hover:text-white"
              }`}
            >
              <Play size={17} />
              YouTube URL
            </button>

            <button
              onClick={() => setInputType("upload")}
              className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm transition ${
                inputType === "upload"
                  ? "bg-white text-black"
                  : "text-white/45 hover:text-white"
              }`}
            >
              <UploadCloud size={17} />
              Upload Video
            </button>
          </div>

          {/* Input card */}
          <motion.div
            key={inputType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 lg:p-8"
          >
            {inputType === "youtube" ? (
              <>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-300">
                    <Play size={21} />
                  </div>

                  <div>
                    <h2 className="font-medium">Analyze a YouTube video</h2>
                    <p className="mt-1 text-xs text-white/35">
                      Paste a public YouTube video URL
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <Link2
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    value={youtubeUrl}
                    onChange={(event) => setYoutubeUrl(event.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full rounded-2xl border border-white/[0.08] bg-black/20 py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-400/50"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <FileVideo size={21} />
                  </div>

                  <div>
                    <h2 className="font-medium">Upload your video</h2>
                    <p className="mt-1 text-xs text-white/35">
                      MP4, MOV, AVI, MKV and other common formats
                    </p>
                  </div>
                </div>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 px-6 py-14 text-center transition hover:border-violet-400/50 hover:bg-violet-400/[0.03]">
                  <UploadCloud size={32} className="text-white/40" />

                  <p className="mt-4 text-sm text-white/70">
                    {fileName || "Drop your video here or click to browse"}
                  </p>

                  <p className="mt-2 text-xs text-white/30">
                    Maximum file size: 2GB
                  </p>

                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </motion.div>

          {/* Analysis options */}
          <div className="mt-6 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium">Analysis pipeline</h2>
                <p className="mt-1 text-sm text-white/35">
                  Your AI agents will collaborate on this video
                </p>
              </div>

              <Sparkles size={20} className="text-violet-300" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Transcription",
                "Structured Notes",
                "Key Timestamps",
                "Action Items",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <Check size={13} />
                  </div>

                  <span className="text-sm text-white/65">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Start button */}
          <button
            onClick={handleStartAnalysis}
            className="group mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-white py-4 text-sm font-semibold text-black transition hover:bg-white/90"
        >
            <Play size={18} />
            Start AI Analysis
            <Sparkles
              size={16}
              className="transition group-hover:rotate-12"
            />
          </button>

          <p className="mt-4 text-center text-xs text-white/25">
            Your video will be processed by the Deep-Dive multi-agent
            intelligence system.
          </p>
        </div>
      </main>
    </div>
  );
}

export default NewAnalysis;