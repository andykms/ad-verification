import { useState, useEffect } from 'react'

import type { Advertisement } from '../types/app/ads'

export const useBlockNavigation = (
  ads: Advertisement[],
  ad: Advertisement | null,
  fromPage: number,
  totalPages: number
) => {
  const [blockNextNav, setBlockNextNav] = useState<boolean>(false)
  const [blockPrevNav, setBlockPrevNav] = useState<boolean>(false)

  useEffect(() => {
    const findedIndex = ads.findIndex((curAd) => curAd.id == ad?.id)
    if (
      findedIndex < 0 ||
      (findedIndex >= ads.length - 1 && fromPage >= totalPages)
    ) {
      setBlockNextNav(true)
    } else {
      setBlockNextNav(false)
    }

    if (findedIndex < 0 || (findedIndex <= 0 && fromPage <= 1)) {
      setBlockPrevNav(true)
    } else {
      setBlockPrevNav(false)
    }
  }, [ads, ad])

  return { blockNextNav, blockPrevNav }
}
