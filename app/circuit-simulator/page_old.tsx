'use client'
import React, { useState } from 'react'
import CircuitIframe from '@/components/CircuitIframe'
import WaveformChart from '@/components/WaveformChart'
import { Button } from '@/components/ui/button'

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
    <main className="flex flex-col items-center p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-[#0B304A]">Circuit Simulator</h1>

      <div className="flex gap-4 mb-4">
        <Button
          variant={circuitType === 'digital' ? 'default' : 'outline'}
          onClick={() => setCircuitType('digital')}
        >
          Digital
        </Button>
        <Button
          variant={circuitType === 'analog' ? 'default' : 'outline'}
          onClick={() => setCircuitType('analog')}
        >
          Analog
        </Button>
      </div>

      <div className="border rounded-2xl shadow-md overflow-hidden">
        <CircuitIframe
          visible
          onWaveformMessage={(data) => {
            console.log('📡 Waveform data received:', data)
            setWaveformData(data)
          }}
        />
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={loadSample}>Load {circuitType} Sample</Button>
        <Button variant="outline" onClick={getWaveform}>Get Waveform</Button>
      </div>

      {waveformData && <WaveformChart data={waveformData} />}
    </main>
  )
}
