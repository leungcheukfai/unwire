import type { SVGAttributes } from "react"

export const BrandThreadsIcon = ({ ...props }: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Threads Icon"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19 10.5c0 3.038-2.462 5.5-5.5 5.5a5.499 5.499 0 0 1-5.302-4.019" />
      <path d="M7.5 10.5c0-3.038 2.462-5.5 5.5-5.5 3.038 0 5.5 2.462 5.5 5.5" />
      <path d="M8 15.198l-1.638 2.754c-.36.603-1.204.772-1.784.366-.695-.489-.755-1.528-.127-2.113l1.698-1.578" />
      <path d="M12.5 7.5l-2.478-2.492c-.49-.49-.486-1.3.009-1.793.558-.558 1.487-.557 2.04.004l.429.439.429-.439c.553-.561 1.482-.562 2.04-.004.495.493.499 1.303.009 1.793l-2.478 2.492z" />
    </svg>
  )
}