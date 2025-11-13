'use client'
import React from 'react'
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

export default function WaveformChart({ data }: { data: any }) {
  if (!data || !data.traces) return null

  const firstTrace = data.traces[0]
  const chartData = firstTrace.x.map((x: number, i: number) => {
    const entry: any = { time: x }
    data.traces.forEach((trace: any) => {
      entry[trace.name] = trace.y[i]
    })
    return entry
  })

  return (
    <div className="w-full h-96 mt-8 bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2 text-[#0B304A]">Waveform Viewer</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" label={{ value: 'Time', position: 'insideBottomRight', offset: 0 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {data.traces.map((trace: any) => (
            <Line
              key={trace.name}
              type="monotone"
              dataKey={trace.name}
              stroke="#0B304A"
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
