"use client"

import { useEffect, useRef } from "react"

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scene: any, camera: any, renderer: any, particles: any
    let animationId: number

    const initThree = async () => {
      if (typeof window === "undefined") return

      const THREE = await import("three")

      // Scene setup
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement)
      }

      // Create particle system
      const particleCount = 1000
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100
        positions[i + 1] = (Math.random() - 0.5) * 100
        positions[i + 2] = (Math.random() - 0.5) * 100

        const colorChoice = Math.random()
        if (colorChoice < 0.33) {
          colors[i] = 0 // R
          colors[i + 1] = 1 // G (cyan)
          colors[i + 2] = 1 // B
        } else if (colorChoice < 0.66) {
          colors[i] = 0.5 // R (purple)
          colors[i + 1] = 0 // G
          colors[i + 2] = 1 // B
        } else {
          colors[i] = 1 // R (pink)
          colors[i + 1] = 0 // G
          colors[i + 2] = 0.5 // B
        }
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      })

      particles = new THREE.Points(geometry, material)
      scene.add(particles)

      // Create floating cubes
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.1,
        wireframe: true,
      })

      for (let i = 0; i < 20; i++) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50)
        cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
        scene.add(cube)
      }

      camera.position.z = 30

      // Animation loop
      const animate = () => {
        animationId = requestAnimationFrame(animate)

        if (particles) {
          particles.rotation.x += 0.001
          particles.rotation.y += 0.002
        }

        scene.children.forEach((child: any) => {
          if (child.geometry && child.geometry.type === "BoxGeometry") {
            child.rotation.x += 0.01
            child.rotation.y += 0.01
            child.position.y += Math.sin(Date.now() * 0.001 + child.position.x) * 0.02
          }
        })

        renderer.render(scene, camera)
      }

      animate()

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        if (animationId) {
          cancelAnimationFrame(animationId)
        }
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement)
        }
        renderer.dispose()
      }
    }

    initThree()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)" }}
    />
  )
}
