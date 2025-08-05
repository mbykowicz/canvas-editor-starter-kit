import { useViewportStore } from '../../stores/viewport.store'
import Canvas from './Canvas'
import useResizeObserver from '../../hooks/useResizeObserver'

interface Props extends React.ComponentProps<'div'> {}

export default function Workspace({}: Props) {
  const { observableRef } = useResizeObserver<HTMLDivElement>(
    (width, height) => {
      const { setViewportSize } = useViewportStore.getState()
      setViewportSize(width, height)
      console.log(`Workspace resized to ${width}x${height}`)
    },
  )

  return (
    <div
      ref={observableRef}
      className='relative w-full h-full bg-white border border-gray-300 rounded-md shadow'
    >
      <Canvas draw={() => {}} zIndex={0} />
    </div>
  )
}
