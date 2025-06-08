import type { AppDispatch, AppThunk } from '@/store'
import { usersSlice, type UserId } from '../users-slice'
import { fetchUsers } from './fetch-users'

export const deleteUser =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch: AppDispatch, _, { api, router }) => {
    dispatch(usersSlice.actions.deleteUserLoading())
    try {
      await api.deleteUser(userId)
      await router.navigate('/users')
      await dispatch(fetchUsers({ refetch: true }))
      dispatch(usersSlice.actions.deleteUserSuccess({ userId }))
    } catch {
      dispatch(usersSlice.actions.deleteUserError())
    }
  }
