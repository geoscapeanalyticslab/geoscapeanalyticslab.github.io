import { useEffect, useRef, useState, useCallback } from 'react'
import Globe from 'react-globe.gl'
import * as THREE from 'three'

const GSAL_LAT = 31.4941
const GSAL_LNG = 74.2987

/* Destination hubs — GSAL connects GIS research globally */
const HUBS = [
  { lat: 38.9954,  lng: -76.8503, label: 'NASA GSFC'  },
  { lat: 41.8027,  lng:  12.6700, label: 'ESA'         },
  { lat: 35.6762,  lng: 139.6503, label: 'JAXA'        },
  { lat: 37.4220,  lng: -122.084, label: 'GEE HQ'      },
  { lat: 12.9716,  lng:  77.5946, label: 'ISRO'        },
  { lat: 47.3769,  lng:   8.5417, label: 'ETH Zurich'  },
  { lat: 51.5074,  lng:  -0.1278, label: 'RSPSoc'      },
  { lat: -1.2921,  lng:  36.8219, label: 'Nairobi'     },
]

const ARCS = HUBS.map(h => ({
  from: [GSAL_LAT, GSAL_LNG],
  to:   [h.lat,    h.lng],
}))

export default function GlobeHero() {
  const globeEl   = useRef(null)
  const wrapperEl = useRef(null)
  const [size, setSize]   = useState({ w: 900, h: 700 })
  const [ready, setReady] = useState(false)

  /* Resize */
  useEffect(() => {
    const update = () => {
      if (wrapperEl.current)
        setSize({ w: wrapperEl.current.offsetWidth, h: wrapperEl.current.offsetHeight })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  /* Inject pin keyframes once */
  useEffect(() => {
    if (document.getElementById('gsal-pin-css')) return
    const s = document.createElement('style')
    s.id = 'gsal-pin-css'
    s.textContent = `
      @keyframes gsalPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.7);opacity:0.4}}
      @keyframes gsalRing{0%{transform:scale(1);opacity:0.9}100%{transform:scale(3.2);opacity:0}}
      @keyframes gsalGlow{0%,100%{opacity:1;text-shadow:0 0 8px rgba(231,111,81,0.9),0 0 18px rgba(231,111,81,0.5)}50%{opacity:0.85;text-shadow:0 0 14px rgba(231,111,81,1),0 0 32px rgba(231,111,81,0.8),0 0 50px rgba(231,111,81,0.3)}}
    `
    document.head.appendChild(s)
    return () => document.getElementById('gsal-pin-css')?.remove()
  }, [])

  /* Globe ready: set view, lighting, auto-rotate */
  const onReady = useCallback(() => {
    setReady(true)
    const g = globeEl.current

    /* Initial camera — Pakistan visible, no animation */
    g.pointOfView({ lat: 22, lng: 72, altitude: 1.9 }, 0)

    /* Auto-rotate */
    const ctrl = g.controls()
    ctrl.autoRotate      = true
    ctrl.autoRotateSpeed = 0.45
    ctrl.enableZoom      = false
    ctrl.enablePan       = false

    /* Extra scene lighting for depth/shadow effect */
    const scene = g.scene()
    const key = new THREE.DirectionalLight(0x6ae4ff, 0.7)
    key.position.set(5, 3, 5)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0x3366aa, 0.25)
    fill.position.set(-4, -2, -3)
    scene.add(fill)
  }, [])

  /* GSAL pin HTML factory */
  const gsalPin = useCallback(() => {
    const el = document.createElement('div')
    el.style.cssText =
      'pointer-events:none;display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);'
    el.innerHTML = `
      <div style="
        font:900 12px/1 Inter,sans-serif;
        color:#e76f51;letter-spacing:0.24em;text-transform:uppercase;
        text-shadow:0 0 8px rgba(231,111,81,0.9);
        animation:gsalGlow 2.2s ease-in-out infinite;
        white-space:nowrap;margin-bottom:4px;">
        GSAL
      </div>
      <div style="width:1px;height:10px;background:linear-gradient(to bottom,#e76f51,transparent);"></div>
      <div style="position:relative;width:12px;height:12px;">
        <div style="position:absolute;inset:0;border-radius:50%;border:1.5px solid #e76f51;
          animation:gsalRing 2s ease-out infinite;"></div>
        <div style="position:absolute;inset:2.5px;border-radius:50%;background:#e76f51;
          animation:gsalPulse 2s ease-in-out infinite;
          box-shadow:0 0 10px #e76f51;"></div>
      </div>`
    return el
  }, [])

  return (
    <div ref={wrapperEl} className="absolute inset-0 overflow-hidden">
      <Globe
        ref={globeEl}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"

        /* NASA night-lights texture */
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

        atmosphereColor="#2a9d8f"
        atmosphereAltitude={0.22}

        onGlobeReady={onReady}
        enablePointerInteraction

        /* ── Arc lines: GSAL → global GIS hubs ── */
        arcsData={ARCS}
        arcStartLat={d => d.from[0]}
        arcStartLng={d => d.from[1]}
        arcEndLat={d => d.to[0]}
        arcEndLng={d => d.to[1]}
        arcColor={() => ['rgba(42,157,143,0)', 'rgba(42,157,143,0.95)', 'rgba(42,157,143,0)']}
        arcDashLength={0.32}
        arcDashGap={0.18}
        arcDashInitialGap={() => Math.random() * 2.5}
        arcDashAnimateTime={2600}
        arcStroke={0.6}
        arcAltitudeAutoScale={0.38}

        /* ── Destination city dots ── */
        pointsData={HUBS}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => 'rgba(231,111,81,0.9)'}
        pointAltitude={0.01}
        pointRadius={0.2}

        /* ── GSAL pin HTML element ── */
        htmlElementsData={ready ? [{ lat: GSAL_LAT, lng: GSAL_LNG }] : []}
        htmlElement={gsalPin}
      />
    </div>
  )
}
