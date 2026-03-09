import Image from "next/image"
import Link from "next/link"
import type { TUrlMetadata } from "@/types"
import { Skeleton } from "../ui/skeleton"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"

export function URLPreviewCard({ description, previewImageUrl, title, url }: TUrlMetadata) {
  return (
    <div className="space-y-6 w-fit">
      <Link
        href={url}
        target="_blank"
        className={cn(
          buttonVariants({ variant: "outline", size: "xs" }),
          "flex w-full text-xs border-zinc-300"
        )}
      >
        {url}
      </Link>
      <div className="flex items-center justify-around gap-4 w-fit">
        <Image
          src={previewImageUrl}
          alt={title}
          height={100}
          width={100}
          className="h-20 w-52 rounded-md"
        />
        <p className="text-sm">{title}</p>
      </div>
      <Separator className="bg-zinc-400" />
      <div className="space-y-2">
        <p className="text-sm">{description}</p>
      </div>
    </div>
  )
}

export function URLPreviewCardSkeleton() {
  return (
    <div className="space-y-4 w-full h-full">
      <Skeleton className="h-2 w-full" />
      <div className="flex items-center justify-between gap-4 w-fit">
        <Skeleton className="h-20 w-80" />
        <Skeleton className="h-20 w-full" />
      </div>
      <Skeleton className="h-1 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
      </div>
    </div>
  )
}
