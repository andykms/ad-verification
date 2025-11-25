import type { ApiAdvertisement } from '../types/api/ads'
import type { Advertisement as AppAdvertisement } from '../types/app/ads'

export const convertApiAdToAppAd = (
  apiAd: ApiAdvertisement
): AppAdvertisement => ({
  ...apiAd,
  seller: {
    ...apiAd.seller,
  },
})
