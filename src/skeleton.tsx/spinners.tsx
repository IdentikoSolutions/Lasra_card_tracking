import React from 'react'
import Skeleton ,{SkeletonTheme} from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'
interface Ispinner{
    lines?:number
}
export const Spinner: React.FC<Ispinner> = ({lines}) => {
  return (
    <SkeletonTheme >
      <Skeleton count={lines}  containerClassName="flex-1" />
     </SkeletonTheme>
  )
}
