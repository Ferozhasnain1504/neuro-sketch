'use client'

import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '@/components/ui/button'

interface CircuitComponent {
  type: 'resistor' | 'capacitor' | 'led' | 'wire'
  position: [number, number, number]
  connection?: [number, number, number]
}

interface CircuitPreset {
  id: string
  name: string
  components: CircuitComponent[]
}

export default function Circuit3DView() {
  const [circuits, setCircuits] = useState<CircuitPreset[]>([])
  const [selectedCircuit, setSelectedCircuit] = useState<CircuitPreset | null>(null)

  // fetch JSON on load
  useEffect(() => {
    fetch('/data/circuits.json')
      .then((res) => res.json())
      .then((data) => {
        setCircuits(data)
        setSelectedCircuit(data[0])
      })
      .catch((err) => console.error('Error loading circuits:', err))
  }, [])

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-4">
        <select
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#0077B6]"
          value={selectedCircuit?.id || ''}
          onChange={(e) => {
            const found = circuits.find((c) => c.id === e.target.value)
            if (found) setSelectedCircuit(found)
          }}
        >
          {circuits.map((circuit) => (
            <option key={circuit.id} value={circuit.id}>
              {circuit.name}
            </option>
          ))}
        </select>

        <Button
          onClick={() => setSelectedCircuit(null)}
          variant="outline"
          className="border-[#0077B6] text-[#0077B6] hover:bg-[#E3F3FC]"
        >
          Clear Scene
        </Button>
      </div>

      <div className="w-full h-[600px] rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#F4FAFF] border border-gray-200 overflow-hidden">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[6, 4, 8]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.0} />
          <OrbitControls enablePan enableZoom enableRotate />
          <gridHelper args={[20, 20]} />

          {selectedCircuit?.components.map((comp, index) => {
            switch (comp.type) {
              case 'resistor':
                return (
                  <mesh key={index} position={comp.position}>
                    <boxGeometry args={[1, 0.3, 0.3]} />
                    <meshStandardMaterial color="#D97706" />
                  </mesh>
                )

              case 'capacitor':
                return (
                  <mesh key={index} position={comp.position}>
                    <cylinderGeometry args={[0.2, 0.2, 0.8, 16]} />
                    <meshStandardMaterial color="#2563EB" />
                  </mesh>
                )

              case 'led':
                return (
                  <mesh key={index} position={comp.position}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial
                      emissive="#F87171"
                      emissiveIntensity={1}
                      color="#F87171"
                    />
                  </mesh>
                )

              case 'wire':
                if (!comp.connection) return null
                const points = [
                  new THREE.Vector3(...comp.position),
                  new THREE.Vector3(...comp.connection),
                ]
                const wireGeometry = new THREE.BufferGeometry().setFromPoints(points)
                // Create a Three.js Line object and render it via a primitive to avoid JSX SVG typing issues
                const threeLine = new THREE.Line(
                  wireGeometry,
                  new THREE.LineBasicMaterial({ color: '#111', linewidth: 2 })
                )
                return <primitive key={index} object={threeLine} />

              default:
                return null
            }
          })}
        </Canvas>
      </div>
    </div>
  )
}
