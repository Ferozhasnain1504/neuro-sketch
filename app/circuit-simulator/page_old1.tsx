'use client'

import React, { useState } from 'react'
import CircuitIframe from '@/components/CircuitIframe'
import WaveformChart from '@/components/WaveformChart'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function CircuitSimulatorPage() {
  const [waveformData, setWaveformData] = useState<any>(null)
  const [circuitType, setCircuitType] = useState<'digital' | 'analog'>('digital')

  const loadSample = () => {
    if (circuitType === 'digital') {
      ;(window as any).__postCircuitToIframe?.(
        `v 328 176 352 176 0 0 40 5 0 0 0.5
S 352 176 400 176 0 1 false
r 400 176 480 176 0 100
w 480 176 480 256 0
g 480 256 480 304 0`
      )
    } else {
      ;(window as any).__postCircuitToIframe?.(
        `R 100 100 200 100 0 100
C 200 100 200 200 0 0.000001
w 100 200 200 200 0
v 100 200 100 100 0 5 0 0 0 0`
      )
    }
  }

  const getWaveform = () => {
    window.postMessage({ type: 'get-waveform-data' }, '*')
  }

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#F8FBFD] via-white to-[#EAF3FB] text-[#0B304A]">
      <Navbar />

      {/* Header Section */}
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#0077B6] hover:text-[#005F8C] transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-2xl font-semibold text-[#0B304A]">Circuit Simulator</h1>
      </div>

      {/* Simulator Controls */}
      <div className="flex flex-col items-center mt-4">
        <div className="flex gap-4 mb-6">
          <Button
            variant={circuitType === 'digital' ? 'default' : 'outline'}
            onClick={() => setCircuitType('digital')}
            className={`px-6 py-2 rounded-xl ${
              circuitType === 'digital'
                ? 'bg-[#0077B6] text-white hover:bg-[#005F8C]'
                : 'border-[#0077B6] text-[#0077B6] hover:bg-[#E3F3FC]'
            }`}
          >
            Digital
          </Button>
          <Button
            variant={circuitType === 'analog' ? 'default' : 'outline'}
            onClick={() => setCircuitType('analog')}
            className={`px-6 py-2 rounded-xl ${
              circuitType === 'analog'
                ? 'bg-[#0077B6] text-white hover:bg-[#005F8C]'
                : 'border-[#0077B6] text-[#0077B6] hover:bg-[#E3F3FC]'
            }`}
          >
            Analog
          </Button>
        </div>

        {/* Circuit Display */}
        <div className="w-full max-w-6xl bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 mb-8">
          <CircuitIframe
            visible
            onWaveformMessage={(data) => {
              console.log('📡 Waveform data received:', data)
              setWaveformData(data)
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-10">
          <Button
            onClick={loadSample}
            className="bg-[#0077B6] hover:bg-[#005F8C] text-white px-6 py-3 rounded-xl shadow-md transition-transform hover:scale-105"
          >
            Load {circuitType === 'digital' ? 'Digital' : 'Analog'} Sample
          </Button>
          <Button
            variant="outline"
            onClick={getWaveform}
            className="border-[#0077B6] text-[#0077B6] hover:bg-[#E3F3FC] px-6 py-3 rounded-xl transition-transform hover:scale-105"
          >
            Get Waveform
          </Button>
        </div>

        {/* Waveform Output */}
        {waveformData && (
          <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-[#0B304A]">
              Waveform Output
            </h2>
            <WaveformChart data={waveformData} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-gray-200 bg-white/50 backdrop-blur-sm text-center text-gray-600">
        <p>
          Powered by <span className="text-[#0077B6] font-semibold">DigitalJS</span> &{" "}
          <span className="font-semibold">Gemini AI</span>
        </p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} Neuro-Sketch. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
