"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CircuitBoard, Code, FlaskConical, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import CircuitIframe from "@/components/CircuitIframe";

export default function Home() {
  const [isSimOpen, setIsSimOpen] = useState(false);

  // Launch AI Builder
  const handleLaunchAI = () => {
    window.location.href = "/ai-assistbot";
  };

  // Load Full Adder Example
  const handleLoadFullAdder = () => {
    window.location.href = "/full-adder";
  };

  // Try It Now button
  const handleTryNow = () => {
    window.location.href = "/ai-assistbot";
  };

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#EAF3FB] via-[#F8FBFD] to-white text-[#0B304A]">
      <Navbar />

      {/* 🌟 Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C0E3FF] via-transparent to-transparent opacity-50 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex justify-center mb-8">
            <Image src="/logo.png" alt="CircuitAI Logo" width={160} height={160} className="drop-shadow-lg" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Design. Simulate. <span className="text-[#0077B6]">Learn.</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            The AI-powered logic & analog circuit simulator that helps you build, visualize, and analyze circuits like a pro.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={handleLaunchAI}
              size="lg"
              className="bg-[#0077B6] hover:bg-[#005F8C] text-white text-lg px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <Sparkles className="h-5 w-5" /> Launch AI Builder
            </Button>

            <Button
              onClick={handleLoadFullAdder}
              size="lg"
              variant="outline"
              className="border-[#0077B6] text-[#0077B6] hover:bg-[#E3F3FC] text-lg px-8 py-4 rounded-xl transition-transform hover:scale-105"
            >
              Full Adder Example
            </Button>

            {/* ⚙️ Open Full Simulator Page */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#0077B6] text-[#0077B6] hover:bg-[#E3F3FC] text-lg px-8 py-4 rounded-xl transition-transform hover:scale-105"
            >
              <Link href="/circuit-simulator">Open Circuit Simulator</Link>
            </Button>

            {/* 🧩 New Open Simulator Button */}
            <Button
              onClick={() => setIsSimOpen(true)}
              size="lg"
              variant="outline"
              className="border-[#0077B6] text-[#0077B6] hover:bg-[#E3F3FC] text-lg px-8 py-4 rounded-xl transition-transform hover:scale-105"
            >
              Open Simulator
            </Button>

            

            <Link href="/three-viewer">
              <Button
              size="lg"
              variant="outline"
              className="border-[#0077B6] text-[#0077B6] hover:bg-[#E3F3FC] text-lg px-8 py-4 rounded-xl transition-transform hover:scale-105"
              >
                Open 3D Viewer
              </Button>
            </Link>

          </div>
        </motion.div>
      </section>

      {/* ⚙️ Features Section */}
      <section className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <CircuitBoard className="h-10 w-10 text-[#0077B6]" />,
            title: "Interactive Visualization",
            desc: "Experience real-time logic and analog circuit simulations with dynamic waveform rendering.",
          },
          {
            icon: <Code className="h-10 w-10 text-[#0077B6]" />,
            title: "AI Circuit Generation",
            desc: "Describe your circuit idea in plain English — the AI builds and simulates it instantly.",
          },
          {
            icon: <FlaskConical className="h-10 w-10 text-[#0077B6]" />,
            title: "Simulate & Analyze",
            desc: "Run digital and analog tests, visualize voltages and currents, and understand timing behaviors.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-[#0077B610] transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-col items-center text-center space-y-3">
                {feature.icon}
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                <CardDescription className="text-gray-500">{feature.desc}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* 💡 Call to Action Section */}
      <section className="bg-[#0077B6] text-white text-center py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Building Circuits with AI Today ⚡
        </h2>
        <p className="max-w-xl mx-auto text-lg text-[#E0F5FF] mb-10">
          No installation. No complexity. Just creativity and simulation in your browser.
        </p>
        <Button
          onClick={handleTryNow}
          size="lg"
          className="bg-white text-[#0077B6] hover:bg-[#E0F5FF] text-lg font-medium px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
        >
          Try It Now <ArrowRight className="h-5 w-5" />
        </Button>
      </section>

      {/* 🌐 Footer */}
      <footer className="backdrop-blur-md border-t border-gray-200 py-6 text-center text-gray-600">
        <p>
          Powered by <span className="text-[#0077B6] font-semibold">DigitalJS</span> &{" "}
          <span className="font-semibold">Gemini AI</span>
        </p>
        <p className="text-sm mt-2">© {new Date().getFullYear()} Neuro-Sketch. All rights reserved.</p>
      </footer>

      {/* 🧩 Simulator Modal */}
      {isSimOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSimOpen(false)}
          />
          {/* Modal */}
          <div className="relative z-10 w-[95%] md:w-4/5 lg:w-3/4 h-[80vh] bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-2 font-semibold text-[#0B304A]">
                ⚡ Circuit Simulator
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsSimOpen(false)}>
                Close
              </Button>
            </div>
            <div className="w-full h-full">
              <CircuitIframe visible />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
