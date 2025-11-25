import type {
  ApiAdsResponse,
  ApiAdvertisement,
  ApiAdsFilters,
  ApiRejectRequest,
} from '../types/api/ads'
import { API_BASE_URL } from '../utils/constants'

class AdsApi {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async getAds(filters: ApiAdsFilters): Promise<ApiAdsResponse> {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(key, v.toString()))
        } else {
          queryParams.append(key, value.toString())
        }
      }
    })

    return this.request<ApiAdsResponse>(`/ads?${queryParams}`)
  }

  async getAdById(id: number): Promise<ApiAdvertisement> {
    return this.request<ApiAdvertisement>(`/ads/${id}`)
  }

  async approveAd(
    id: number
  ): Promise<{ message: string; ad: ApiAdvertisement }> {
    return this.request<{ message: string; ad: ApiAdvertisement }>(
      `/ads/${id}/approve`,
      {
        method: 'POST',
      }
    )
  }

  async rejectAd(
    id: number,
    data: ApiRejectRequest
  ): Promise<{ message: string; ad: ApiAdvertisement }> {
    return this.request<{ message: string; ad: ApiAdvertisement }>(
      `/ads/${id}/reject`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    )
  }

  async requestChangesAd(
    id: number,
    data: ApiRejectRequest
  ): Promise<{ message: string; ad: ApiAdvertisement }> {
    return this.request<{ message: string; ad: ApiAdvertisement }>(
      `/ads/${id}/request-changes`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    )
  }
}

export const adsApi = new AdsApi()
