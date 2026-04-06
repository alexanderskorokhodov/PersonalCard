import type { SVGProps } from 'react'

export function SparkBadgeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 22 22" fill="none" aria-hidden="true" {...props}>
      <path
        d="M13.3236 3.848L10.9996 1.6L8.67557 3.848L5.47457 3.395L4.91557 6.579L2.05957 8.095L3.47957 11L2.05957 13.904L4.91557 15.42L5.47457 18.604L8.67557 18.152L10.9996 20.4L13.3236 18.152L16.5246 18.604L17.0836 15.42L19.9396 13.904L18.5196 11L19.9396 8.095L17.0836 6.579L16.5246 3.395L13.3236 3.848Z"
        fill="url(#spark-fill)"
      />
      <path
        d="M6.23357 11.423L9.66157 14.851L15.3446 8.645L13.9976 7.398L9.59757 12.193L7.52557 10.121L6.23357 11.423Z"
        fill="#D18800"
      />
      <defs>
        <linearGradient id="spark-fill" x1="4.41" y1="2.49" x2="18.08" y2="21.5">
          <stop stopColor="#F9E87F" />
          <stop offset="0.45" stopColor="#E2B719" />
          <stop offset="1" stopColor="#CB7B00" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M2.585 24L0 21.415L17.723 3.692H1.846V0H24V22.154H20.308V6.277L2.585 24Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M18.187 4.398L19.602 5.813L13.415 12L19.602 18.187L18.187 19.602L12 13.415L5.813 19.602L4.398 18.187L10.585 12L4.398 5.813L5.813 4.398L12 10.585L18.187 4.398Z"
        fill="currentColor"
      />
    </svg>
  )
}
