import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from './box'
interface Ispinner {
  lines?: number
}
export const ListSkeleton: React.FC<Ispinner> = ({ lines }) => {
  return (
    <SkeletonTheme >
      <Skeleton count={1} containerClassName="flex-1" />
      <Skeleton count={1} containerClassName="flex-1" />
      <div style={{ width: '100%', display: 'flex' }}>
        <Skeleton count={2} wrapper={Box} containerClassName="flex-1" />
        <Skeleton count={2} wrapper={Box} containerClassName="flex-1" />
        <Skeleton count={2} wrapper={Box} containerClassName="flex-1" />
      </div>
      <Skeleton count={1} containerClassName="flex-1" />

      <div style={{ width: '100%', display: 'flex' }}>
        <Skeleton count={4} wrapper={Box} containerClassName="flex-1" />
        <Skeleton count={4} wrapper={Box} containerClassName="flex-1" />
        <Skeleton count={4} wrapper={Box} containerClassName="flex-1" />
        <Skeleton count={4} wrapper={Box} containerClassName="flex-1" />
      </div>
      <Skeleton count={lines} containerClassName="flex-1" />
    </SkeletonTheme>
  )
}
