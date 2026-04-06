import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { MediaAsset as MediaAssetType } from '@/content/types'
import { cn } from '@/lib/cn'

type MediaAssetProps = {
  asset: MediaAssetType
  className?: string
  roundedClassName?: string
}

function useNearViewport(priority = false) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isNear, setIsNear] = useState(priority)

  useEffect(() => {
    if (priority || isNear) {
      return
    }

    const node = ref.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '280px 0px' },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [isNear, priority])

  return { ref, isNear }
}

export function MediaAsset({
  asset,
  className,
  roundedClassName,
}: MediaAssetProps) {
  const reducedMotion = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const { ref, isNear } = useNearViewport(asset.priority)

  const aspectRatio = useMemo(() => asset.aspect ?? 1.6, [asset.aspect])

  return (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-[var(--radius-image)] border border-black/5',
        className,
      )}
      style={{
        aspectRatio,
        background: asset.frameTint ?? 'var(--surface-soft)',
      }}
    >
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-500',
          loaded ? 'opacity-0' : 'opacity-100',
          roundedClassName,
        )}
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.62), rgba(255,255,255,0.12))',
        }}
      />

      {asset.type === 'image' ? (
        <img
          src={asset.src}
          alt={asset.alt}
          loading={asset.priority ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          className={cn(
            'h-full w-full object-cover transition duration-700',
            loaded ? 'scale-100 opacity-100' : 'scale-[1.02] opacity-0',
            roundedClassName,
          )}
          style={{ objectPosition: asset.objectPosition }}
        />
      ) : isNear ? (
        <video
          src={asset.src}
          poster={asset.poster}
          muted
          playsInline
          loop={!reducedMotion}
          autoPlay={!reducedMotion}
          preload={asset.priority ? 'auto' : 'metadata'}
          onLoadedData={() => setLoaded(true)}
          className={cn(
            'h-full w-full object-cover transition duration-700',
            loaded ? 'scale-100 opacity-100' : 'scale-[1.02] opacity-0',
            roundedClassName,
          )}
          style={{ objectPosition: asset.objectPosition }}
        />
      ) : null}
    </div>
  )
}
