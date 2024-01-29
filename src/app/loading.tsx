import { cn } from "@/lib/utils"

export default function loadingPage()
{
  return (
      <div className="w-full h-full grid place-items-center">
        <LoadingSpinner className="w-48 h-48"/>
      </div>
    )
}

export const LoadingSpinner = ({size, className}: {size?: number, className?: string}) =>
{
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin", className)}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
  )
}
