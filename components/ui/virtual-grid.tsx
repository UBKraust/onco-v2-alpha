"use client"

import type React from "react"

import { memo, useMemo } from "react"
import { FixedSizeList as List } from "react-window"
import { useMediaQuery } from "@/hooks/use-media-query"

interface VirtualGridProps {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  itemHeight?: number
  className?: string
}

const VirtualGridItem = memo(({ index, style, data }: any) => {
  const { items, renderItem } = data
  return <div style={style}>{renderItem(items[index], index)}</div>
})

VirtualGridItem.displayName = "VirtualGridItem"

export const VirtualGrid = memo<VirtualGridProps>(({ items, renderItem, itemHeight = 200, className }) => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  const itemData = useMemo(
    () => ({
      items,
      renderItem,
    }),
    [items, renderItem],
  )

  const height = useMemo(() => {
    return Math.min(items.length * itemHeight, isMobile ? 400 : 600)
  }, [items.length, itemHeight, isMobile])

  if (items.length === 0) {
    return <div className="flex items-center justify-center h-32 text-muted-foreground">No items to display</div>
  }

  return (
    <div className={className}>
      <List height={height} itemCount={items.length} itemSize={itemHeight} itemData={itemData} overscanCount={2}>
        {VirtualGridItem}
      </List>
    </div>
  )
})

VirtualGrid.displayName = "VirtualGrid"
