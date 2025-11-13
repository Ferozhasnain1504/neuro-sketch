// components/WaveformPanel.tsx
'use client'
import React from 'react'
import dynamic from 'next/dynamic'

// react-plotly is SSR-unfriendly; load dynamically
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

type Trace = {
  name: string
  x: number[]   // time
  y: (number | 0 | 1)[] // values (analog voltage or digital 0/1)
  mode?: string
}

export default function WaveformPanel({
  traces = [],
  height = 240,
}: {
  traces?: Trace[]
  height?: number
}) {
  return (
    <div className="w-full border-t p-2 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">Waveforms</div>
        <div className="text-sm text-slate-500">Time base: auto</div>
      </div>

      <div style={{ width: '100%', height }}>
        <Plot
          data={traces.map(t => ({
            x: t.x,
            y: t.y,
            name: t.name,
            mode: t.mode || 'lines',
            hoverinfo: 'x+y+name'
          }))}
          layout={{
            margin: { t: 10, b: 30, l: 40, r: 10 },
            showlegend: true,
            xaxis: { title: 'Time (s)' },
            yaxis: { title: 'Voltage / Logic', autorange: true }
          }}
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
