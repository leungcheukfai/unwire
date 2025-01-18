import type { ComponentProps } from "react"
import {
  AlternativeCard,
  AlternativeCardSkeleton,
} from "~/components/web/alternatives/alternative-card"
import { EmptyList } from "~/components/web/empty-list"
import { Grid } from "~/components/web/ui/grid"
import type { AlternativeMany } from "~/server/web/alternatives/payloads"

type AlternativeListProps = ComponentProps<typeof Grid> & {
  alternatives: AlternativeMany[]
}

const AlternativeList = ({ alternatives, ...props }: AlternativeListProps) => {
  return (
    <Grid {...props}>
      {alternatives.map(alternative => (
        <AlternativeCard key={alternative.slug} alternative={alternative} showCount />
      ))}

      {!alternatives.length && <EmptyList>未能找到合適的工具。</EmptyList>}
    </Grid>
  )
}

const AlternativeListSkeleton = () => {
  return (
    <Grid>
      {[...Array(6)].map((_, index) => (
        <AlternativeCardSkeleton key={index} />
      ))}
    </Grid>
  )
}

export { AlternativeList, AlternativeListSkeleton }
