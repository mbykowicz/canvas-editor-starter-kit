import { useEffect, useRef } from 'react'
import { cn } from '../../utils/cn'

interface Props extends React.ComponentProps<'canvas'> {
  draw: (ctx: CanvasRenderingContext2D) => void
  zIndex: number
}

export default function Canvas({ draw, zIndex, className, ...props }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const cv = ref.current
    const ctx = cv?.getContext('2d')
    let frameId: number | null = null

    if (!ctx) {
      console.error('Canvas context not available')
      return
    }

    function render(ctx: CanvasRenderingContext2D) {
      draw(ctx)

      frameId = requestAnimationFrame(() => render(ctx))
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [draw])

  return (
    <canvas
      ref={ref}
      {...props}
      className={cn('absolute top-0 left-0 w-full h-full', className)}
      style={{ zIndex }}
    >
      Your browser doesn't support the Canvas API
    </canvas>
  )
}
