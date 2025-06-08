import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type UserId = string

export type User = {
  id: UserId
  name: string
  description: string
}

type UsersState = {
  entities: Record<UserId, User | undefined>
  ids: UserId[]
  fetchUsersStatus: 'idle' | 'loading' | 'success' | 'error'
  fetchUserStatus: 'idle' | 'loading' | 'success' | 'error'
  deleteUserStatus: 'idle' | 'loading' | 'success' | 'error'
}

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  fetchUsersStatus: 'idle',
  fetchUserStatus: 'idle',
  deleteUserStatus: 'idle',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  selectors: {
    selectUserById: (state: UsersState, userId: UserId) => state.entities[userId],
    selectSortedUsers: createSelector(
      (state: UsersState) => state.ids,
      (state: UsersState) => state.entities,
      (_: UsersState, sort: 'asc' | 'desc') => sort,
      (ids, entities, sort) =>
        ids
          .map(id => entities[id])
          .filter((user): user is User => !!user)
          .sort((a, b) => {
            if (sort === 'asc') {
              return a.name.localeCompare(b.name)
            } else {
              return b.name.localeCompare(a.name)
            }
          }),
    ),
    selectIsFetchUsersLoading: state => state.fetchUsersStatus === 'loading',
    selectIsFetchUsersIdle: state => state.fetchUsersStatus === 'idle',
    selectIsFetchUserLoading: state => state.fetchUserStatus === 'loading',
    selectIsFetchUserIdle: state => state.fetchUserStatus === 'idle',
    selectIsDeleteUserLoading: state => state.deleteUserStatus === 'loading',
  },
  reducers: {
    fetchUsersLoading: state => {
      state.fetchUsersStatus = 'loading'
    },
    fetchUsersSuccess: (state, action: PayloadAction<{ users: User[] }>) => {
      const { users } = action.payload

      state.fetchUsersStatus = 'success'
      state.entities = users.reduce((acc, user) => {
        acc[user.id] = user
        return acc
      }, {} as Record<UserId, User>)
      state.ids = users.map(user => user.id)
    },
    fetchUsersError: state => {
      state.fetchUsersStatus = 'error'
    },
    fetchUserLoading: state => {
      state.fetchUserStatus = 'loading'
    },
    fetchUserSuccess: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload

      state.fetchUserStatus = 'success'
      state.entities[user.id] = user
    },
    fetchUserError: state => {
      state.fetchUserStatus = 'error'
    },
    deleteUserLoading: state => {
      state.deleteUserStatus = 'loading'
    },
    deleteUserSuccess: (state, action: PayloadAction<{ userId: UserId }>) => {
      state.deleteUserStatus = 'success'
      delete state.entities[action.payload.userId]
      state.ids = state.ids.filter(id => id !== action.payload.userId)
    },
    deleteUserError: state => {
      state.deleteUserStatus = 'error'
    },
  },
})
