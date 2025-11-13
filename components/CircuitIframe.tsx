// components/CircuitIframe.tsx
'use client'
import React, { useEffect, useRef } from 'react'

export default function CircuitIframe({ visible = false, onWaveformMessage }: { visible?: boolean; onWaveformMessage?: (data: any) => void }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // incoming messages from the iframe (if the iframe is modified to post messages)
      try {
        const data = event.data
        if (!data) return
        // adjust this filter if you host a modified CircuitJS which posts waveform messages
        if (data.type === 'circuit-waveform') {
          onWaveformMessage?.(data.payload)
        }
      } catch (err) {
        // ignore
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [onWaveformMessage])

  // function to post a circuit string to the iframe
  const postCircuit = (text: string) => {
    const win = iframeRef.current?.contentWindow
    if (!win) return
    // Many Falstad/CircuitJS embeds accept `postMessage({command: 'load', data: text})` or URL params.
    // This is a best-effort — if the hosted page doesn't accept it you'll need to host a local copy of CircuitJS.
    try {
      win.postMessage({ type: 'load-circuit-text', circuit: text }, '*')
    } catch (err) {
      // ignore
    }
  }

  // Expose it to window for quick manual testing (optional)
  useEffect(() => {
    (window as any).__postCircuitToIframe = postCircuit
  }, [])

  return (
    <div style={{ display: visible ? 'block' : 'none' }}>
      <iframe
        ref={iframeRef}
        src="https://falstad.com/circuit/circuitjs.html"
        title="CircuitJS"
        style={{ width: 900, height: 600, border: 0 }}
        // style={{ width: '100%', height: '100vh' }}
      />

      <div className="mt-2">
      <button
        className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
        onClick={() =>
          iframeRef.current?.contentWindow?.postMessage({ type: 'get-waveform-data' }, '*')
        }
      >
        Get Waveforms
      </button>
    </div>

    </div>
  )
}
