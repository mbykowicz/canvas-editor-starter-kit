import { useEffect, useRef } from 'react'

interface Props extends React.ComponentProps<'canvas'> {
  draw: (ctx: CanvasRenderingContext2D) => void
}

export default function useCanvas({ draw }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    let animationFrameId: number

    function resize(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      const { width, height } = canvas.getBoundingClientRect()

      if (canvas.width !== width || canvas.height !== height) {
        const dpr = window.devicePixelRatio || 1
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
      }
    }

    function render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      resize(canvas, ctx)
      draw(ctx)
      animationFrameId = requestAnimationFrame(() => render(canvas, ctx))
    }

    if (!canvas || !ctx) {
      console.error('Canvas or context is not available')
      return
    }

    render(canvas, ctx)
  }, [draw])

  return {
    canvasRef,
  }
}
