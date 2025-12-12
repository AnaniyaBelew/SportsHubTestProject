import type { League } from '@/types/league/type'
import { axiosClient } from '@/utils/axiosClient'
import type { ApiResponse } from '@/types/ServiceResponse'
import axios from 'axios'
export async function fetchAllLeagues(): Promise<ApiResponse<League[]>> {
  try {
    const res = await axiosClient.get('/api/v1/json/123/all_leagues.php')
    return {
      data: res.data.leagues,
      error: null,
      status: res.status,
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return {
        data: null,
        error: err.response?.data?.message || 'Failed to fetch leagues',
        status: err.response?.status || 500,
      }
    }
    return {
      data: null,
      error: 'Unexpected error occurred',
      status: 500,
    }
  }
}
