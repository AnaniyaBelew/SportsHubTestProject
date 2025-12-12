import { axiosClient } from '@/utils/axiosClient'
import type { ApiResponse } from '@/types/ServiceResponse'
import axios from 'axios'
import type { SportEvent, TimelineEvent } from '@/types/events/type'
export async function fetchLeagueEvents(
  leagueid: string,
  season: string
): Promise<ApiResponse<SportEvent[]>> {
  try {
    const res = await axiosClient.get(`/api/v1/json/3/eventsseason.php?id=${leagueid}&s=${season}`)
    if (!res.data.events) {
      return {
        data: null,
        error: 'No Events Found',
        status: 500,
      }
    }
    return {
      data: res.data.events,
      error: null,
      status: res.status,
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return {
        data: null,
        error: err.response?.data?.message || 'Failed to fetch All Events',
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
export async function fetchTimeline(eventId: string): Promise<ApiResponse<TimelineEvent[]>> {
  try {
    const res = await axiosClient.get(
      `/api/v1/json/123/lookuptimeline.php?id=${eventId}`
    )

    if (!res.data.timeline) {
      return {
        data: null,
        error: 'No Timeline Found',
        status: 404,
      }
    }

    return {
      data: res.data.timeline,
      error: null,
      status: res.status,
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return {
        data: null,
        error: err.response?.data?.message || 'Failed to fetch timeline',
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
export async function fetchEvent(eventId: string): Promise<ApiResponse<SportEvent>> {
  try {
    const res = await axiosClient.get(
      `/api/v1/json/123/lookupevent.php?id=${eventId}`
    )
    if (!res.data.events) {
      return {
        data: null,
        error: 'No Timeline Found',
        status: 404,
      }
    }

    return {
      data: res.data.events[0],
      error: null,
      status: res.status,
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return {
        data: null,
        error: err.response?.data?.message || 'Failed to fetch timeline',
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
