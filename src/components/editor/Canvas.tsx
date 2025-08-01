import useCanvas from '../../hooks/useCanvas'

interface Props extends React.ComponentProps<'canvas'> {
  onDraw: (ctx: CanvasRenderingContext2D) => void
  containerRef?: React.RefObject<HTMLDivElement | null>
}

export default function Canvas({ onDraw, containerRef, ...props }: Props) {
  const { canvasRef } = useCanvas({ draw: onDraw })

  return (
    <canvas ref={canvasRef} {...props} className='w-full h-full'>
      Your browser doesn't support the Canvas API
    </canvas>
  )
}
