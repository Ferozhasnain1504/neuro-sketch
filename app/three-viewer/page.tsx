'use client'

import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath)
  return <primitive object={scene} scale={1.2} />
}

export default function ThreeViewerPage() {
  const [selectedModel, setSelectedModel] = useState('/models/transistor.glb')

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EAF3FB] via-[#F8FBFD] to-white flex flex-col items-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-[#0B304A] mb-6"
      >
        3D Circuit Viewer
      </motion.h1>

      {/* Dropdown for model selection */}
      <div className="flex items-center gap-3 mb-6">
        <Select
          onValueChange={(val) => setSelectedModel(val)}
        //   defaultValue="/models/full_adder.glb"
        >
          <SelectTrigger className="w-64 bg-white border border-gray-200 shadow-sm">
            <SelectValue placeholder="Select Circuit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="/models/circuit.glb">MotherBoard</SelectItem>
            <SelectItem value="/models/processor.glb">Processor</SelectItem>
            <SelectItem value="/models/mac_studio.glb">Mac Studio</SelectItem>
            <SelectItem value="/models/ic.glb">Integrated Circuit</SelectItem>
            <SelectItem value="/models/magnetic_field_of_solenoid.glb">Magnetic field</SelectItem>
            <SelectItem value="/models/esp32.glb">ESP32</SelectItem>
            <SelectItem value="/models/camera_shield_esp32.glb">Camera Shield ESP32</SelectItem>
            <SelectItem value="/models/raspberry_pi_zero.glb">Raspberry Pi Zero</SelectItem>
            <SelectItem value="/models/bluetooth_module.glb">Bluetooth Module</SelectItem>
            <SelectItem value="/models/radio_controller.glb">Radio Controller</SelectItem>
            <SelectItem value="/models/line_follower.glb">Line Follower</SelectItem>
            <SelectItem value="/models/basic_circuit.glb">Sample circuit 1</SelectItem>
            <SelectItem value="/models/sample_circuit_1.glb">Sample circuit 2</SelectItem>
            <SelectItem value="/models/sample_circuit_2.glb">Sample circuit 3</SelectItem>
            <SelectItem value="/models/sample_circuit_3.glb">Sample circuit 4</SelectItem>
          </SelectContent>
        </Select>

        <Link href="/circuit-simulator">
          <Button variant="outline" className="border-[#0077B6] text-[#0077B6] hover:bg-[#E3F3FC] text-lg px-8 py-4 rounded-xl transition-transform hover:scale-105">
            Back to Simulator
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="border-[#0077B6] text-[#0077B6] hover:bg-[#E3F3FC] text-lg px-8 py-4 rounded-xl transition-transform hover:scale-105">
            Home
          </Button>
        </Link>
      </div>

      {/* 3D Canvas */}
      <div className="w-full max-w-5xl h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <Canvas camera={{ position: [3, 3, 3], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <Model modelPath={selectedModel} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enableZoom enablePan />
        </Canvas>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mt-6"
      >
        Rotate, zoom, and explore each circuit in 3D.
      </motion.p>
    </main>
  )
}
