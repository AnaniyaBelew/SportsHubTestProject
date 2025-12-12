import { axiosClient } from '@/utils/axiosClient'
import type { ApiResponse } from '@/types/ServiceResponse'
import axios from 'axios'
import type { country } from '@/types/countries/type'
export async function fetchAllCountries(): Promise<ApiResponse<country[]>> {
  try {
    const res = await axiosClient.get('/api/v1/json/123/all_countries.php')
    return {
      data: res.data.countries,
      error: null,
      status: res.status,
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return {
        data: null,
        error: err.response?.data?.message || 'Failed to fetch Countries',
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
