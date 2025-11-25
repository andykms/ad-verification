import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../store'
import { getCurrAd, getLoading, getError } from '../features/ads/ads.slice'
import { fetchAdById } from '../features/ads/ads.thunk'
import { ProductPage } from '../pages/ItemPage/ItemPage'
import { type ApiAdStatus } from '../types/api/ads'
import { converterDate } from '../utils/converterDate'
import { approveAd, rejectAd } from '../features/ads/ads.thunk'
import type { TRejectReasons } from '../types/app/ads'
import { Loader } from '../components/ui/Loader/Loader'
import { ErrorPage } from '../pages/ErrorPage/ErrorPage'
import { getAds, getTotalPages } from '../features/ads/ads.slice'
import { setPage } from '../features/adsFilter/adsFilter.slice'
import { useLocation } from 'react-router-dom'
import { useBlockNavigation } from '../hooks/useBlockNavigation'

export const actionTitles: { [key in ApiAdStatus]: string } = {
  approved: 'одобрено',
  draft: 'черновик',
  pending: 'в рассмотрении',
  rejected: 'отклонено',
  moderation: 'на модерации',
}

export const ItemPresenter = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()

  const search = useLocation().state?.search
  const fromPage = useLocation().state?.page

  const ad = useAppSelector(getCurrAd)

  useEffect(() => {
    dispatch(fetchAdById(Number(id)))
  }, [dispatch, id])

  const navigate = useNavigate()

  const loading = useAppSelector(getLoading)
  const error = useAppSelector(getError)

  const totalPages = useAppSelector(getTotalPages)

  const ads = useAppSelector(getAds)

  const handleApprove = () => {
    dispatch(approveAd(Number(id)))
  }

  const handleReject = (reason: string, comment: string) => {
    dispatch(
      rejectAd({
        adId: Number(id),
        data: { reason: reason as TRejectReasons, comment },
      })
    )
  }

  const handleBack = () => {
    navigate(`/list?${search}`)
  }

  const handleNextPage = () => {
    const findedIndex = ads.findIndex((curAd) => curAd.id == ad?.id)
    if (findedIndex < 0 || findedIndex >= ads.length - 1) {
      let query = search.replace(`page=${fromPage}`, '')
      dispatch(setPage(fromPage + 1))
      query = `page=${fromPage + 1}&`
      navigate(`/list?${query}`, {
        state: { redirectTo: 1, nextPage: fromPage + 1, currAdId: ad?.id },
      })
      return
    }
    navigate(`/item/${ads[findedIndex + 1].id}`, {
      state: { search: location.search, page: fromPage },
    })
  }
  const handlePrevPage = () => {
    const findedIndex = ads.findIndex((curAd) => curAd.id == ad?.id)
    if (findedIndex <= 0) {
      let query = search.replace(`page=${fromPage}`, '')
      dispatch(setPage(fromPage - 1))
      query = `page=${fromPage - 1}&`
      navigate(`/list?${query}`, {
        state: { redirectTo: -1, nextPage: fromPage - 1, currAdId: ad?.id },
      })
      return
    }
    navigate(`/item/${ads[findedIndex - 1].id}`, {
      state: { search: location.search, page: fromPage },
    })
  }

  const { blockNextNav, blockPrevNav } = useBlockNavigation(
    ads,
    ad,
    fromPage,
    totalPages
  )

  if (error) {
    return <ErrorPage />
  }

  return (
    <>
      {!ad || loading ? (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader />
        </div>
      ) : (
        <ProductPage
          onRequestChanges={() => {}}
          onApprove={handleApprove}
          onReject={handleReject}
          product={{
            ...ad,
            seller: {
              ...ad.seller,
              registeredAt: converterDate(ad.seller.registeredAt),
            },
            moderationHistory: ad.moderationHistory.map((mod) => ({
              moderator: mod.moderatorName,
              date: converterDate(mod.timestamp),
              action: actionTitles[mod.action],
              comment: mod.comment,
            })),
          }}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          onBack={handleBack}
          blockNextNav={blockNextNav}
          blockPrevNav={blockPrevNav}
        />
      )}
    </>
  )
}
