'use client'
import React, { useState } from 'react'
import CircuitIframe from '@/components/CircuitIframe'
import WaveformChart from '@/components/WaveformChart'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CircuitSimulatorPage() {
  const [waveformData, setWaveformData] = useState<any>(null)
  const [circuitType, setCircuitType] = useState<'digital' | 'analog'>('digital')

  const loadSample = () => { /* your code */ }
  const getWaveform = () => { /* your code */ }

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

      {/* <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Button onClick={loadSample}>Load {circuitType} Sample</Button>
        <Button variant="outline" onClick={getWaveform}>Get Waveform</Button>
        <Link href="/3d-viewer">
          <Button variant="secondary" className="bg-[#0077B6] text-white hover:bg-[#005F8C]">
            Open 3D Viewer
          </Button>
        </Link>
      </div> */}

      <Link href="/three-viewer">
        <Button variant="secondary" className="bg-[#0077B6] text-white hover:bg-[#005F8C]">
            Open 3D Viewer
        </Button>
      </Link>


      {waveformData && <WaveformChart data={waveformData} />}
    </main>
  )
}
