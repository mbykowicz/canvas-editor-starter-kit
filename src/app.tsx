import { useEffect, useRef } from 'react'
import Canvas from './components/editor/Canvas'

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  function draw(ctx: CanvasRenderingContext2D) {
    ctx.save()

    ctx.fillStyle = 'red'
    ctx.fillRect(100, 100, 100, 100)

    ctx.restore()
  }

  useEffect(() => {
    if (!containerRef.current) return
  }, [])

  return (
    <div className='h-screen p-8 bg-gray-100'>
      <div
        ref={containerRef}
        className='w-full h-full bg-white border border-gray-300 rounded-md shadow'
      >
        <Canvas onDraw={draw} containerRef={containerRef} />
      </div>
    </div>
  )
}
