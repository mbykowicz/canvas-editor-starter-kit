import { useEffect, useRef } from 'react'

export default function useResizeObserver<T extends HTMLElement>(
  callback: (width: number, height: number) => void,
) {
  const observableRef = useRef<T | null>(null)

  useEffect(() => {
    const element = observableRef.current

    if (!element) return

    const observer = new ResizeObserver(() => {
      const { width, height } = element.getBoundingClientRect()
      callback(width, height)
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return {
    observableRef,
  }
}
