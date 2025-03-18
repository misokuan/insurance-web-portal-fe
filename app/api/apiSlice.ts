import { User } from '@/lib/interfaces/users.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ListResponse<T> {
  meta: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
  data: T[]
}

export interface UserQuery {
  page: number
  startsWith?: string | null
  type?: string | null
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  endpoints: build => ({
    getUsers: build.query<ListResponse<User>, UserQuery>({
      query: ({page, startsWith, type}) => {
        let api = `http://localhost:3333/users?page=${page}`;
        if (startsWith !== "") {
          api = `http://localhost:3333/users?page=1&filter.${type}=$sw:${startsWith}`;
        }
        return api;
      }
    })
  })
})

export const { useGetUsersQuery } = api;