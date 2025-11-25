import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AdsFilters, RejectData } from '../../types/app/ads'
import { adsApi } from '../../api/ads'
import { convertApiAdToAppAd } from '../../utils/converters'

export const fetchAds = createAsyncThunk(
  'ads/fetchAds',
  async (filters: AdsFilters) => {
    const response = await adsApi.getAds(filters)

    const convertedAds = response.ads.map(convertApiAdToAppAd)

    return {
      ads: convertedAds,
      pagination: response.pagination,
    }
  }
)

export const fetchPossibleMinPrice = createAsyncThunk(
  'ads/fetchPossibleMinPrices',
  async () => {
    const filters: AdsFilters = {
      page: 1,
      limit: 1,
      sortOrder: 'asc',
      sortBy: 'price',
    }

    const response = await adsApi.getAds(filters)
    return response.ads[0].price
  }
)

export const fetchPossibleMaxPrice = createAsyncThunk(
  'ads/fetchPossibleMaxPrices',
  async () => {
    const filters: AdsFilters = {
      page: 1,
      limit: 1,
      sortOrder: 'desc',
      sortBy: 'price',
    }
    const response = await adsApi.getAds(filters)
    return response.ads[0].price
  }
)

export const fetchCategories = createAsyncThunk(
  'ads/fetchCategories',
  async () => {
    const response = await adsApi.getAds({ page: 1, limit: 50 })
    const already = new Set()
    const allCategories = response.ads.map((ad) => ({
      id: ad.categoryId,
      name: ad.category,
    }))
    const result: { id: number; name: string }[] = []
    allCategories.forEach((category) => {
      if (!already.has(category.id)) {
        already.add(category.id)
        result.push(category)
      }
    })
    return result
  }
)

export const fetchAdById = createAsyncThunk(
  'ads/fetchAdById',
  async (adId: number) => {
    const response = await adsApi.getAdById(adId)
    const convertedAd = convertApiAdToAppAd(response)
    return convertedAd
  }
)

export const approveAd = createAsyncThunk(
  'ads/approveAd',
  async (adId: number) => {
    const response = await adsApi.approveAd(adId)
    const convertedAd = convertApiAdToAppAd(response.ad)
    return convertedAd
  }
)

export const rejectAd = createAsyncThunk(
  'ads/rejectAd',
  async ({ adId, data }: { adId: number; data: RejectData }) => {
    const response = await adsApi.rejectAd(adId, data)
    const convertedAd = convertApiAdToAppAd(response.ad)
    return convertedAd
  }
)

export const requestChangesAd = createAsyncThunk(
  'ads/requestChangesAd',
  async ({ adId, data }: { adId: number; data: RejectData }) => {
    const response = await adsApi.requestChangesAd(adId, data)
    const convertedAd = convertApiAdToAppAd(response.ad)
    return convertedAd
  }
)

export const bulkApproveAds = createAsyncThunk(
  'ads/bulkApproveAds',
  async (adIds: number[]) => {
    return await Promise.all(adIds.map((adId) => adsApi.approveAd(adId)))
  }
)

export const bulkRejectAds = createAsyncThunk(
  'ads/bulkRejectAds',
  async ({ adIds, data }: { adIds: number[]; data: RejectData }) => {
    return await Promise.all(adIds.map((adId) => adsApi.rejectAd(adId, data)))
  }
)
