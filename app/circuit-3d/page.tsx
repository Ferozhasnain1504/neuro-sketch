"use client"
import React, { useEffect, useState } from "react"

export default function CircuitLibrary3D() {
  const [circuits, setCircuits] = useState([])
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    fetch("/data/circuits.json")
      .then(res => res.json())
      .then(setCircuits)
  }, [])

  const handleSelectCircuit = (circuit: any) => {
    setSelected(circuit)
    console.log("🧩 Selected circuit:", circuit)
    // TODO: trigger your 3D rendering logic here
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F8FBFD] to-white p-6 text-[#0B304A]">
      <h1 className="text-3xl font-bold mb-6 text-center">🧠 Circuit Library (3D View)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {circuits.map((circuit) => (
          <div
            key={circuit.id}
            onClick={() => handleSelectCircuit(circuit)}
            className="border rounded-xl p-4 shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-xl font-semibold">{circuit.name}</h2>
            <p className="text-gray-600">{circuit.description}</p>
            <p className="text-sm mt-2 text-blue-600">{circuit.type.toUpperCase()}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
          <p className="text-gray-600 mb-4">{selected.description}</p>
          <div className="border rounded-lg p-4 bg-white shadow-md">
            🧱 3D visualization coming soon for: {selected.name}
          </div>
        </div>
      )}
    </main>
  )
}
