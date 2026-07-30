# ⚡ Neuro-Sketch (CircuitAI)

**Design. Simulate. Learn.**

An AI-powered digital logic & analog circuit creator and simulator. Describe a circuit in plain English and watch it get built, wired, and simulated live in your browser — no installation, no schematic tool required.

🔗 **Live demo:** [neuro-sketch.vercel.app](https://neuro-sketch.vercel.app)

---

## ✨ Features

- **AI Circuit Generation** — Describe your circuit idea in natural language; Gemini AI translates it into a valid `digitaljs` circuit JSON (devices + connectors + subcircuits).
- **Interactive Simulation** — Real-time digital logic simulation powered by [DigitalJS](https://github.com/tilk/digitaljs), with clickable inputs (buttons, switches) and live outputs (lamps, 7-segment displays).
- **Waveform Visualization** — Inspect signal timing and behavior using Plotly and Recharts-based waveform panels.
- **3D Circuit Viewer** — Explore circuits in an interactive 3D scene built with Three.js and `@react-three/fiber` / `drei`.
- **Voice Input** — Experimental speech-to-text support for describing circuits by voice.
- **Full Adder Example** — A built-in reference circuit to explore how the simulator and JSON format work end to end.
- **Docs Page** — In-app documentation explaining the `digitaljs` circuit format and supported components.

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) + React 19 + TypeScript |
| Styling | Tailwind CSS 4, `tailwind-merge`, `tailwind-variants`, `class-variance-authority` |
| UI Components | Radix UI primitives, shadcn-style component library, Lucide icons |
| Animation | Framer Motion |
| Circuit Simulation | [DigitalJS](https://github.com/tilk/digitaljs) |
| AI | Google Gemini (`@google/generative-ai`) |
| 3D | Three.js, `@react-three/fiber`, `@react-three/drei` |
| Charts | Plotly.js (`react-plotly.js`), Recharts |
| Markdown | `react-markdown`, `remark-gfm`, `rehype-pretty-code` |

## 📁 Project Structure

```
neuro-sketch/
├── app/
│   ├── page.tsx              # Landing page
│   ├── ai-assistbot/         # AI chat interface for circuit generation
│   ├── api/generate-circuit/ # API route: prompt → digitaljs circuit JSON (Gemini)
│   ├── circuit-simulator/    # Circuit simulator page
│   ├── circuit-3d/           # 3D circuit view route
│   ├── three-viewer/         # Standalone 3D viewer
│   ├── full-adder/           # Full adder reference example
│   └── docs/                 # In-app documentation page
├── components/                # Shared React components (Navbar, Waveform panels, 3D view, etc.)
│   └── ui/                    # Reusable UI primitives (buttons, cards, dialogs, ...)
├── docs/
│   └── digitaljs-overview.md # Explanation of the digitaljs circuit JSON format & public/digital.js bundle
├── lib/                       # Utility functions
├── public/
│   ├── digital.js             # Bundled DigitalJS engine + dependencies
│   └── models/                # 3D assets
└── types/                     # Shared TypeScript types (e.g. speech recognition)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Google Gemini API key](https://ai.google.dev/)

### Installation

```bash
git clone https://github.com/Ferozhasnain1504/neuro-sketch.git
cd neuro-sketch
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## 🧠 How Circuit Generation Works

1. A user describes a circuit in natural language (e.g. *"Build a 2-bit full adder"*) via the AI Assist Bot.
2. The `/api/generate-circuit` route sends a structured prompt to Gemini, instructing it to return a `digitaljs`-compatible JSON object (`devices`, `connectors`, `subcircuits`).
3. The returned JSON is parsed and fed into `digitaljs`:
   ```js
   const circuit = new digitaljs.Circuit(circuitJson);
   circuit.displayOn(paperElement);
   circuit.start();
   ```
4. The circuit renders on an interactive canvas and simulates in real time — toggle inputs and watch outputs update instantly.

See [`docs/digitaljs-overview.md`](./docs/digitaljs-overview.md) for a deeper breakdown of the circuit JSON format and supported components (gates, adders, flip-flops, multiplexers, FSMs, and more).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or file an issue.

## 📄 License

No license has been specified yet for this repository. Consider adding one (e.g. MIT) if you intend for others to reuse this code.

---

<p align="center">Powered by <strong>DigitalJS</strong> & <strong>Gemini AI</strong></p>
