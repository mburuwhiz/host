"use client"

import React, { useState, useEffect } from "react"

export function PeekABooCharacter() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position relative to center of screen
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative w-24 h-24 mx-auto mb-8 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden border-2 border-primary/20">
      <div 
        className="flex gap-4 transition-transform duration-75"
        style={{
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 5}px)`
        }}
      >
        <div className="w-4 h-4 bg-primary rounded-full relative">
            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />
        </div>
        <div className="w-4 h-4 bg-primary rounded-full relative">
            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />
        </div>
      </div>
      <div 
        className="absolute bottom-4 w-6 h-1 bg-primary/40 rounded-full"
        style={{
          transform: `translateX(${mousePos.x * 5}px)`
        }}
      />
    </div>
  )
}